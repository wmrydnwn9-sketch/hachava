import { NextResponse } from 'next/server';
import { assertAdminApi, unauthorizedJson } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  if (!(await assertAdminApi())) return unauthorizedJson();

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = String(formData.get('folder') || 'general');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

  const { error } = await supabaseAdmin.storage.from('site-assets').upload(path, Buffer.from(bytes), {
    contentType: file.type,
    upsert: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabaseAdmin.storage.from('site-assets').getPublicUrl(path);
  return NextResponse.json({ ok: true, path, url: data.publicUrl });
}
