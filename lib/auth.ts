import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
export async function getCurrentUser(){ const supabase = await createServerSupabase(); const { data: { user } } = await supabase.auth.getUser(); return user; }
export async function requireAdmin(){ const user = await getCurrentUser(); if(!user) redirect('/admin/login'); const { data: admin } = await supabaseAdmin.from('admin_users').select('user_id, role').eq('user_id', user.id).maybeSingle(); if(!admin) redirect('/admin/login'); return { user, admin }; }
export async function assertAdminApi(){ const user = await getCurrentUser(); if(!user) return false; const { data: admin } = await supabaseAdmin.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle(); return !!admin; }
