import { NextResponse } from 'next/server';
import { assertAdminApi, unauthorizedJson } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { contentSchema } from '@/lib/validations';

export async function PATCH(request: Request) {
  if (!(await assertAdminApi())) return unauthorizedJson();

  const body = await request.json();
  const parsed = contentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { id, ...payload } = parsed.data;
  const { error } = await supabaseAdmin
    .from('site_settings')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
