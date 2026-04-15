import { redirect } from "next/navigation";
import { createServerSupabase } from "./supabase/server";
export async function requireAdmin() { const supabase = await createServerSupabase(); const { data: { user } } = await supabase.auth.getUser(); if (!user || user.email !== process.env.ADMIN_EMAIL) redirect("/admin/login"); return user; }
