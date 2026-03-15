"use client";

import { useGame } from "@/lib/game-context";
import { HomeScreen } from "./home-screen";
import { WaitingRoom } from "./waiting-room";
import { RoundScreen } from "./round-screen";
import { RoundResult } from "./round-result";
import { FinalScreen } from "./final-screen";

export function GameOrchestrator() {
  const { state } = useGame();

  switch (state.phase) {
    case "lobby":
      return <HomeScreen />;
    case "waiting":
      return <WaitingRoom />;
    case "round":
      return <RoundScreen />;
    case "round_result":
      return <RoundResult />;
    case "final":
      return <FinalScreen />;
    default:
      return <HomeScreen />;
  }
}
