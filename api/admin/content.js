const { json, requireAdmin, parseBody } = require('../lib/env');
const { select, patch } = require('../lib/supabase');
module.exports = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    if (req.method === 'GET') {
      const settings = (await select('site_settings', '*', '&limit=1'))[0] || {};
      return json(res, 200, { settings });
    }
    if (req.method === 'PATCH') {
      const body = await parseBody(req);
      const current = (await select('site_settings', 'id', '&limit=1'))[0];
      if (!current) return json(res, 404, { error: 'Site settings row missing' });
      await patch('site_settings', `id=eq.${current.id}`, body);
      return json(res, 200, { ok: true });
    }
    json(res, 405, { error: 'Method not allowed' });
  } catch (err) { json(res, 500, { error: err.message }); }
};
