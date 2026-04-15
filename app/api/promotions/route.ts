import { NextResponse } from 'next/server';
import { assertAdminApi } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { promotionSchema } from '@/lib/validations';
export async function POST(request: Request){ if(!(await assertAdminApi())) return NextResponse.json({ error:'Unauthorized' },{ status:401 }); const json = await request.json(); const parsed = promotionSchema.safeParse(json); if(!parsed.success) return NextResponse.json({ error: parsed.error.flatten() },{ status:400 }); const payload = { ...parsed.data, starts_at: parsed.data.starts_at || null, ends_at: parsed.data.ends_at || null }; const { error } = await supabaseAdmin.from('promotions').insert(payload); if(error) return NextResponse.json({ error:error.message },{ status:500 }); return NextResponse.json({ ok:true }); }
