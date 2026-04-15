import { NextResponse } from 'next/server';
import { assertAdminApi, unauthorizedJson } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { orderStatusSchema } from '@/lib/validations';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await assertAdminApi())) return unauthorizedJson();

  const body = await request.json();
  const parsed = orderStatusSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from('orders').update(parsed.data).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
