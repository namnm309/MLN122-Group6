-- Run this SQL in your Supabase SQL Editor to set up the database

-- 1. Create rooms table
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

-- 2. Create players table
CREATE TABLE IF NOT EXISTS public.players (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, name)
);

-- 3. Create votes table
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  option_index INTEGER NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, round_number, player_id)
);

-- 4. Create game_state table
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

-- 5. Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_state ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS Policies (Allow all for this game - it's public classroom game)
CREATE POLICY "allow_all_rooms" ON public.rooms FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_players" ON public.players FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_votes" ON public.votes FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_game_state" ON public.game_state FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- 7. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_room_id ON public.players(room_id);
CREATE INDEX IF NOT EXISTS idx_votes_room_id ON public.votes(room_id);
CREATE INDEX IF NOT EXISTS idx_votes_round ON public.votes(room_id, round_number);
CREATE INDEX IF NOT EXISTS idx_game_state_room_id ON public.game_state(room_id);
