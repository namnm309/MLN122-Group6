CREATE TABLE IF NOT EXISTS public.players (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, name)
);

CREATE TABLE IF NOT EXISTS public.votes (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  option_index INTEGER NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, round_number, player_id)
);

CREATE TABLE IF NOT EXISTS public.game_state (
  id UUID DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  room_id TEXT NOT NULL UNIQUE REFERENCES public.rooms(id) ON DELETE CASCADE,
  current_round INTEGER DEFAULT 0,
  economic_growth INTEGER DEFAULT 50,
  social_equity INTEGER DEFAULT 50,
  market_stability INTEGER DEFAULT 50,
  round_history JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
