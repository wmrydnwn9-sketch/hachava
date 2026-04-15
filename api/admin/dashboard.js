const { json, requireAdmin } = require('../lib/env');
const { select } = require('../lib/supabase');
module.exports = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const [orders, products, promotions] = await Promise.all([
      select('orders', 'id,status', '&status=eq.pending'),
      select('products', 'id', '&is_active=eq.true'),
      select('promotions', 'id', '&is_active=eq.true')
    ]);
    json(res, 200, { pendingOrders: orders.length, activeProducts: products.length, activePromotions: promotions.length });
  } catch (err) { json(res, 500, { error: err.message }); }
};
