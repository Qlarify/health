// Public-HTTP guard for unauthenticated URL tools.
// Resolve every hostname, reject the answer if ANY address is non-public, then
// pin that exact address for the connection. This closes DNS rebinding as well
// as redirects to loopback, private, link-local and metadata services.
const dns = require('node:dns/promises');
const http = require('node:http');
const https = require('node:https');
const net = require('node:net');

const MAX_BYTES = 3 * 1024 * 1024;
const LOCAL_SUFFIXES = ['.localhost', '.local', '.internal', '.lan', '.home', '.home.arpa', '.invalid', '.test', '.onion'];

class PublicFetchError extends Error {
  constructor(code, message, status = 0) { super(message); this.code = code; this.status = status; }
}

function isPublicIPv4(ip) {
  const a = ip.split('.').map(Number);
  if (a.length !== 4 || a.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return false;
  const [x, y] = a;
  if (x === 0 || x === 10 || x === 127 || x >= 224) return false; // private, loopback, multicast/reserved
  if (x === 100 && y >= 64 && y <= 127) return false; // carrier-grade NAT
  if (x === 169 && y === 254) return false; // link-local / cloud metadata
  if (x === 172 && y >= 16 && y <= 31) return false;
  if (x === 192 && (y === 168 || y === 0)) return false; // private + IETF special
  if (x === 192 && y === 88 && a[2] === 99) return false; // 6to4 relay
  if (x === 198 && (y === 18 || y === 19 || y === 51)) return false; // benchmark + documentation
  if (x === 203 && y === 0 && a[2] === 113) return false; // documentation
  return true;
}

function expandIPv6(ip) {
  let s = ip.toLowerCase();
  if (s.startsWith('[') && s.endsWith(']')) s = s.slice(1, -1);
  const zone = s.indexOf('%'); if (zone >= 0) s = s.slice(0, zone); // scoped addresses are rejected below
  if (s.includes('.')) {
    const last = s.lastIndexOf(':');
    const v4 = s.slice(last + 1);
    if (!isPublicIPv4(v4)) return null; // mapped/compatible IPv4 must itself be public
    const n = v4.split('.').map(Number);
    s = s.slice(0, last + 1) + ((n[0] << 8) | n[1]).toString(16) + ':' + ((n[2] << 8) | n[3]).toString(16);
  }
  const parts = s.split('::');
  if (parts.length > 2) return null;
  const head = parts[0] ? parts[0].split(':') : [];
  const tail = parts.length === 2 && parts[1] ? parts[1].split(':') : [];
  const missing = 8 - head.length - tail.length;
  if (parts.length === 1 ? missing !== 0 : missing < 1) return null;
  const groups = (parts.length === 2 ? head.concat(Array(missing).fill('0'), tail) : head).map((h) => parseInt(h, 16));
  if (groups.length !== 8 || groups.some((n) => !Number.isInteger(n) || n < 0 || n > 65535)) return null;
  return groups;
}

function isPublicIPv6(ip) {
  const g = expandIPv6(ip);
  if (!g) return false;
  const [a, b] = g;
  if (g.every((n) => n === 0) || (a === 0 && b === 0 && g[6] === 0 && g[7] === 1)) return false;
  if ((a & 0xfe00) === 0xfc00 || (a & 0xffc0) === 0xfe80 || (a & 0xff00) === 0xff00) return false;
  if (a === 0x2001 && b === 0x0db8) return false; // documentation
  if (a === 0x2002 || (a === 0x2001 && b === 0)) return false; // 6to4 + Teredo
  if (a === 0x0064 && b === 0xff9b) return false; // NAT64 (can encode private IPv4)
  if (a === 0x0100 && b === 0) return false; // discard-only
  return true;
}

function isPublicIP(ip) {
  const family = net.isIP(String(ip || '').replace(/^\[|\]$/g, ''));
  return family === 4 ? isPublicIPv4(ip) : family === 6 ? isPublicIPv6(ip) : false;
}

function isPublicHostname(hostname) {
  const h = String(hostname || '').toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
  if (!h || h.includes('%')) return false;
  if (net.isIP(h)) return isPublicIP(h);
  if (LOCAL_SUFFIXES.some((suffix) => h === suffix.slice(1) || h.endsWith(suffix))) return false;
  // No dotted-decimal tricks, credentials, or bare single-label intranet names.
  return /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(h) && h.includes('.') && !h.includes('..');
}

function parsePublicURL(input) {
  let u;
  try { u = new URL(input); } catch (_) { throw new PublicFetchError('invalid-url', 'That does not look like a website address.'); }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new PublicFetchError('protocol', 'Only http and https addresses can be checked.');
  if (u.username || u.password) throw new PublicFetchError('credentials', 'Website addresses cannot include a username or password.');
  if (u.port && u.port !== '80' && u.port !== '443') throw new PublicFetchError('port', 'Only standard web ports can be checked.');
  if (!isPublicHostname(u.hostname)) throw new PublicFetchError('private-host', 'That address is not a public website.');
  return u;
}

async function resolvePublicURL(input) {
  const u = parsePublicURL(input);
  const literal = net.isIP(u.hostname.replace(/^\[|\]$/g, ''));
  let addresses;
  if (literal) addresses = [{ address: u.hostname.replace(/^\[|\]$/g, ''), family: literal }];
  else {
    try { addresses = await dns.lookup(u.hostname, { all: true, verbatim: true }); }
    catch (_) { throw new PublicFetchError('dns', 'Could not resolve that website address.'); }
  }
  if (!addresses.length || addresses.some((a) => !isPublicIP(a.address))) {
    throw new PublicFetchError('private-address', 'That address is not a public website.');
  }
  return { url: u, address: addresses[0].address, family: addresses[0].family };
}

function readLimited(response, cap) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    response.on('data', (chunk) => {
      size += chunk.length;
      if (size > cap) { response.destroy(new PublicFetchError('too-large', 'That page is too large to read.')); return; }
      chunks.push(chunk);
    });
    response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    response.on('error', reject);
  });
}

