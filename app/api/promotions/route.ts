import { NextResponse } from 'next/server';
import { assertAdminApi, unauthorizedJson } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { promotionSchema } from '@/lib/validations';

export async function POST(request: Request) {
  if (!(await assertAdminApi())) return unauthorizedJson();

  const json = await request.json();
  const parsed = promotionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('promotions').insert(parsed.data);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
