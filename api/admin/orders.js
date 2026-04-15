const { json, requireAdmin } = require('../lib/env');
const { select, patch } = require('../lib/supabase');
module.exports = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    if (req.method === 'GET') {
      const orders = await select('orders', '*,order_items(id,product_name_snapshot,quantity)', '&order=created_at.desc');
      const normalized = orders.map(o => ({ ...o, items: o.order_items || [] }));
      return json(res, 200, { orders: normalized });
    }
    if (req.method === 'PATCH') {
      const url = new URL(req.url, 'http://localhost');
      const id = url.searchParams.get('id');
      let data = '';
      for await (const chunk of req) data += chunk;
      const body = JSON.parse(data || '{}');
      if (!id || !body.status) return json(res, 400, { error: 'Missing id or status' });
      await patch('orders', `id=eq.${id}`, { status: body.status });
      return json(res, 200, { ok: true });
    }
    json(res, 405, { error: 'Method not allowed' });
  } catch (err) { json(res, 500, { error: err.message }); }
};
