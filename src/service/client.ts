import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and key must be provided. I'm not sure why they aren't right now..."
  );
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export { supabase };
