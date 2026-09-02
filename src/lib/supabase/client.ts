import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Returns null when Supabase hasn't been connected yet, so callers can
// gracefully fall back to the local mock catalogue instead of crashing.
export const supabaseBrowser = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