function requestOnce(resolved, timeoutMs) {
  const { url, address, family } = resolved;
  return new Promise((resolve, reject) => {
    const transport = url.protocol === 'https:' ? https : http;
    const req = transport.request({
      protocol: url.protocol, hostname: url.hostname, port: url.port || undefined,
      path: url.pathname + url.search, method: 'GET', family,
      // Use only the validated DNS answer. No second resolution at connect time.
      lookup: (_hostname, _options, cb) => cb(null, address, family),
      servername: url.protocol === 'https:' ? url.hostname : undefined,
      headers: {
        host: url.host,
        'user-agent': 'QlarifyHealthAudit/1.0 (public homepage health check)',
        accept: 'text/html,text/plain,application/xml,*/*',
        'accept-encoding': 'identity',
      },
    }, (res) => {
      const length = Number(res.headers['content-length']);
      if (length > MAX_BYTES) { res.resume(); reject(new PublicFetchError('too-large', 'That page is too large to read.')); return; }
      resolve(res);
    });
    req.setTimeout(timeoutMs, () => req.destroy(new PublicFetchError('timeout', 'That website took too long to answer.')));
    req.on('error', reject);
    req.end();
  });
}

async function fetchPublicText(input, options = {}) {
  const timeoutMs = options.timeoutMs || 9000;
  const maxRedirects = options.maxRedirects === undefined ? 4 : options.maxRedirects;
  const cap = options.maxBytes || MAX_BYTES;
  let current = String(input), redirects = 0;
  for (let redirects = 0; redirects <= maxRedirects; redirects++) {
    const resolved = await resolvePublicURL(current);
    const response = await requestOnce(resolved, timeoutMs);
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      response.resume();
      if (redirects === maxRedirects) throw new PublicFetchError('redirects', 'That website redirected too many times.', response.statusCode);
      try { current = new URL(response.headers.location, resolved.url).href; }
      catch (_) { throw new PublicFetchError('redirect', 'That website returned an invalid redirect.'); }
      continue; // parsePublicURL runs again, including protocol, port and private host
    }
    const text = await readLimited(response, cap);
    return { ok: response.statusCode >= 200 && response.statusCode < 300, status: response.statusCode, url: resolved.url, redirects, text };
  }
  throw new PublicFetchError('redirects', 'That website redirected too many times.');
}

module.exports = { PublicFetchError, fetchPublicText, resolvePublicURL, parsePublicURL, isPublicHostname, isPublicIP };
