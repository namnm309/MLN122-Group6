"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  AppliedRoundRule,
  GameState,
  Player,
  GameRound,
  RoleId,
  Indicators,
  GAME_ROUNDS,
  ROLES,
  applyPartialRoundEffect,
  createEmptyRoundEffect,
  generateRoomCode,
  materializeOptionEffect,
  matchesRoleRule,
  resolveRoleOption,
} from "./game-data";
import { supabase } from "./supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface GameContextValue {
  state: GameState;
  currentPlayerId: string | null;
  currentPlayerDbId: string | null;
  isHost: boolean;
  dbReady: boolean;

  // Actions
  createRoom: (hostName: string, roomName: string) => Promise<void>;
  joinRoom: (roomCode: string, playerName: string) => Promise<{ success: boolean; error?: string }>;
  selectRole: (role: RoleId) => Promise<void>;
  startGame: () => Promise<void>;
  submitVote: (optionIndex: number) => Promise<void>;
  nextRound: () => Promise<void>;
  restartGame: () => void;
  endRoundNow: () => Promise<void>;
}

const defaultIndicators: Indicators = { growth: 5, equity: 5, stability: 5 };

export const ROUND_DURATION_SECONDS = 90;

const defaultState: GameState = {
  roomCode: "",
  roomName: "",
  hostName: "",
  players: [],
  phase: "lobby",
  currentRound: 0,
  indicators: { ...defaultIndicators },
  votes: {},
  roundHistory: [],
  countdown: ROUND_DURATION_SECONDS,
};

const ROLE_IDS: RoleId[] = ["state", "business", "worker", "citizen"];

