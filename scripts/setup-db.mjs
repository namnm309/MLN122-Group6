import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

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
