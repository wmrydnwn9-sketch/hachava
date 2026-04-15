const { json } = require('./lib/env');
const { select } = require('./lib/supabase');
module.exports = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const promotions = await select('promotions', '*', `&is_active=eq.true&or=(starts_at.is.null,starts_at.lte.${encodeURIComponent(now)})&or=(ends_at.is.null,ends_at.gte.${encodeURIComponent(now)})&order=created_at.desc`);
    json(res, 200, { promotions });
  } catch (err) {
    json(res, 500, { error: err.message });
  }
};
