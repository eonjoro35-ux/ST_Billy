import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
const clientUrl = supabaseUrl || "https://placeholder.supabase.co";
const clientKey = supabaseAnonKey || "placeholder-anon-key";

if (!isSupabaseConfigured) {
  console.warn("Missing Supabase environment variables; database features are disabled.");
}

export const supabase = createClient(clientUrl, clientKey);
