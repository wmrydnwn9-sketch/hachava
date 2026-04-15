import Image from 'next/image';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase/server';
import { PromoModal } from '@/components/promo-modal';
export default async function HomePage() {
  const supabase = await createServerSupabase();
  const [{ data: settings }, { data: promotions }] = await Promise.all([
    supabase.from('site_settings').select('*').single(),
    supabase.from('promotions').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(1)
  ]);
  const activePromotion = promotions?.[0] ?? null;
  return <><PromoModal promotion={activePromotion} /><section className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-16"><div className="grid w-full gap-10 md:grid-cols-2 md:items-center"><div className="rustic-card rounded-[2rem] p-8 md:p-10"><p className="mb-3 text-sm tracking-[0.28em] text-amber-100">כשר • טרי • איכותי</p><h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl gold-text">{settings?.hero_title ?? 'בשר איכותי מהמשק'}</h1><p className="mb-2 text-2xl text-stone-100">{settings?.slogan ?? 'מהמשק לצלחת'}</p><p className="mb-8 max-w-xl text-lg leading-8 text-stone-200">{settings?.hero_subtitle ?? 'חוויית בשר פרימיום עם שירות אישי, טריות ללא פשרות ואווירה חמה מהכפר.'}</p><div className="flex flex-wrap gap-4"><Link href="/order" className="gold-btn rounded-full px-7 py-3 font-bold">הזמינו עכשיו</Link><Link href="/products" className="rounded-full border border-amber-100/40 bg-black/20 px-7 py-3 font-bold text-stone-100">לצפייה במוצרים</Link></div></div><div className="flex justify-center"><div className="relative rounded-[2rem] border border-amber-200/30 bg-black/25 p-6 shadow-2xl"><Image src={settings?.logo_url || '/logo.png'} alt="לוגו החווה" width={520} height={520} priority className="h-auto w-[280px] md:w-[420px]" /></div></div></div></section></>;
}
