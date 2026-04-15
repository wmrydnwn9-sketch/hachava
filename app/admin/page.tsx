import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';

const cards = [
  { href: '/admin/orders', title: 'ניהול הזמנות', desc: 'צפייה ועדכון סטטוס של הזמנות לקוחות' },
  { href: '/admin/products', title: 'ניהול מוצרים', desc: 'הוספה ועריכה של קטגוריות ומוצרים' },
  { href: '/admin/promotions', title: 'ניהול מבצעים', desc: 'יצירה, הפעלה ומחיקה של מבצעים' },
  { href: '/admin/content', title: 'ניהול תוכן', desc: 'עדכון טקסטים ופרטי העסק' },
  { href: '/admin/media', title: 'ניהול מדיה', desc: 'העלאת תמונות וקבלת קישורים ציבוריים' },
];

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black gold-text">דשבורד ניהול</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rustic-card rounded-[2rem] p-6 transition hover:-translate-y-1">
            <h2 className="text-2xl font-bold gold-text">{card.title}</h2>
            <p className="mt-3 leading-7 text-stone-200">{card.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
