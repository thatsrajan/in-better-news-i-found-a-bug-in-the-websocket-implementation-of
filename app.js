const payloadEl = document.getElementById('payload');
const summaryEl = document.getElementById('summary');
const patchedEl = document.getElementById('patched');

function inspectPayload() {
  try {
    const payload = JSON.parse(payloadEl.value);
    const response = payload.response || (payload.item && payload.item.response) || {};
    const missing = [];
    if (!payload.type) missing.push('type');
    if (!response.phase) missing.push('response.phase');
    if (!response.modalities) missing.push('response.modalities');
    const patched = structuredClone(payload);
    patched.response = patched.response || {};
    if (!patched.response.phase) patched.response.phase = 'response';
    if (!patched.response.modalities) patched.response.modalities = ['text'];
    summaryEl.innerHTML = missing.length
      ? `<p class="warn"><strong>Missing:</strong> ${missing.join(', ')}</p><p>Patched payload generated below.</p>`
      : '<p class="ok"><strong>Looks good.</strong> Required fields are present.</p>';
    patchedEl.textContent = JSON.stringify(patched, null, 2);
  } catch (error) {
    summaryEl.innerHTML = `<p class="warn">Invalid JSON: ${error.message}</p>`;
    patchedEl.textContent = '';
  }
}

document.getElementById('inspect').addEventListener('click', inspectPayload);
document.getElementById('demo').addEventListener('click', () => {
  payloadEl.value = JSON.stringify({ type: 'response.create', response: { modalities: ['text'] } }, null, 2);
  inspectPayload();
});
