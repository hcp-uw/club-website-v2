import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dummy-project.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "dummy-anon-key";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_KEY) {
  console.warn(
    "Supabase URL or Key is missing. Operating in local storage fallback mode."
  );
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export { supabase };
