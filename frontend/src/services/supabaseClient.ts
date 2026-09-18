import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const clientUrl = supabaseUrl || "https://placeholder.supabase.co";
const clientKey = supabaseAnonKey || "placeholder-anon-key";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables; database features are disabled.");
}

export const supabase = createClient(clientUrl, clientKey);