function resolveRoleChoice(
  round: GameRound,
  roleId: RoleId,
  roleVoteBreakdown: Partial<Record<RoleId, Record<string, number>>>
): string | null {
  const counts = roleVoteBreakdown[roleId] ?? {};
  let bestChoice: string | null = null;
  let bestCount = -1;

  round.roles[roleId].options.forEach((option) => {
    const count = counts[option.id] ?? 0;
    if (count > bestCount) {
      bestChoice = option.id;
      bestCount = count;
    }
  });

  return bestCount > 0 ? bestChoice : null;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>({ ...defaultState });
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [currentPlayerDbId, setCurrentPlayerDbId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  // Use refs for values needed inside subscription callbacks to avoid stale closures
  const roomCodeRef = useRef<string>("");
  const currentRoundRef = useRef<number>(0);

  const stopCountdown = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  // Check if database tables exist
  useEffect(() => {
    const checkDb = async () => {
      try {
        const { error } = await supabase.from("rooms").select("id").limit(1);
        if (!error) {
          setDbReady(true);
          console.log("[v0] Database tables found, realtime enabled");
        } else {
          console.warn("[v0] Database tables not found:", error.message);
          setDbReady(false);
        }
      } catch (e) {
        console.warn("[v0] Database check failed");
        setDbReady(false);
      }
    };
    checkDb();
  }, []);

  // Keep refs in sync with state so subscription callbacks always have fresh values
  useEffect(() => {
    roomCodeRef.current = state.roomCode;
  }, [state.roomCode]);

  useEffect(() => {
    currentRoundRef.current = state.currentRound;
  }, [state.currentRound]);

  // Subscribe to realtime updates when in a room
  useEffect(() => {
    if (!state.roomCode || !dbReady) return;

    console.log("[v0] Setting up realtime subscription for room:", state.roomCode);

    channelRef.current = supabase.channel(`game-room-${state.roomCode}`);

    // Subscribe to players changes
    channelRef.current
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players", filter: `room_id=eq.${state.roomCode}` },
        async () => {
          // Use ref to get fresh roomCode (avoid stale closure)
          const { data } = await supabase
            .from("players")
            .select("*")
            .eq("room_id", roomCodeRef.current)
            .order("joined_at", { ascending: true });

          if (data) {
            const players: Player[] = data.map((p) => ({
              id: p.id,
              name: p.name,
              role: p.role as RoleId | null,
              vote: null,
            }));
            setState((prev) => ({ ...prev, players }));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "votes", filter: `room_id=eq.${state.roomCode}` },
        async () => {
          // Use refs to avoid stale closures
          const { data } = await supabase
            .from("votes")
            .select("*")
            .eq("room_id", roomCodeRef.current)
            .eq("round_number", currentRoundRef.current);

          if (data) {
            const votes: Record<string, string> = {};
            data.forEach((v) => {
              votes[v.player_id] = String(v.option_index);
            });
            setState((prev) => ({ ...prev, votes }));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${state.roomCode}` },
        async (payload) => {
          const room = payload.new as any;
          if (!room) return;

          // Handle round_result: guests transition to results screen
          if (room.status === "round_result") {
            setState((prev) => {
              if (prev.phase === "round") {
                return { ...prev, phase: "round_result" };
              }
              return prev;
            });
            return;
          }

          // Handle playing: guests transition to round screen (game started or next round)
          if (room.status === "playing" && room.current_round > 0) {
            setState((prev) => {
              if (prev.phase === "waiting") {
                // Game just started
                return {
                  ...prev,
                  phase: "round",
                  currentRound: room.current_round,
                  votes: {},
                  countdown: ROUND_DURATION_SECONDS,
                };
              }
              if (prev.phase === "round_result" && prev.currentRound !== room.current_round) {
                // Next round
                return {
                  ...prev,
                  phase: "round",
                  currentRound: room.current_round,
                  votes: {},
                  countdown: ROUND_DURATION_SECONDS,
                };
              }
              return prev;
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "game_state", filter: `room_id=eq.${state.roomCode}` },
        async (payload) => {
          const gs = payload.new as any;
          if (!gs) return;
          setState((prev) => ({
            ...prev,
            indicators: {
              growth: gs.economic_growth / 10,
              equity: gs.social_equity / 10,
              stability: gs.market_stability / 10,
            },
            roundHistory: gs.round_history || [],
          }));
        }
      )
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [state.roomCode, state.currentRound, dbReady]);

  const createRoom = useCallback(async (hostName: string, roomName: string) => {
    const roomCode = generateRoomCode();
    const displayName = roomName.trim() || "Game Room";

    try {
      // Create room — host is NOT added as a player, only as room creator
      const { error: roomError } = await supabase
        .from("rooms")
        .insert([{ id: roomCode, name: displayName, created_by: hostName, status: "waiting" }]);

      if (roomError) throw roomError;

      // Create initial game state
      const { error: gsError } = await supabase
        .from("game_state")
        .insert([{
          room_id: roomCode,
          current_round: 0,
          economic_growth: 50,
          social_equity: 50,
          market_stability: 50,
          round_history: [],
        }]);

      if (gsError) throw gsError;

      setState({
        ...defaultState,
        roomCode,
        roomName: displayName,
        hostName,
        players: [],
        phase: "waiting",
      });
      // Host has no player DB id — they are the observer/moderator
      setCurrentPlayerId(`host-${roomCode}`);
      setCurrentPlayerDbId(null);
      setIsHost(true);
    } catch (error: any) {
      console.error("[v0] Error creating room:", error);
    }
  }, [dbReady]);

  const joinRoom = useCallback(
    async (roomCode: string, playerName: string): Promise<{ success: boolean; error?: string }> => {
      if (!roomCode || !playerName) {
        return { success: false, error: "Vui long dien day du thong tin." };
      }

      const upperRoomCode = roomCode.toUpperCase();
      console.log("[v0] Joining room:", upperRoomCode);

      if (!dbReady) {
        return { success: false, error: "Database chua san sang. Vui long chay SQL setup." };
      }

      try {
        // Check if room exists
        const { data: roomData, error: roomError } = await supabase
          .from("rooms")
          .select("*")
          .eq("id", upperRoomCode)
          .single();

        if (roomError || !roomData) {
          return { success: false, error: "Ma phong khong ton tai." };
        }

        // Add player
        const { data: playerData, error: playerError } = await supabase
          .from("players")
          .insert([{ room_id: upperRoomCode, name: playerName, role: null }])
          .select()
          .single();

        if (playerError) {
          if (playerError.code === "23505") {
            return { success: false, error: "Ten nay da duoc su dung trong phong." };
          }
          throw playerError;
        }

        // Fetch all players
        const { data: allPlayers } = await supabase
          .from("players")
          .select("*")
          .eq("room_id", upperRoomCode)
          .order("joined_at", { ascending: true });

        const players: Player[] = (allPlayers || []).map((p) => ({
          id: p.id,
          name: p.name,
          role: p.role as RoleId | null,
          vote: null,
        }));

        setState((prev) => ({
          ...prev,
          roomCode: upperRoomCode,
          roomName: roomData.name || upperRoomCode,
          hostName: roomData.created_by,
          players,
          phase: "waiting",
        }));
        setCurrentPlayerId(playerData.id);
        setCurrentPlayerDbId(playerData.id);
        setIsHost(false);

        console.log("[v0] Joined room successfully");
        return { success: true };
      } catch (error: any) {
        console.error("[v0] Error joining room:", error);
        return { success: false, error: "Loi tham gia phong." };
      }
    },
    [dbReady]
  );

  const selectRole = useCallback(async (role: RoleId) => {
    if (!currentPlayerDbId || !dbReady) return;

    console.log("[v0] Selecting role:", role);

    try {
      await supabase
        .from("players")
        .update({ role })
        .eq("id", currentPlayerDbId);

      setState((prev) => ({
        ...prev,
        players: prev.players.map((p) =>
          p.id === currentPlayerDbId ? { ...p, role } : p
        ),
      }));
    } catch (error) {
      console.error("[v0] Error selecting role:", error);
    }
  }, [currentPlayerDbId, dbReady]);

  const startGame = useCallback(async () => {
    if (!state.roomCode || !dbReady) return;

    try {
      const { data: playersData, error: playersError } = await supabase
        .from("players")
        .select("id")
        .eq("room_id", state.roomCode)
        .order("joined_at", { ascending: true });

      if (playersError) throw playersError;
      if (!playersData || playersData.length === 0) return;

      const shuffledPlayers = [...playersData].sort(() => Math.random() - 0.5);
      const shuffledRoles = ROLES.map((r) => r.id as RoleId).sort(() => Math.random() - 0.5);

      const assignments = shuffledPlayers.map((player, index) => ({
        playerId: player.id,
        role: shuffledRoles[index % shuffledRoles.length],
      }));

      const roleUpdates = await Promise.all(
        assignments.map((assignment) =>
          supabase
            .from("players")
            .update({ role: assignment.role })
            .eq("id", assignment.playerId)
        )
      );

      const roleUpdateError = roleUpdates.find((result) => result.error)?.error;
      if (roleUpdateError) throw roleUpdateError;

      // Update rooms table — the subscription will trigger phase transition for ALL guests
      const { error: roomError } = await supabase
        .from("rooms")
        .update({ status: "playing", current_round: 1, started_at: new Date().toISOString() })
        .eq("id", state.roomCode);

      if (roomError) throw roomError;

      // Update game state
      await supabase
        .from("game_state")
        .update({ current_round: 1 })
        .eq("room_id", state.roomCode);

      const roleByPlayerId = new Map(assignments.map((assignment) => [assignment.playerId, assignment.role]));

      // Host transitions immediately without waiting for its own subscription event
      setState((prev) => ({
        ...prev,
        players: prev.players.map((player) => ({
          ...player,
          role: (roleByPlayerId.get(player.id) ?? player.role) as RoleId | null,
        })),
        phase: "round",
        currentRound: 1,
        indicators: { ...defaultIndicators },
        votes: {},
        roundHistory: [],
        countdown: ROUND_DURATION_SECONDS,
      }));
    } catch (error) {
      console.error("[v0] Error starting game:", error);
    }
  }, [state.roomCode, dbReady]);

  const resolveVotes = useCallback(async () => {
    console.log("[v0] Resolving votes");

    const round = GAME_ROUNDS[state.currentRound - 1];
    if (!round || !dbReady) return;

    try {
      // Get all votes
      const { data: voteData } = await supabase
        .from("votes")
        .select("*")
        .eq("room_id", state.roomCode)
        .eq("round_number", state.currentRound);

      // Get current game state
      const { data: gsData } = await supabase
        .from("game_state")
        .select("*")
        .eq("room_id", state.roomCode)
        .single();

      const currentGrowth = (gsData?.economic_growth || 50) / 10;
      const currentEquity = (gsData?.social_equity || 50) / 10;
      const currentStability = (gsData?.market_stability || 50) / 10;

      const { data: playersData } = await supabase
        .from("players")
        .select("*")
        .eq("room_id", state.roomCode);

      const voteBreakdown: Record<string, number> = {};
      const roleVoteBreakdown: Partial<Record<RoleId, Record<string, number>>> = {};
      const roleChoices: Record<RoleId, string | null> = {
        state: null,
        business: null,
        worker: null,
        citizen: null,
      };

      ROLE_IDS.forEach((roleId) => {
        roleVoteBreakdown[roleId] = {};
        round.roles[roleId].options.forEach((option) => {
          voteBreakdown[option.id] = 0;
          roleVoteBreakdown[roleId]![option.id] = 0;
        });
      });

      (playersData || []).forEach((p) => {
        const vote = (voteData || []).find((v) => v.player_id === p.id);
        const roleId = p.role as RoleId | null;
        if (!roleId || !vote) return;

        const option = round.roles[roleId].options[vote.option_index];
        if (!option) return;

        voteBreakdown[option.id] = (voteBreakdown[option.id] || 0) + 1;
        const perRole = roleVoteBreakdown[roleId] ?? {};
        perRole[option.id] = (perRole[option.id] || 0) + 1;
        roleVoteBreakdown[roleId] = perRole;
      });

      ROLE_IDS.forEach((roleId) => {
        roleChoices[roleId] = resolveRoleChoice(round, roleId, roleVoteBreakdown);
      });

      const baseEffect = ROLE_IDS.reduce((effect, roleId) => {
        const option = resolveRoleOption(round, roleId, roleChoices[roleId]);
        if (!option) return effect;
        return applyPartialRoundEffect(effect, materializeOptionEffect(option));
      }, createEmptyRoundEffect());

      const synergyApplied: AppliedRoundRule[] = [];
      round.synergyRules.forEach((rule) => {
        if (!matchesRoleRule(roleChoices, rule.if)) return;
        synergyApplied.push({
          id: rule.id,
          label: rule.label,
          text: rule.text,
          effect: applyPartialRoundEffect(createEmptyRoundEffect(), rule.bonus),
        });
      });

      const conflictApplied: AppliedRoundRule[] = [];
      round.conflictRules.forEach((rule) => {
        if (!matchesRoleRule(roleChoices, rule.if)) return;
        conflictApplied.push({
          id: rule.id,
          label: rule.label,
          text: rule.text,
          effect: applyPartialRoundEffect(createEmptyRoundEffect(), rule.penalty),
        });
      });

      const finalEffect = [...synergyApplied, ...conflictApplied].reduce(
        (effect, appliedRule) => applyPartialRoundEffect(effect, appliedRule.effect),
        baseEffect
      );

      const newIndicators: Indicators = {
        growth: Math.max(0, Math.min(10, currentGrowth + finalEffect.growth)),
        equity: Math.max(0, Math.min(10, currentEquity + finalEffect.equity)),
        stability: Math.max(0, Math.min(10, currentStability + finalEffect.stability)),
      };

      const roundData = {
        roundId: round.id,
        effect: finalEffect,
        voteBreakdown,
        roleVoteBreakdown,
        roleChoices,
        baseEffect,
        synergyApplied,
        conflictApplied,
        finalEffect,
      };

      // Update game state in DB — this triggers game_state subscription for all clients
      const history = gsData?.round_history || [];
      history.push(roundData);

      await supabase
        .from("game_state")
        .update({
          economic_growth: newIndicators.growth * 10,
          social_equity: newIndicators.equity * 10,
          market_stability: newIndicators.stability * 10,
          round_history: history,
        })
        .eq("room_id", state.roomCode);

      // Also update rooms status to "round_result" so guests can transition
      await supabase
        .from("rooms")
        .update({ status: "round_result" })
        .eq("id", state.roomCode);

      // Everyone (host + guests) transitions via their own setState
      setState((prev) => ({
        ...prev,
        phase: "round_result",
        indicators: newIndicators,
        roundHistory: history,
      }));
    } catch (error) {
      console.error("[v0] Error resolving votes:", error);
    }
  }, [state.roomCode, state.currentRound, dbReady]);

  const submitVote = useCallback(
    async (optionIndex: number) => {
      if (!currentPlayerDbId || !dbReady) return;

      console.log("[v0] Submitting vote:", optionIndex);

      try {
        await supabase
          .from("votes")
          .upsert(
            [{
              room_id: state.roomCode,
              round_number: state.currentRound,
              player_id: currentPlayerDbId,
              option_index: optionIndex,
            }],
            { onConflict: "room_id,round_number,player_id" }
          );

        setState((prev) => ({
          ...prev,
          votes: { ...prev.votes, [currentPlayerDbId]: String(optionIndex) },
        }));
      } catch (error) {
        console.error("[v0] Error submitting vote:", error);
      }
    },
    [currentPlayerDbId, state.roomCode, state.currentRound, dbReady]
  );

  // Check if all players (excluding host) have voted — then auto-resolve
  useEffect(() => {
    if (state.phase !== "round" || !dbReady || !isHost) return;

    const totalPlayers = state.players.length; // host is not in players list
    const totalVotes = Object.keys(state.votes).length;

    if (totalPlayers > 0 && totalVotes >= totalPlayers) {
      stopCountdown();
      const timer = setTimeout(() => resolveVotes(), 800);
      return () => clearTimeout(timer);
    }
  }, [state.votes, state.players, state.phase, dbReady, isHost, stopCountdown, resolveVotes]);

  const nextRound = useCallback(async () => {
    if (state.currentRound >= GAME_ROUNDS.length) {
      setState((prev) => ({ ...prev, phase: "final" }));
      return;
    }

    if (!dbReady) return;

    try {
      const nextRoundNum = state.currentRound + 1;

      // Update rooms with status "playing" and new round number — subscription triggers guests
      await supabase
        .from("rooms")
        .update({ status: "playing", current_round: nextRoundNum })
        .eq("id", state.roomCode);

      await supabase
        .from("game_state")
        .update({ current_round: nextRoundNum })
        .eq("room_id", state.roomCode);

      // Host also transitions immediately (don't wait for its own subscription)
      setState((prev) => ({
        ...prev,
        phase: "round",
        currentRound: nextRoundNum,
        votes: {},
        countdown: ROUND_DURATION_SECONDS,
      }));
    } catch (error) {
      console.error("[v0] Error moving to next round:", error);
    }
  }, [state.roomCode, state.currentRound, dbReady]);

  const restartGame = useCallback(() => {
    console.log("[v0] Restarting game");
    channelRef.current?.unsubscribe();
    setState({ ...defaultState });
    setCurrentPlayerId(null);
    setCurrentPlayerDbId(null);
    setIsHost(false);
    stopCountdown();
  }, [stopCountdown]);

  // Countdown timer
  useEffect(() => {
    if (state.phase === "round") {
      stopCountdown();
      setState((prev) => ({ ...prev, countdown: ROUND_DURATION_SECONDS }));

      countdownRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.countdown <= 1) {
            stopCountdown();
            resolveVotes();
            return { ...prev, countdown: 0 };
          }
          return { ...prev, countdown: prev.countdown - 1 };
        });
      }, 1000);
    } else {
      stopCountdown();
    }

    return () => stopCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.currentRound]);

  return (
    <GameContext.Provider
      value={{
        state,
        currentPlayerId,
        currentPlayerDbId,
        isHost,
        dbReady,
        createRoom,
        joinRoom,
        selectRole,
        startGame,
        submitVote,
        nextRound,
        restartGame,
        endRoundNow: resolveVotes,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
