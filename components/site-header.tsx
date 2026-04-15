import Link from 'next/link';
import Image from 'next/image';
const nav = [
  { href: '/', label: 'דף הבית' },
  { href: '/products', label: 'מוצרים' },
  { href: '/order', label: 'הזמנה' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' }
];
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/20 bg-black/40 backdrop-blur-md"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"><Link href="/" className="flex items-center gap-3"><Image src="/logo.png" alt="לוגו החווה" width={86} height={86} className="h-16 w-auto md:h-20" /><div className="hidden md:block"><div className="text-2xl font-bold gold-text">החווה</div><div className="text-sm text-stone-200">בשר איכותי מהמשק</div></div></Link><nav className="hidden gap-6 md:flex">{nav.map((item) => (<Link key={item.href} href={item.href} className="text-stone-100 transition hover:text-amber-200">{item.label}</Link>))}</nav><Link href="/order" className="gold-btn rounded-full px-5 py-2 text-sm font-semibold">הזמינו עכשיו</Link></div></header>
  );
}
