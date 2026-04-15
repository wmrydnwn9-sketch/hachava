const { json, parseBody } = require('./lib/env');
const { insert, select } = require('./lib/supabase');
const { sendOrderEmail } = require('./lib/mail');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  try {
    const body = await parseBody(req);
    if (!body.customer_name || String(body.customer_name).trim().length < 2) return json(res, 400, { error: 'יש להזין שם מלא.' });
    if (!body.phone || String(body.phone).trim().length < 8) return json(res, 400, { error: 'יש להזין מספר טלפון תקין.' });
    if (!['delivery', 'pickup'].includes(body.order_type)) return json(res, 400, { error: 'סוג הזמנה לא תקין.' });
    const items = Array.isArray(body.items) ? body.items.filter(i => Number(i.quantity) > 0 && i.product_id) : [];
    if (!items.length) return json(res, 400, { error: 'יש לבחור לפחות מוצר אחד.' });
    const ids = items.map(i => i.product_id);
    const products = await select('products', 'id,name_he', `&id=in.(${ids.join(',')})`);
    const productMap = Object.fromEntries(products.map(p => [p.id, p.name_he]));
    const inserted = await insert('orders', {
      customer_name: body.customer_name,
      phone: body.phone,
      address: body.address || '',
      notes: body.notes || '',
      order_type: body.order_type,
      status: 'pending'
    });
    const order = inserted[0];
    const orderItems = items.map(i => ({ order_id: order.id, product_id: i.product_id, product_name_snapshot: productMap[i.product_id] || i.product_name || 'מוצר', quantity: Number(i.quantity) }));
    await insert('order_items', orderItems, 'minimal');
    await sendOrderEmail({ ...order, items: orderItems });
    json(res, 200, { ok: true, order_id: order.id });
  } catch (err) {
    json(res, 500, { error: err.message || 'Order creation failed' });
  }
};
