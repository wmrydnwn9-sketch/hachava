const crypto = require('crypto');
const { json, requireAdmin, parseMultipart } = require('../lib/env');
const { upload } = require('../lib/supabase');
module.exports = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  try {
    const form = await parseMultipart(req);
    if (!form.file) return json(res, 400, { error: 'לא נבחר קובץ.' });
    const folder = String(form.folder || 'general').replace(/[^a-z0-9-_/]/gi, '');
    const ext = (form.file.filename.split('.').pop() || 'bin').toLowerCase();
    const key = `${folder}/${Date.now()}-${crypto.randomBytes(5).toString('hex')}.${ext}`;
    const url = await upload(key, form.file.buffer, form.file.type);
    json(res, 200, { ok: true, url, path: key });
  } catch (err) { json(res, 500, { error: err.message }); }
};
