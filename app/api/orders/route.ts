import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { orderSchema } from '@/lib/validations';
import { sendOrderEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = orderSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { customer_name, phone, address, notes, order_type, items } = parsed.data;

    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('id, name_he')
      .in('id', items.map((item) => item.product_id));

    if (productsError) throw productsError;

    const nameMap = new Map(products?.map((p) => [p.id, p.name_he]));

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({ customer_name, phone, address, notes, order_type, status: 'pending' })
      .select('id')
      .single();

    if (orderError) throw orderError;

    const payloadItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name_snapshot: nameMap.get(item.product_id) || 'מוצר',
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(payloadItems);
    if (itemsError) throw itemsError;

    if (process.env.RESEND_API_KEY) {
      await sendOrderEmail({
        customerName: customer_name,
        phone,
        address,
        notes,
        orderType: order_type,
        items: payloadItems.map((item) => ({ name: item.product_name_snapshot, quantity: item.quantity })),
      });
    }

    return NextResponse.json({ ok: true, order_id: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
