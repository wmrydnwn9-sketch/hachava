import Link from 'next/link';
const links=[{href:'/admin',label:'סקירה'},{href:'/admin/orders',label:'הזמנות'},{href:'/admin/products',label:'מוצרים'},{href:'/admin/promotions',label:'מבצעים'},{href:'/admin/content',label:'תוכן'},{href:'/admin/media',label:'מדיה'}];
export function AdminNav(){ return <aside className="rustic-card rounded-4xl p-4"><nav className="flex flex-wrap gap-3 md:flex-col">{links.map(link=><Link key={link.href} href={link.href} className="rounded-2xl border border-amber-100/10 px-4 py-3 text-stone-100 hover:bg-black/25">{link.label}</Link>)}</nav></aside>; }
