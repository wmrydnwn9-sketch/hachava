import { AdminNav } from '@/components/admin/admin-nav';
export default function AdminLayout({ children }: { children: React.ReactNode }){ return <section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-6 md:grid-cols-[260px_1fr]"><AdminNav /><div>{children}</div></div></section>; }
