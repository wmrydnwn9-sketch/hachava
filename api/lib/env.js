const crypto = require('crypto');

function getEnv(name, required = true, fallback = '') {
  const value = process.env[name] || fallback;
  if (required && !value) throw new Error(`${name} is required.`);
  return value;
}

function json(res, status, data, extraHeaders) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (extraHeaders) {
    for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  }
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); }
      catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').map(v => v.trim()).filter(Boolean).reduce((acc, cur) => {
    const idx = cur.indexOf('=');
    acc[cur.slice(0, idx)] = decodeURIComponent(cur.slice(idx + 1));
    return acc;
  }, {});
}

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function createSession(email) {
  const secret = getEnv('ADMIN_COOKIE_SECRET');
  const payload = `${email}|${Date.now()}`;
  const signature = sign(payload, secret);
  return Buffer.from(`${payload}|${signature}`).toString('base64url');
}

function verifySession(req) {
  const cookies = parseCookies(req);
  const raw = cookies.hachava_admin;
  if (!raw) return null;
  try {
    const decoded = Buffer.from(raw, 'base64url').toString('utf8');
    const [email, ts, signature] = decoded.split('|');
    const secret = getEnv('ADMIN_COOKIE_SECRET');
    const expected = sign(`${email}|${ts}`, secret);
    if (signature !== expected) return null;
    return { email, ts: Number(ts) };
  } catch (_) {
    return null;
  }
}

function requireAdmin(req, res) {
  const session = verifySession(req);
  const adminEmail = getEnv('ADMIN_EMAIL');
  if (!session || session.email !== adminEmail) {
    json(res, 401, { error: 'אין הרשאה' });
    return null;
  }
  return session;
}

function setSessionCookie(res, email) {
  const value = createSession(email);
  res.setHeader('Set-Cookie', `hachava_admin=${value}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=${60 * 60 * 12}`);
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'hachava_admin=; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=0');
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || '';
    const match = contentType.match(/boundary=(.+)$/);
    if (!match) return reject(new Error('Missing multipart boundary'));
    const boundary = '--' + match[1];
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const raw = buffer.toString('binary');
      const parts = raw.split(boundary).slice(1, -1);
      const fields = {};
      for (const part of parts) {
        const cleaned = part.replace(/^\r\n/, '');
        const splitIndex = cleaned.indexOf('\r\n\r\n');
        const head = cleaned.slice(0, splitIndex);
        const bodyBinary = cleaned.slice(splitIndex + 4, cleaned.length - 2);
        const name = /name="([^"]+)"/.exec(head)?.[1];
        const filename = /filename="([^"]+)"/.exec(head)?.[1];
        const type = /Content-Type: ([^\r\n]+)/i.exec(head)?.[1] || 'application/octet-stream';
        if (!name) continue;
        if (filename) fields[name] = { filename, type, buffer: Buffer.from(bodyBinary, 'binary') };
        else fields[name] = bodyBinary;
      }
      resolve(fields);
    });
    req.on('error', reject);
  });
}

module.exports = { getEnv, json, parseBody, parseCookies, requireAdmin, setSessionCookie, clearSessionCookie, parseMultipart };
