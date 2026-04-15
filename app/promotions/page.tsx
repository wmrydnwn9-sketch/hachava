import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
export default async function PromotionsPage() {
  const supabase = await createServerSupabase();
  const { data: promotions } = await supabase.from('promotions').select('*').eq('is_active', true).order('created_at', { ascending: false });
  if (!promotions || promotions.length === 0) notFound();
  return <section className="mx-auto max-w-6xl px-4 py-12"><div className="mb-10 text-center"><h1 className="text-4xl font-black gold-text">מבצעים מיוחדים</h1><p className="mt-3 text-lg text-stone-200">הצעות נבחרות המתעדכנות ישירות ממערכת הניהול.</p></div><div className="grid gap-6 md:grid-cols-2">{promotions.map((promotion: any) => <article key={promotion.id} className="rustic-card overflow-hidden rounded-[2rem]">{promotion.image_url && <div className="relative h-72"><Image src={promotion.image_url} alt={promotion.title_he} fill className="object-cover" /></div>}<div className="p-6"><h2 className="text-3xl font-bold gold-text">{promotion.title_he}</h2><p className="mt-4 leading-8 text-stone-100">{promotion.description_he}</p></div></article>)}</div></section>;
}
