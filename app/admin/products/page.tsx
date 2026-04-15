import { requireAdmin } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ProductsManager } from '@/components/admin/products-manager';

export default async function AdminProductsPage() {
  await requireAdmin();
  const { data: categories } = await supabaseAdmin
    .from('product_categories')
    .select('*, products(*)')
    .order('sort_order', { ascending: true });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black gold-text">ניהול מוצרים</h1>
      <ProductsManager categories={categories ?? []} />
    </section>
  );
}
