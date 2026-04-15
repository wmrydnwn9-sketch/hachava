import { PromotionManager } from '@/components/admin/promotion-manager';
import { requireAdmin } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
export default async function AdminPromotionsPage(){ await requireAdmin(); const { data: promotions } = await supabaseAdmin.from('promotions').select('*').order('created_at',{ascending:false}); return <PromotionManager promotions={promotions ?? []} />; }
