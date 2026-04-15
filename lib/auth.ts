import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { createServerSupabase } from './supabase/server';

export async function requireAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login');
  }

  return user;
}

export async function assertAdminApi() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !!user && user.email === process.env.ADMIN_EMAIL;
}

export function unauthorizedJson() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
