import Image from 'next/image';
import { createServerSupabase } from '@/lib/supabase/server';
export default async function ProductsPage() {
  const supabase = await createServerSupabase();
  const { data: categories } = await supabase.from('product_categories').select('id, name_he, slug, image_url, products(*)').eq('is_active', true).order('sort_order', { ascending: true });
  return <section className="mx-auto max-w-7xl px-4 py-12"><div className="mb-10 text-center"><h1 className="text-4xl font-black gold-text">המוצרים שלנו</h1><p className="mt-3 text-lg text-stone-200">קטגוריות איכות לבחירה — ללא הצגת מחירים, עם אפשרות הרחבה קלה בעתיד.</p></div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{categories?.map((category: any) => <article key={category.id} className="rustic-card overflow-hidden rounded-[1.8rem]"><div className="relative h-64"><Image src={category.image_url || '/products/default.svg'} alt={category.name_he} fill className="object-cover" /></div><div className="p-5"><h2 className="text-2xl font-bold gold-text">{category.name_he}</h2><p className="mt-3 text-sm text-stone-300">{category.products?.length || 0} פריטים זמינים להזמנה</p></div></article>)}</div></section>;
}
