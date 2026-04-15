const { json, parseBody, setSessionCookie, getEnv } = require('../lib/env');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  try {
    const body = await parseBody(req);
    const email = getEnv('ADMIN_EMAIL');
    const password = getEnv('ADMIN_PASSWORD');
    if (body.email !== email || body.password !== password) return json(res, 401, { error: 'פרטי התחברות שגויים.' });
    setSessionCookie(res, email);
    json(res, 200, { ok: true });
  } catch (err) { json(res, 500, { error: err.message }); }
};
