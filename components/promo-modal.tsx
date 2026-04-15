"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export function PromoModal({ promotion }: { promotion: any }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (promotion) setOpen(true); }, [promotion]);
  if (!promotion || !open) return null;
  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"><div className="rustic-card w-full max-w-lg rounded-[2rem] p-6"><h2 className="mb-3 text-3xl font-black gold-text">{promotion.title_he}</h2><p className="mb-6 leading-8 text-stone-100">{promotion.description_he}</p><div className="flex gap-3"><Link href="/promotions" className="gold-btn rounded-full px-5 py-2 font-bold">לצפייה במבצעים</Link><button onClick={() => setOpen(false)} className="rounded-full border border-white/25 px-5 py-2">סגירה</button></div></div></div>;
}
