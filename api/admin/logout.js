const { json, clearSessionCookie } = require('../lib/env');
module.exports = async (req, res) => { clearSessionCookie(res); json(res, 200, { ok: true }); };
