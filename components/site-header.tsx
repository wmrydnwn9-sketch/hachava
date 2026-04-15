import Image from 'next/image';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase/server';
export async function SiteHeader(){
  const supabase = await createServerSupabase();
  const { data: promotions } = await supabase.from('promotions').select('id').eq('is_active', true).limit(1);
  const nav = [{ href:'/', label:'דף הבית' },{ href:'/products', label:'מוצרים' },{ href:'/order', label:'הזמנה' },...(promotions && promotions.length>0 ? [{ href:'/promotions', label:'מבצעים' }] : []),{ href:'/about', label:'אודות' },{ href:'/contact', label:'צור קשר' }];
  return <header className="sticky top-0 z-50 border-b border-amber-200/15 bg-black/45 backdrop-blur-md"><div className="lamp-strip absolute inset-x-0 top-0 -z-10" /><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"><Link href="/" className="flex items-center gap-3"><Image src="/logo.png" alt="לוגו החווה" width={86} height={86} className="h-16 w-auto md:h-20" /><div className="hidden md:block"><div className="text-2xl font-bold gold-text">החווה</div><div className="text-sm text-stone-200">בשר איכותי מהמשק</div></div></Link><nav className="hidden gap-6 md:flex">{nav.map((item)=><Link key={item.href} href={item.href} className="text-stone-100 transition hover:text-amber-200">{item.label}</Link>)}</nav><Link href="/order" className="gold-btn rounded-full px-5 py-2 text-sm font-semibold">הזמינו עכשיו</Link></div></header>;
}
