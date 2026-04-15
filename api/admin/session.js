const { json, requireAdmin } = require('../lib/env');
module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  json(res, 200, { ok: true, email: session.email });
};
