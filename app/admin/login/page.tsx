"use client";
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
export default function AdminLoginPage() {
  const supabase = createClient(); const router = useRouter();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [loading, setLoading] = useState(false);
  async function signIn(e: React.FormEvent) { e.preventDefault(); setLoading(true); const { error } = await supabase.auth.signInWithPassword({ email, password }); setLoading(false); if (error) { alert('פרטי התחברות שגויים'); return; } router.push('/admin'); router.refresh(); }
  return <section className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-12"><form onSubmit={signIn} className="rustic-card w-full rounded-[2rem] p-8"><h1 className="mb-6 text-4xl font-black gold-text">כניסת מנהל</h1><div className="space-y-4"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="אימייל" className="input-base" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="סיסמה" className="input-base" /><button disabled={loading} className="gold-btn w-full rounded-full px-6 py-3 font-black">{loading ? 'מתחבר...' : 'כניסה'}</button></div></form></section>;
}
