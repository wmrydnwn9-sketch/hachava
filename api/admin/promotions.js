const { json, requireAdmin, parseBody } = require('../lib/env');
const { select, insert, patch, remove } = require('../lib/supabase');
module.exports = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET') {
      const promotions = await select('promotions', '*', '&order=created_at.desc');
      return json(res, 200, { promotions });
    }
    if (req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.title_he || !body.description_he) return json(res, 400, { error: 'כותרת ותיאור הם שדות חובה.' });
      await insert('promotions', [{ title_he: body.title_he, description_he: body.description_he, image_url: body.image_url || '', is_active: !!body.is_active, starts_at: body.starts_at || null, ends_at: body.ends_at || null }], 'minimal');
      return json(res, 200, { ok: true });
    }
    if (req.method === 'PATCH') {
      const id = url.searchParams.get('id');
      const body = await parseBody(req);
      await patch('promotions', `id=eq.${id}`, body);
      return json(res, 200, { ok: true });
    }
    if (req.method === 'DELETE') {
      const id = url.searchParams.get('id');
      await remove('promotions', `id=eq.${id}`);
      return json(res, 200, { ok: true });
    }
    json(res, 405, { error: 'Method not allowed' });
  } catch (err) { json(res, 500, { error: err.message }); }
};
