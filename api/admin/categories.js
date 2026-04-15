const { json, requireAdmin, parseBody } = require('../lib/env');
const { insert } = require('../lib/supabase');
module.exports = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
    const body = await parseBody(req);
    if (!body.slug || !body.name_he) return json(res, 400, { error: 'יש למלא slug ושם קטגוריה.' });
    await insert('product_categories', [{ slug: body.slug, name_he: body.name_he, image_url: body.image_url || '', sort_order: Number(body.sort_order || 0), is_active: true }], 'minimal');
    return json(res, 200, { ok: true });
  } catch (err) { json(res, 500, { error: err.message }); }
};
