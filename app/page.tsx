import { GameProvider } from "@/lib/game-context";
import { GameOrchestrator } from "@/components/game/game-orchestrator";

export default function Page() {
  return (
    <GameProvider>
      <main>
        <GameOrchestrator />
      </main>
    </GameProvider>
  );
}
