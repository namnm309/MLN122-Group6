ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_rooms" ON public.rooms FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_players" ON public.players FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_votes" ON public.votes FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "allow_all_game_state" ON public.game_state FOR ALL USING (TRUE) WITH CHECK (TRUE);

CREATE INDEX IF NOT EXISTS idx_players_room_id ON public.players(room_id);
CREATE INDEX IF NOT EXISTS idx_votes_room_id ON public.votes(room_id);
CREATE INDEX IF NOT EXISTS idx_votes_round ON public.votes(room_id, round_number);
