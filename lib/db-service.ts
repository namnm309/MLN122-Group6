import { supabase } from './supabase';

export const dbService = {
  // Room operations
  async createRoom(id: string, name: string, createdBy: string) {
    const { data, error } = await supabase.from('rooms').insert([{ id, name, created_by: createdBy, status: 'waiting' }]).select().single();
    if (error) throw error;
    return data;
  },

  async getRoom(id: string) {
    const { data, error } = await supabase.from('rooms').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async updateRoom(id: string, updates: any) {
    const { data, error } = await supabase.from('rooms').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async getRoomExists(id: string) {
    const { count, error } = await supabase.from('rooms').select('*', { count: 'exact', head: true }).eq('id', id);
    if (error) return false;
    return (count || 0) > 0;
  },

  // Player operations
  async addPlayer(roomId: string, name: string, role: string) {
    const { data, error } = await supabase
      .from('players')
      .insert([{ room_id: roomId, name, role, score: 0 }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getPlayers(roomId: string) {
    const { data, error } = await supabase.from('players').select('*').eq('room_id', roomId).order('joined_at', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async updatePlayerScore(playerId: string, scoreIncrement: number) {
    const { data, error } = await supabase
      .from('players')
      .update({ score: supabase.rpc('increment_score', { player_id: playerId, increment: scoreIncrement }) })
      .eq('id', playerId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Vote operations
  async addVote(roomId: string, roundNumber: number, playerId: string, optionIndex: number) {
    const { data, error } = await supabase
      .from('votes')
      .upsert(
        [{ room_id: roomId, round_number: roundNumber, player_id: playerId, option_index: optionIndex }],
        { onConflict: 'room_id,round_number,player_id' }
      )
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getVotes(roomId: string, roundNumber: number) {
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .eq('room_id', roomId)
      .eq('round_number', roundNumber);
    if (error) throw error;
    return data || [];
  },

  async countVotes(roomId: string, roundNumber: number) {
    const { data, error } = await supabase
      .from('votes')
      .select('option_index')
      .eq('room_id', roomId)
      .eq('round_number', roundNumber);
    if (error) throw error;

    const counts: { [key: number]: number } = {};
    (data || []).forEach((vote) => {
      counts[vote.option_index] = (counts[vote.option_index] || 0) + 1;
    });
    return counts;
  },

  // Game state operations
  async createGameState(roomId: string) {
    const { data, error } = await supabase
      .from('game_state')
      .insert([
        {
          room_id: roomId,
          current_round: 0,
          economic_growth: 50,
          social_equity: 50,
          market_stability: 50,
          round_history: [],
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getGameState(roomId: string) {
    try {
      const { data, error } = await supabase.from('game_state').select('*').eq('room_id', roomId).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (e) {
      return null;
    }
  },

  async updateGameState(roomId: string, updates: any) {
    const { data, error } = await supabase
      .from('game_state')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('room_id', roomId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async appendRoundHistory(roomId: string, roundData: any) {
    const current = await this.getGameState(roomId);
    const history = current?.round_history || [];
    history.push(roundData);

    const { data, error } = await supabase
      .from('game_state')
      .update({ round_history: history, updated_at: new Date().toISOString() })
      .eq('room_id', roomId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
