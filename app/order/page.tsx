import { createServerSupabase } from '@/lib/supabase/server';
import { OrderForm } from '@/components/order/order-form';
export default async function OrderPage() {
  const supabase = await createServerSupabase();
  const { data: categories } = await supabase.from('product_categories').select('id, name_he, products(id, name_he, is_active)').eq('is_active', true).order('sort_order', { ascending: true });
  return <section className="mx-auto max-w-6xl px-4 py-12"><div className="mb-8 text-center"><h1 className="text-4xl font-black gold-text">ביצוע הזמנה</h1><p className="mt-3 text-lg text-stone-200">בחרו מוצרים, כמות, אופן קבלה ופרטי קשר — ואנחנו נדאג לכל השאר.</p></div><OrderForm categories={categories ?? []} /></section>;
}
