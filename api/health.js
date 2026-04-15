const { json } = require('./lib/env');
module.exports = async (req, res) => json(res, 200, { ok: true });
