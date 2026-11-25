const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
const script = html.match(/<script>\s*\(function\(\)\{\s*function el\(id\)[\s\S]*?window\.capSubmit[\s\S]*?<\/script>/)[0].replace(/^<script>|<\/script>$/g, '');

function setup(response, networkError) {
  const ids = ['capHospital','capName','capEmail','capConsent','capStatus','capBtn','tools-capture','toolFilterRow'];
  const els = Object.fromEntries(ids.map((id) => [id, { value:'', checked:false, disabled:false, textContent:'', innerHTML:'UNCHANGED', children:[], classList:{add(){},remove(){},toggle(){}}, getAttribute(){return 'all';} }]));
  els.capHospital.value='Test Hospital'; els.capName.value='Test Person'; els.capEmail.value='test@example.test'; els.capConsent.checked=true;
  const context = {
    window: {}, document: { getElementById: (id) => els[id], querySelectorAll: () => [] },
    fetch: async () => { if (networkError) throw new Error('offline'); return { json: async () => response }; },
  };
  vm.createContext(context); vm.runInContext(script, context);
  return { els, submit: async () => { context.window.capSubmit(); await new Promise(setImmediate); } };
}

test('fallbackRequired never shows the success panel or success event', async () => {
  const { els, submit } = setup({ ok:true, fallbackRequired:true });
  await submit();
  assert.match(els.capStatus.textContent, /not confirmed/);
  assert.match(els.capStatus.textContent, /info@qlarify\.health/);
  assert.equal(els['tools-capture'].innerHTML, 'UNCHANGED');
  assert.equal(els.capBtn.disabled, false);
});

test('network failure does not claim the signup succeeded', async () => {
  const { els, submit } = setup(null, true);
  await submit();
  assert.match(els.capStatus.textContent, /not confirmed/);
  assert.equal(els['tools-capture'].innerHTML, 'UNCHANGED');
});

test('a confirmed delivery shows the success panel', async () => {
  const { els, submit } = setup({ ok:true, delivered:{internal:true,confirmation:true}, fallbackRequired:false });
  await submit();
  assert.match(els['tools-capture'].innerHTML, /You’re on the list/);
  assert.equal(els.capStatus.textContent, '');
});
