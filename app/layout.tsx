import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
export const metadata: Metadata = {
  title: 'החווה | בשר איכותי מהמשק',
  description: 'קצביית פרימיום כשרה עם חוויית קנייה חמה, איכותית ומשפחתית — מהמשק לצלחת.'
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl"><body className="site-bg min-h-screen text-stone-100"><div className="site-overlay" /><SiteHeader /><main className="relative z-10">{children}</main><SiteFooter /></body></html>
  );
}
