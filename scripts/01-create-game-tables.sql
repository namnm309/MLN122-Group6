-- Create tables for the multiplayer game
-- Note: uuid_generate_v4() is built-in to Supabase PostgreSQL

-- Rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  current_round INTEGER DEFAULT 0,
  status TEXT DEFAULT 'waiting'
);

-- Players table
CREATE TABLE IF NOT EXISTS public.players (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, name)
);

-- Votes table
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  option_index INTEGER NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, round_number, player_id)
);

-- Game state table
CREATE TABLE IF NOT EXISTS public.game_state (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL UNIQUE REFERENCES public.rooms(id) ON DELETE CASCADE,
  current_round INTEGER DEFAULT 0,
  turn_index INTEGER DEFAULT 0,
  turn_expires_at TIMESTAMPTZ,
  economic_growth INTEGER DEFAULT 50,
  social_equity INTEGER DEFAULT 50,
  market_stability INTEGER DEFAULT 50,
  round_history JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_state ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "allow_create_rooms" ON public.rooms;
DROP POLICY IF EXISTS "allow_read_rooms" ON public.rooms;
DROP POLICY IF EXISTS "allow_update_rooms" ON public.rooms;
DROP POLICY IF EXISTS "allow_create_players" ON public.players;
DROP POLICY IF EXISTS "allow_read_players" ON public.players;
DROP POLICY IF EXISTS "allow_insert_votes" ON public.votes;
DROP POLICY IF EXISTS "allow_read_votes" ON public.votes;
DROP POLICY IF EXISTS "allow_create_game_state" ON public.game_state;
DROP POLICY IF EXISTS "allow_read_game_state" ON public.game_state;
DROP POLICY IF EXISTS "allow_update_game_state" ON public.game_state;

-- RLS Policies - Allow public access for this game
CREATE POLICY "allow_all_rooms" ON public.rooms FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_players" ON public.players FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_votes" ON public.votes FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_game_state" ON public.game_state FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_room_id ON public.players(room_id);
CREATE INDEX IF NOT EXISTS idx_votes_room_id ON public.votes(room_id);
CREATE INDEX IF NOT EXISTS idx_votes_round ON public.votes(room_id, round_number);
