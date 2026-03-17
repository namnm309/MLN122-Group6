import { GameProvider } from "@/lib/game-context";
import { GameOrchestrator } from "@/components/game/game-orchestrator";
import Link from "next/link";

export default function GamePage() {
  return (
    <GameProvider>
      <main>
        <div className="fixed top-4 left-4 z-50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-3 py-1.5 text-sm font-semibold text-muted-foreground backdrop-blur hover:text-foreground hover:bg-secondary transition-colors"
          >
            <span aria-hidden="true">←</span>
            Về trang chủ
          </Link>
        </div>
        <GameOrchestrator />
      </main>
    </GameProvider>
  );
}

