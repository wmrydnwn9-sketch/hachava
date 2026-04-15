const { json } = require('./lib/env');
const { select } = require('./lib/supabase');
module.exports = async (req, res) => {
  try {
    const settings = (await select('site_settings', '*', '&limit=1'))[0] || {};
    json(res, 200, { settings });
  } catch (err) {
    json(res, 500, { error: err.message });
  }
};
