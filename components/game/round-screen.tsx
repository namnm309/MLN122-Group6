"use client";

import { useGame } from "@/lib/game-context";
import { GAME_ROUNDS, ROLES, RoleId } from "@/lib/game-data";
import { IndicatorBar } from "./indicator-bar";
import { RoleBadge } from "./role-badge";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Host observer dashboard during a round
// ------------------------------------------------------------------
function HostRoundDashboard() {
  const { state } = useGame();
  const round = GAME_ROUNDS[state.currentRound - 1];
  const votedCount = Object.keys(state.votes).length;
  const totalCount = state.players.length;
  const pctCountdown = (state.countdown / 30) * 100;
  const isUrgent = state.countdown <= 10;

  if (!round) return null;

  // Build per-option vote tally
  const optionTally: Record<number, { count: number; voters: string[] }> = {};
  round.options.forEach((_, i) => { optionTally[i] = { count: 0, voters: [] }; });

  state.players.forEach((p) => {
    const v = state.votes[p.id];
    if (v !== undefined) {
      const idx = Number(v);
      if (optionTally[idx]) {
        optionTally[idx].count++;
        optionTally[idx].voters.push(p.name);
      }
    }
  });

  const maxVotes = Math.max(...Object.values(optionTally).map((t) => t.count), 1);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 border-b border-border bg-card/50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/30">
                Vòng {state.currentRound} / {GAME_ROUNDS.length}
              </span>
              <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full border border-border font-medium">
                HOST — Quan sát
              </span>
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 font-mono font-bold text-lg",
                isUrgent ? "text-destructive" : "text-foreground"
              )}
            >
              {isUrgent && <span className="w-2 h-2 rounded-full bg-destructive animate-ping" />}
              {state.countdown}s
            </div>
          </div>
          {/* Countdown bar */}
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                isUrgent ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${pctCountdown}%` }}
            />
          </div>
          <IndicatorBar indicators={state.indicators} showLabels={false} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-3xl mx-auto w-full space-y-5">
        {/* Scenario */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-extrabold text-xl text-balance mb-2 leading-tight">{round.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{round.context}</p>
        </div>

        {/* Live vote progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">
              Phiếu bầu thời gian thực
            </h3>
            <span className="text-xs font-mono text-muted-foreground">
              {votedCount}/{totalCount} đã vote
            </span>
          </div>
          <div className="space-y-3">
            {round.options.map((option, index) => {
              const tally = optionTally[index];
              const pct = totalCount > 0 ? (tally.count / totalCount) * 100 : 0;
              const isLeading = tally.count === maxVotes && tally.count > 0;
              return (
                <div key={option.id} className={cn(
                  "p-3.5 rounded-2xl border bg-card",
                  isLeading ? "border-primary/50 bg-primary/5" : "border-border"
                )}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border shrink-0",
                      isLeading ? "bg-primary border-primary text-primary-foreground" : "bg-secondary border-border text-muted-foreground"
                    )}>
                      {option.id}
                    </div>
                    <span className={cn("text-sm flex-1 leading-snug", isLeading ? "font-medium text-foreground" : "text-muted-foreground")}>
                      {option.text}
                    </span>
                    <span className={cn("text-sm font-mono font-bold shrink-0", isLeading ? "text-primary" : "text-muted-foreground")}>
                      {tally.count} phiếu
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", isLeading ? "bg-primary" : "bg-muted-foreground/30")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {/* Show who voted for this */}
                  {tally.voters.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tally.voters.map((name) => {
                        const player = state.players.find((p) => p.name === name);
                        const roleInfo = player?.role ? ROLES.find((r) => r.id === player.role) : null;
                        return (
                          <span
                            key={name}
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full border font-medium",
                              roleInfo ? cn(roleInfo.bgClass, roleInfo.textClass, roleInfo.borderClass) : "bg-secondary text-muted-foreground border-border"
                            )}
                          >
                            {roleInfo ? roleInfo.icon : ""} {name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Player vote status */}
        <div>
          <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">
            Trạng thái người chơi
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {state.players.map((player) => {
              const hasVoted = state.votes[player.id] !== undefined;
              const roleInfo = player.role ? ROLES.find((r) => r.id === player.role) : null;
              return (
                <div
                  key={player.id}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-xl border bg-card transition-all",
                    hasVoted ? "border-indicator-equity/50" : "border-border"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                    roleInfo ? roleInfo.bgClass : "bg-secondary"
                  )}>
                    {roleInfo ? roleInfo.icon : player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{player.name}</div>
                    {roleInfo && (
                      <div className={cn("text-xs", roleInfo.textClass)}>{roleInfo.label}</div>
                    )}
                  </div>
                  <div className={cn(
                    "text-xs font-medium shrink-0",
                    hasVoted ? "text-indicator-equity" : "text-muted-foreground"
                  )}>
                    {hasVoted ? "Đã vote" : "Chưa..."}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Guest voting screen
// ------------------------------------------------------------------
function GuestRoundScreen() {
  const { state, currentPlayerDbId, currentPlayerId, submitVote, isHost } = useGame();
  const round = GAME_ROUNDS[state.currentRound - 1];
  const myId = currentPlayerDbId || currentPlayerId;
  const currentPlayer = state.players.find((p) => p.id === myId);
  const myVote = myId ? state.votes[myId] : null;
  const votedCount = Object.keys(state.votes).length;
  const totalCount = state.players.length;
  const pctCountdown = (state.countdown / 30) * 100;
  const isUrgent = state.countdown <= 10;

  if (!round) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <header className="px-4 py-3 border-b border-border bg-card/50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/30">
                Vòng {state.currentRound} / {GAME_ROUNDS.length}
              </span>
              {currentPlayer?.role && (
                <RoleBadge roleId={currentPlayer.role} size="sm" />
              )}
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 font-mono font-bold text-lg",
                isUrgent ? "text-destructive" : "text-foreground"
              )}
              aria-label={`Con ${state.countdown} giay`}
            >
              {state.countdown}s
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                isUrgent ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${pctCountdown}%` }}
            />
          </div>
          <IndicatorBar indicators={state.indicators} showLabels={false} />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-2xl mx-auto w-full">
        {/* Public scenario context */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-3">
          <h2 className="font-extrabold text-xl text-balance mb-3 leading-tight">
            {round.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{round.context}</p>
        </div>

        {/* Private role context — shown only to this player based on their role */}
        {currentPlayer?.role && round.roleContext[currentPlayer.role] && (() => {
          const roleInfo = ROLES.find((r) => r.id === currentPlayer.role);
          const privateInfo = round.roleContext[currentPlayer.role as RoleId];
          return (
            <div
              className="rounded-2xl p-4 mb-5 border-2"
              style={{
                borderColor: `${roleInfo?.color}60`,
                background: `${roleInfo?.color}0f`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base" aria-hidden="true">{roleInfo?.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: roleInfo?.color }}>
                  Góc nhìn của bạn — {roleInfo?.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{privateInfo}</p>
            </div>
          );
        })()}

        <h3 className="font-bold text-base mb-3">{round.question}</h3>

        <div className="space-y-3">
          {round.options.map((option, index) => {
            const isMyVote = myVote === String(index);
            return (
              <button
                key={option.id}
                onClick={() => !myVote && submitVote(index)}
                disabled={!!myVote}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200",
                  "flex items-center gap-3",
                  isMyVote
                    ? "border-primary bg-primary/10 scale-[1.01]"
                    : myVote
                    ? "border-border bg-card opacity-60 cursor-not-allowed"
                    : "border-border bg-card hover:border-primary/60 hover:bg-primary/5 active:scale-[0.99]"
                )}
                aria-pressed={isMyVote}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border-2 shrink-0 transition-colors",
                    isMyVote
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-secondary border-border text-muted-foreground"
                  )}
                >
                  {option.id}
                </div>
                <span className="text-sm leading-relaxed">{option.text}</span>
                {isMyVote && (
                  <span className="ml-auto text-primary text-lg shrink-0" aria-hidden="true">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom status */}
      <div className="border-t border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
          <div className="text-muted-foreground">{votedCount}/{totalCount} đã vote</div>
          {myVote ? (
            <div className="text-indicator-equity font-medium">
              Đã chọn {String.fromCharCode(65 + Number(myVote))} — Chờ kết quả...
            </div>
          ) : (
            <div className="text-muted-foreground animate-pulse">Đang chờ bạn vote...</div>
          )}
        </div>
        <div className="max-w-2xl mx-auto flex gap-1.5 mt-2">
          {state.players.map((p) => {
            const hasVoted = !!state.votes[p.id];
            const roleInfo = p.role ? ROLES.find((r) => r.id === p.role) : null;
            return (
              <div
                key={p.id}
                title={`${p.name}${hasVoted ? " (đã vote)" : ""}`}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-all duration-300",
                  hasVoted
                    ? roleInfo ? roleInfo.bgClass : "bg-primary"
                    : "bg-secondary"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main export
// ------------------------------------------------------------------
export function RoundScreen() {
  const { isHost } = useGame();
  return isHost ? <HostRoundDashboard /> : <GuestRoundScreen />;
}
