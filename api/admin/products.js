const { json, requireAdmin, parseBody } = require('../lib/env');
const { select, insert } = require('../lib/supabase');
module.exports = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    if (req.method === 'GET') {
      const categories = await select('product_categories', 'id,slug,name_he,image_url,sort_order,products(id,name_he,description_he,image_url,sort_order)', '&order=sort_order.asc');
      categories.forEach(c => c.products = (c.products || []).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0)));
      return json(res, 200, { categories });
    }
    if (req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.category_id || !body.name_he) return json(res, 400, { error: 'יש למלא קטגוריה ושם מוצר.' });
      await insert('products', [{ category_id: body.category_id, name_he: body.name_he, description_he: body.description_he || '', image_url: body.image_url || '', sort_order: Number(body.sort_order || 0), is_active: true }], 'minimal');
      return json(res, 200, { ok: true });
    }
    json(res, 405, { error: 'Method not allowed' });
  } catch (err) { json(res, 500, { error: err.message }); }
};
