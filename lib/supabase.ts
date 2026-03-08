import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

export const supabaseClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);

export const supabaseServer = createClient(url, process.env.SUPABASE_SECRET_KEY!);
