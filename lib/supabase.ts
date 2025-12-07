import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bllhmxwzdkvmldqdjcxh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

// Client minimal pour les lectures publiques. Evite de casser le rendu si la clé est absente.
export const supabase =
  supabaseKey && supabaseUrl
    ? createClient(supabaseUrl, supabaseKey)
    : null;

