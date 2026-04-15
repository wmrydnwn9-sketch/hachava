import { ContentSettingsForm } from '@/components/admin/content-settings-form';
import { requireAdmin } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
export default async function AdminContentPage(){ await requireAdmin(); const { data: settings } = await supabaseAdmin.from('site_settings').select('*').single(); return <section><h1 className="mb-8 text-4xl font-black gold-text">ניהול תוכן</h1><ContentSettingsForm settings={settings} /></section>; }
