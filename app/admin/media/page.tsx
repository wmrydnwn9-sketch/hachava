import { MediaManager } from '@/components/admin/media-manager';
import { requireAdmin } from '@/lib/auth';
export default async function AdminMediaPage(){ await requireAdmin(); return <section><h1 className="mb-8 text-4xl font-black gold-text">ניהול מדיה</h1><MediaManager /></section>; }
