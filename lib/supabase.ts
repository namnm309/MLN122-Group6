import { createClient } from '@supabase/supabase-js';

const FALLBACK_SUPABASE_URL = 'https://zbbblggjvgsixnwpesei.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiYmJsZ2dqdmdzaXhud3Blc2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NjAxODUsImV4cCI6MjA4OTAzNjE4NX0.yMY7g_-qrGar2QAAW817ygvtHWqHRqtyDI7fU-GKsLQ';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
