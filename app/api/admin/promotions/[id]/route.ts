import { NextResponse } from 'next/server';
import { assertAdminApi, unauthorizedJson } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await assertAdminApi())) return unauthorizedJson();
  const body = await request.json();
  const { id } = await params;
  const { error } = await supabaseAdmin.from('promotions').update(body).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await assertAdminApi())) return unauthorizedJson();
  const { id } = await params;
  const { error } = await supabaseAdmin.from('promotions').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
