import { requireAdmin } from '@/lib/auth';
import { MediaManager } from '@/components/admin/media-manager';

export default async function AdminMediaPage() {
  await requireAdmin();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black gold-text">ניהול מדיה</h1>
      <MediaManager />
    </section>
  );
}
