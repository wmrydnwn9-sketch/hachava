import { NextResponse } from 'next/server';
import { assertAdminApi } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { productSchema } from '@/lib/validations';
export async function POST(request: Request){ if(!(await assertAdminApi())) return NextResponse.json({ error:'Unauthorized' },{ status:401 }); const body = await request.json(); const parsed = productSchema.safeParse(body); if(!parsed.success) return NextResponse.json({ error: parsed.error.flatten() },{ status:400 }); const { error } = await supabaseAdmin.from('products').insert(parsed.data); if(error) return NextResponse.json({ error:error.message },{ status:500 }); return NextResponse.json({ ok:true }); }
