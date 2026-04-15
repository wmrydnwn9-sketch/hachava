import { NextResponse } from 'next/server';
import { assertAdminApi } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
export async function PATCH(request: Request, context:{ params: Promise<{ id:string }> }){ if(!(await assertAdminApi())) return NextResponse.json({ error:'Unauthorized' },{ status:401 }); const { id } = await context.params; const { status } = await request.json(); const { error } = await supabaseAdmin.from('orders').update({ status }).eq('id', id); if(error) return NextResponse.json({ error:error.message },{ status:500 }); return NextResponse.json({ ok:true }); }
