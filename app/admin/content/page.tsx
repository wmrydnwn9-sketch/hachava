import { requireAdmin } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ContentSettingsForm } from '@/components/admin/content-settings-form';

export default async function AdminContentPage() {
  await requireAdmin();
  const { data: settings } = await supabaseAdmin.from('site_settings').select('*').single();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black gold-text">ניהול תוכן</h1>
      <ContentSettingsForm settings={settings} />
    </section>
  );
}
