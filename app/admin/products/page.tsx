import { ProductsManager } from '@/components/admin/products-manager';
import { requireAdmin } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
export default async function AdminProductsPage(){ await requireAdmin(); const { data: categories } = await supabaseAdmin.from('product_categories').select('*, products(*)').order('sort_order',{ascending:true}); return <section><h1 className="mb-8 text-4xl font-black gold-text">ניהול מוצרים</h1><ProductsManager categories={categories ?? []} /></section>; }
