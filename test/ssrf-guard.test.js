const test = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { Readable } = require('node:stream');
const dns = require('node:dns/promises');
const http = require('node:http');
const {
  fetchPublicText, resolvePublicURL, parsePublicURL, isPublicHostname, isPublicIP, PublicFetchError,
} = require('../api/tools/ssrf-guard');

test('blocks private, reserved and metadata IPv4 addresses', () => {
  for (const ip of ['0.0.0.0', '10.0.0.1', '127.0.0.1', '169.254.169.254', '172.16.0.1', '192.168.1.1',
    '100.64.0.1', '198.18.0.1', '203.0.113.9', '224.0.0.1', '255.255.255.255']) {
    assert.equal(isPublicIP(ip), false, ip);
  }
  assert.equal(isPublicIP('8.8.8.8'), true);
  assert.equal(isPublicIP('93.184.216.34'), true);
});

test('blocks IPv6 loopback, link-local, ULA, mapped private IPv4 and transition ranges', () => {
  for (const ip of ['::', '::1', '::ffff:127.0.0.1', '::ffff:169.254.169.254', 'fc00::1', 'fd12::1',
    'fe80::1', 'ff02::1', '2001:db8::1', '2002:7f00:1::', '64:ff9b::7f00:1', 'fe80::1%eth0']) {
    assert.equal(isPublicIP(ip), false, ip);
  }
  assert.equal(isPublicIP('2606:4700:4700::1111'), true);
  assert.equal(isPublicIP('::ffff:93.184.216.34'), true);
});

test('rejects local names, URL tricks, credentials and non-web ports', () => {
  for (const host of ['localhost', 'db.local', 'service.internal', 'host.lan', 'foo.test', 'foo.onion', 'intranet', '127.0.0.1']) {
    assert.equal(isPublicHostname(host), false, host);
  }
  for (const url of ['file:///etc/passwd', 'ftp://example.com', 'https://user:pass@example.com', 'https://example.com:8080',
    'http://2130706433', 'http://0x7f000001', 'http://127.1', 'http://[::1]']) {
    assert.throws(() => parsePublicURL(url), PublicFetchError, url);
  }
  assert.equal(parsePublicURL('https://example.com/path?q=1').hostname, 'example.com');
});

test('rejects a hostname if any DNS answer is private (rebinding / mixed records)', async () => {
  const old = dns.lookup;
  dns.lookup = async () => [{ address: '93.184.216.34', family: 4 }, { address: '127.0.0.1', family: 4 }];
  try { await assert.rejects(resolvePublicURL('https://mixed.example'), /not a public website/); }
  finally { dns.lookup = old; }
});

function mockRequest(handler) {
  const oldDns = dns.lookup, oldRequest = http.request;
  dns.lookup = async () => [{ address: '93.184.216.34', family: 4 }];
  http.request = (options, callback) => {
    const req = new EventEmitter();
    req.setTimeout = () => req;
    req.destroy = (err) => req.emit('error', err);
    req.end = () => handler(options, callback, req);
    return req;
  };
  return () => { dns.lookup = oldDns; http.request = oldRequest; };
}

function reply(callback, status, headers, body) {
  const res = Readable.from([Buffer.from(body)]);
  res.statusCode = status; res.headers = headers;
  callback(res);
}

test('pins the validated address instead of resolving again at connect time', async () => {
  const restore = mockRequest((options, cb) => {
    options.lookup('example.com', {}, (err, address, family) => {
      assert.equal(err, null); assert.equal(address, '93.184.216.34'); assert.equal(family, 4);
    });
    assert.equal(options.servername, undefined);
    reply(cb, 200, {}, '<h1>Hello</h1>');
  });
  try {
    const r = await fetchPublicText('http://example.com');
    assert.equal(r.text, '<h1>Hello</h1>'); assert.equal(r.redirects, 0);
  } finally { restore(); }
});

test('validates every redirect before connecting and reports private targets', async () => {
  let calls = 0;
  const restore = mockRequest((_options, cb) => { calls++; reply(cb, 302, { location: 'http://169.254.169.254/latest/meta-data/' }, ''); });
  try { await assert.rejects(fetchPublicText('http://example.com'), /not a public website/); assert.equal(calls, 1); }
  finally { restore(); }
});

test('limits redirects and response bytes', async () => {
  let restore = mockRequest((_o, cb) => reply(cb, 302, { location: '/again' }, ''));
  try { await assert.rejects(fetchPublicText('http://example.com', { maxRedirects: 2 }), /redirected too many times/); }
  finally { restore(); }
  restore = mockRequest((_o, cb) => reply(cb, 200, {}, 'x'.repeat(200)));
  try { await assert.rejects(fetchPublicText('http://example.com', { maxBytes: 100 }), /too large/); }
  finally { restore(); }
});
