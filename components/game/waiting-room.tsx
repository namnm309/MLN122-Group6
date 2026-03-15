"use client";

import { useGame } from "@/lib/game-context";
import { ROLES } from "@/lib/game-data";
import { RoleBadge } from "./role-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Host view: lobby dashboard — shows room code, joined players, roles
// ------------------------------------------------------------------
function HostLobby() {
  const { state, startGame, restartGame } = useGame();
  const canStart = state.players.length >= 1;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
              Phòng của bạn
            </div>
            <div className="text-3xl font-mono font-extrabold text-primary tracking-widest">
              {state.roomCode}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Chia sẻ mã này để người chơi tham gia
            </div>
          </div>
          <button
            onClick={restartGame}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Thoát
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-3xl mx-auto w-full space-y-6">

        {/* Live player list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">
              Người chơi ({state.players.length})
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indicator-equity animate-pulse" />
              <span className="text-xs text-muted-foreground">Realtime</span>
            </div>
          </div>

          {state.players.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-2xl py-10 text-center text-muted-foreground text-sm">
              Chưa có người chơi nào tham gia.<br />
              <span className="text-xs mt-1 block opacity-70">Chia sẻ mã phòng để mời người chơi.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {state.players.map((player) => {
                const roleInfo = player.role ? ROLES.find((r) => r.id === player.role) : null;
                return (
                  <div
                    key={player.id}
                    className={cn(
                      "flex items-center gap-3 p-3.5 rounded-xl border bg-card transition-all",
                      roleInfo ? roleInfo.borderClass : "border-border"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center text-base font-bold shrink-0",
                        roleInfo ? roleInfo.bgClass : "bg-secondary"
                      )}
                    >
                      {roleInfo ? roleInfo.icon : player.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{player.name}</div>
                      {roleInfo ? (
                        <div className={cn("text-xs font-medium", roleInfo.textClass)}>
                          {roleInfo.label}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground italic">Chưa chọn vai</div>
                      )}
                    </div>
                    {player.role && <RoleBadge roleId={player.role} size="sm" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border text-sm text-muted-foreground leading-relaxed">
          Vai trò sẽ được hệ thống random tự động khi host bấm bắt đầu game.
        </div>
      </div>

      {/* Start button */}
      <div className="p-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <Button
            className="w-full h-12 text-base font-semibold"
            disabled={!canStart}
            onClick={startGame}
          >
            {canStart
              ? `Bắt đầu game (${state.players.length} người chơi)`
              : "Chờ ít nhất 1 người tham gia..."}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Guest view: role selection + waiting for host to start
// ------------------------------------------------------------------
function GuestLobby() {
  const { state, currentPlayerDbId, currentPlayerId, restartGame } = useGame();

  const myId = currentPlayerDbId || currentPlayerId;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between max-w-2xl mx-auto w-full">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
              Phòng
            </div>
            <div className="text-2xl font-mono font-extrabold text-primary tracking-widest">
              {state.roomCode}
            </div>
          </div>
          <button
            onClick={restartGame}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Thoát
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-2xl mx-auto w-full space-y-6">
        {/* Role assignment info */}
        <div>
          <h2 className="font-bold text-base mb-1">Vai trò sẽ được random</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Bạn không cần chọn vai. Khi host bấm bắt đầu game, hệ thống sẽ tự random vai cho tất cả người chơi.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ROLES.map((role) => {
              return (
                <div
                  key={role.id}
                  className={cn("p-3 rounded-xl border text-center", role.bgClass, role.borderClass)}
                >
                  <div className="text-2xl mb-1">{role.icon}</div>
                  <div className={cn("text-xs font-semibold", role.textClass)}>
                    {role.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other players */}
        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Người trong phòng ({state.players.length})
          </h3>
          <div className="space-y-2">
            {state.players.map((player) => (
              <div
                key={player.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border bg-card",
                  player.id === myId ? "border-primary/40" : "border-border"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      player.role
                        ? ROLES.find((r) => r.id === player.role)?.bgClass
                        : "bg-secondary"
                    )}
                  >
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm font-medium">
                    {player.name}
                    {player.id === myId && (
                      <span className="ml-1.5 text-xs text-muted-foreground">(bạn)</span>
                    )}
                  </div>
                </div>
                {player.role ? (
                  <RoleBadge roleId={player.role} size="sm" />
                ) : (
                  <span className="text-xs text-muted-foreground italic">Chưa chọn vai</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div className="p-6 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
            <span className="w-2 h-2 rounded-full bg-indicator-equity animate-pulse" />
            Vai trò sẽ được random khi host bắt đầu game...
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main export: route to correct view based on isHost
// ------------------------------------------------------------------
export function WaitingRoom() {
  const { isHost } = useGame();
  return isHost ? <HostLobby /> : <GuestLobby />;
}
