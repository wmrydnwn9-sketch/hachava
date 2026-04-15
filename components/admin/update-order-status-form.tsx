"use client";
import { useState } from 'react';
const statuses = [{ value: 'pending', label: 'ממתינה' }, { value: 'approved', label: 'אושרה' }, { value: 'completed', label: 'הושלמה' }, { value: 'canceled', label: 'בוטלה' }];
export function UpdateOrderStatusForm({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus); const [saving, setSaving] = useState(false);
  async function save() { setSaving(true); const response = await fetch(`/api/admin/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }); setSaving(false); if (!response.ok) return alert('שגיאה בעדכון הסטטוס'); alert('הסטטוס עודכן'); }
  return <div className="min-w-[220px] rounded-2xl border border-amber-100/15 bg-black/20 p-4"><label className="mb-2 block text-sm text-stone-300">סטטוס הזמנה</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="mb-3 w-full rounded-xl bg-stone-950/50 px-3 py-2">{statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select><button onClick={save} disabled={saving} className="gold-btn w-full rounded-full px-4 py-2 font-bold">{saving ? 'שומר...' : 'שמירה'}</button></div>;
}
