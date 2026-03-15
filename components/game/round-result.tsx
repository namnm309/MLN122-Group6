"use client";

import { useGame } from "@/lib/game-context";
import { GAME_ROUNDS, ROLES, computeRoleScores, type RoleId } from "@/lib/game-data";
import { IndicatorBar, IndicatorDelta } from "./indicator-bar";
import { RoleBadge } from "./role-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RoundResult() {
  const { state, isHost, nextRound } = useGame();

  const round = GAME_ROUNDS[state.currentRound - 1];
  const history = state.roundHistory[state.roundHistory.length - 1];

  if (!round || !history) return null;

  const totalVotes = Object.values(history.voteBreakdown).reduce((a, b) => a + b, 0);
  const winningOption = round.options[history.winOption];
  const isLastRound = state.currentRound >= GAME_ROUNDS.length;
  const rolePoints = winningOption?.effect?.rolePoints ?? {};
  // Cumulative role scores up to this round
  const cumulativeScores = computeRoleScores(state.roundHistory);

  const getRoleVote = (roleId: string) => {
    const role = ROLES.find((r) => r.id === roleId);
    const choice = history.roleChoices[roleId as keyof typeof history.roleChoices];
    if (!role) return null;
    return { role, choice };
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 border-b border-border bg-card/50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold bg-secondary text-muted-foreground px-2 py-0.5 rounded-full border border-border">
              Vòng {state.currentRound} / {GAME_ROUNDS.length} — Kết quả
            </span>
            <span className="text-xs text-muted-foreground">
              {totalVotes} phiếu
            </span>
          </div>
          <IndicatorBar indicators={state.indicators} showLabels />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-2xl mx-auto w-full space-y-5">
        {/* Winning option highlight */}
        <div className="bg-card border-2 border-primary/40 rounded-2xl p-5">
          <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
            Phương án được chọn
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold shrink-0">
              {String.fromCharCode(65 + history.winOption)}
            </div>
            <div className="text-base font-semibold leading-snug">
              {winningOption?.text}
            </div>
          </div>
          <IndicatorDelta effect={history.effect} />
        </div>

        {/* Vote breakdown */}
        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Kết quả bỏ phiếu
          </h3>
          <div className="space-y-2.5">
            {round.options.map((option, index) => {
              const votes = history.voteBreakdown[index] ?? 0;
              const pct = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
              const isWinner = index === history.winOption;

              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold",
                          isWinner
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {option.id}
                      </span>
                      <span
                        className={cn(
                          "text-xs leading-relaxed",
                          isWinner ? "text-foreground font-medium" : "text-muted-foreground"
                        )}
                      >
                        {option.text}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-mono shrink-0 ml-2",
                        isWinner ? "text-primary font-bold" : "text-muted-foreground"
                      )}
                    >
                      {votes} phiếu ({Math.round(pct)}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        isWinner ? "bg-primary" : "bg-muted-foreground/40"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role impact this round */}
        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Tác động lên từng vai (vòng này)
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((role) => {
              const pts = rolePoints[role.id as RoleId] ?? 0;
              const cumulative = cumulativeScores[role.id as RoleId] ?? 0;
              return (
                <div
                  key={role.id}
                  className="p-3 rounded-xl border bg-card flex items-center gap-2.5"
                  style={{ borderColor: pts > 0 ? `${role.color}60` : pts < 0 ? "#e0624a60" : undefined }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${role.color}18` }}
                    aria-hidden="true"
                  >
                    {role.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn("text-xs font-semibold", role.textClass)}>{role.label}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="text-sm font-extrabold font-mono"
                        style={{ color: pts > 0 ? role.color : pts < 0 ? "#e0624a" : "#888" }}
                      >
                        {pts > 0 ? "+" : ""}{pts}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        | tong: <span className="font-mono font-bold text-foreground">{cumulative > 0 ? "+" : ""}{cumulative}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role choices */}
        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Mỗi vai đã chọn gì
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((role) => {
              const rv = getRoleVote(role.id);
              if (!rv) return null;
              const { choice } = rv;
              return (
                <div
                  key={role.id}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-xl border bg-card",
                    choice ? role.borderClass : "border-border opacity-50"
                  )}
                >
                  <span className="text-xl shrink-0">{role.icon}</span>
                  <div className="min-w-0">
                    <div className={cn("text-xs font-semibold", role.textClass)}>
                      {role.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {choice !== null && choice !== undefined ? (
                        <span>
                          Chon{" "}
                          <span className="font-mono font-bold text-foreground">
                            {String.fromCharCode(65 + Number(choice))}
                          </span>
                        </span>
                      ) : (
                        "Khong co nguoi choi"
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analysis message */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Phân tích
          </div>
          <p className="text-sm leading-relaxed text-foreground italic">
            {`"`}{round.message}{`"`}
          </p>
        </div>

        {/* Round indicators labels */}
        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Trạng thái chỉ số
          </h3>
          <IndicatorBar indicators={state.indicators} showLabels />
        </div>
      </div>

      {/* Next button */}
      <div className="p-4 border-t border-border">
        <div className="max-w-2xl mx-auto">
          {isHost ? (
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={nextRound}
            >
              {isLastRound ? "Xem kết quả cuối game" : `Tiếp theo: Vòng ${state.currentRound + 1}`}
            </Button>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-3">
              Chờ host chuyển sang vòng tiếp theo...
            </div>
          )}
          {/* If single player, always show the button */}
          {!isHost && state.players.length === 1 && (
            <Button
              className="w-full h-12 text-base font-semibold mt-2"
              onClick={nextRound}
            >
              {isLastRound ? "Xem kết quả cuối game" : `Tiếp theo: Vòng ${state.currentRound + 1}`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
