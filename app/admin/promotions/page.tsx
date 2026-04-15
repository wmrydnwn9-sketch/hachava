import { requireAdmin } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { PromotionManager } from '@/components/admin/promotion-manager';

export default async function AdminPromotionsPage() {
  await requireAdmin();
  const { data: promotions } = await supabaseAdmin.from('promotions').select('*').order('created_at', { ascending: false });
  return <PromotionManager promotions={promotions ?? []} />;
}
