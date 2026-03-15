import { createClient } from '@supabase/supabase-js';

const FALLBACK_SUPABASE_URL = 'https://zbbblggjvgsixnwpesei.supabase.co';
const FALLBACK_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiYmJsZ2dqdmdzaXhud3Blc2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NjAxODUsImV4cCI6MjA4OTAzNjE4NX0.yMY7g_-qrGar2QAAW817ygvtHWqHRqtyDI7fU-GKsLQ';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupDatabase() {
  try {
    console.log('Setting up database tables...');

    // Create rooms table
    const { error: roomsError } = await supabase.rpc('create_rooms_table', {});
    if (roomsError && !roomsError.message.includes('already exists')) {
      console.error('Error creating rooms table:', roomsError);
    } else {
      console.log('✓ Rooms table ready');
    }

    // Create players table
    const { error: playersError } = await supabase.rpc('create_players_table', {});
    if (playersError && !playersError.message.includes('already exists')) {
      console.error('Error creating players table:', playersError);
    } else {
      console.log('✓ Players table ready');
    }

    // Create votes table
    const { error: votesError } = await supabase.rpc('create_votes_table', {});
    if (votesError && !votesError.message.includes('already exists')) {
      console.error('Error creating votes table:', votesError);
    } else {
      console.log('✓ Votes table ready');
    }

    // Create game_state table
    const { error: stateError } = await supabase.rpc('create_game_state_table', {});
    if (stateError && !stateError.message.includes('already exists')) {
      console.error('Error creating game_state table:', stateError);
    } else {
      console.log('✓ Game state table ready');
    }

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
