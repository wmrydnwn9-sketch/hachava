import { Resend } from 'resend';
import { NewOrderEmail } from '@/emails/new-order-email';
export async function sendOrderEmail(payload:{ customerName:string; phone:string; address?:string; notes?:string; orderType:'delivery'|'pickup'; items:Array<{name:string; quantity:number}>; }){
  const key = process.env.RESEND_API_KEY; if(!key){ console.warn('RESEND_API_KEY missing'); return; }
  const resend = new Resend(key);
  await resend.emails.send({ from: process.env.RESEND_FROM!, to:[process.env.ADMIN_EMAIL!], subject:`הזמנה חדשה מאת ${payload.customerName}`, react: NewOrderEmail(payload) });
}
