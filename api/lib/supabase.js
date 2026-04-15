const { getEnv } = require('./env');

function baseHeaders(json = true) {
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  if (json) headers['Content-Type'] = 'application/json';
  return headers;
}

function url(path) {
  return `${getEnv('SUPABASE_URL').replace(/\/$/, '')}${path}`;
}

async function request(path, options = {}) {
  const res = await fetch(url(path), options);
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) throw new Error(data?.message || data?.error_description || data?.error || `Supabase request failed: ${res.status}`);
  return data;
}

async function select(table, selectQuery, filters = '') {
  const q = `/rest/v1/${table}?select=${encodeURIComponent(selectQuery)}${filters}`;
  return request(q, { headers: baseHeaders(false) });
}

async function insert(table, payload, returning = 'representation') {
  return request(`/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...baseHeaders(), Prefer: `return=${returning}` },
    body: JSON.stringify(payload)
  });
}

async function patch(table, filters, payload) {
  return request(`/rest/v1/${table}?${filters}`, {
    method: 'PATCH',
    headers: { ...baseHeaders(), Prefer: 'return=representation' },
    body: JSON.stringify(payload)
  });
}

async function remove(table, filters) {
  return request(`/rest/v1/${table}?${filters}`, {
    method: 'DELETE',
    headers: { ...baseHeaders(), Prefer: 'return=representation' }
  });
}

async function upload(pathKey, buffer, contentType) {
  const bucket = getEnv('SUPABASE_STORAGE_BUCKET', false, 'site-assets');
  const res = await fetch(url(`/storage/v1/object/${bucket}/${pathKey}`), {
    method: 'POST',
    headers: { ...baseHeaders(false), 'Content-Type': contentType || 'application/octet-stream', 'x-upsert': 'false' },
    body: buffer
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || 'Upload failed');
  const site = getEnv('SITE_URL', false, '').replace(/\/$/, '');
  return `${getEnv('SUPABASE_URL').replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${pathKey}`;
}

module.exports = { select, insert, patch, remove, upload };
