const { getEnv } = require('./env');

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}

async function sendOrderEmail(order) {
  const key = getEnv('RESEND_API_KEY');
  const from = getEnv('RESEND_FROM');
  const to = getEnv('ADMIN_EMAIL');
  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;background:#f7efe1;padding:24px;color:#2d1f14">
      <div style="max-width:640px;margin:auto;background:#fff8ef;border:1px solid #d2b17f;border-radius:18px;padding:24px">
        <h1 style="margin-top:0;color:#8b642d">הזמנה חדשה מהאתר</h1>
        <p><strong>שם:</strong> ${escapeHtml(order.customer_name)}</p>
        <p><strong>טלפון:</strong> ${escapeHtml(order.phone)}</p>
        <p><strong>סוג הזמנה:</strong> ${order.order_type === 'delivery' ? 'משלוח' : 'איסוף עצמי'}</p>
        <p><strong>כתובת:</strong> ${escapeHtml(order.address || 'לא הוזנה')}</p>
        <p><strong>הערות:</strong> ${escapeHtml(order.notes || 'ללא')}</p>
        <h2 style="color:#8b642d">פרטי ההזמנה</h2>
        <ul>${order.items.map((item) => `<li>${escapeHtml(item.product_name_snapshot)} — כמות: ${item.quantity}</li>`).join('')}</ul>
      </div>
    </div>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject: `הזמנה חדשה מאת ${order.customer_name}`, html })
  });
  if (!res.ok) throw new Error('Sending email failed');
}

module.exports = { sendOrderEmail };
