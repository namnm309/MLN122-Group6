import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export const useRoomSync = (roomId: string) => {
  const [room, setRoom] = useState<any>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Fetch initial room data
    const fetchRoom = async () => {
      const { data } = await supabase.from('rooms').select('*').eq('id', roomId).single();
      if (data) setRoom(data);
    };

    fetchRoom();

    // Subscribe to room updates
    channelRef.current = supabase.channel(`room:${roomId}`);

    channelRef.current
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` }, (payload) => {
        setRoom(payload.new);
      })
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [roomId]);

  return room;
};

export const usePlayersSync = (roomId: string) => {
  const [players, setPlayers] = useState<any[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Fetch initial players
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', roomId)
        .order('joined_at', { ascending: true });
      if (data) setPlayers(data);
    };

    fetchPlayers();

    // Subscribe to player changes
    channelRef.current = supabase.channel(`players:${roomId}`);

    channelRef.current
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${roomId}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setPlayers((prev) => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setPlayers((prev) => prev.map((p) => (p.id === payload.new.id ? payload.new : p)));
        } else if (payload.eventType === 'DELETE') {
          setPlayers((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [roomId]);

  return players;
};

export const useVotesSync = (roomId: string, roundNumber: number) => {
  const [votes, setVotes] = useState<any[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId || roundNumber < 0) return;

    // Fetch initial votes
    const fetchVotes = async () => {
      const { data } = await supabase
        .from('votes')
        .select('*')
        .eq('room_id', roomId)
        .eq('round_number', roundNumber);
      if (data) setVotes(data);
    };

    fetchVotes();

    // Subscribe to vote changes
    channelRef.current = supabase.channel(`votes:${roomId}:${roundNumber}`);

    channelRef.current
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes',
          filter: `room_id=eq.${roomId}&round_number=eq.${roundNumber}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setVotes((prev) => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setVotes((prev) => prev.map((v) => (v.id === payload.new.id ? payload.new : v)));
          } else if (payload.eventType === 'DELETE') {
            setVotes((prev) => prev.filter((v) => v.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [roomId, roundNumber]);

  return votes;
};

export const useGameStateSync = (roomId: string) => {
  const [gameState, setGameState] = useState<any>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Fetch initial game state
    const fetchGameState = async () => {
      try {
        const { data, error } = await supabase
          .from('game_state')
          .select('*')
          .eq('room_id', roomId)
          .single();

        if (!error && data) setGameState(data);
      } catch (e) {
        // Table may not exist yet
      }
    };

    fetchGameState();

    // Subscribe to game state updates
    channelRef.current = supabase.channel(`game-state:${roomId}`);

    channelRef.current
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'game_state', filter: `room_id=eq.${roomId}` },
        (payload) => {
          setGameState(payload.new);
        }
      )
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [roomId]);

  return gameState;
};
