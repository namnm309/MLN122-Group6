"use client";

import { useGame } from "@/lib/game-context";
import { GAME_ROUNDS, ROLES, getHistoryEffect, type RoleId } from "@/lib/game-data";
import { IndicatorBar } from "./indicator-bar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RoundResult() {
  const { state, isHost, nextRound } = useGame();

  const round = GAME_ROUNDS[state.currentRound - 1];
  const history = state.roundHistory[state.roundHistory.length - 1];

  if (!round || !history) return null;

  const formatDelta = (value: number) => (value > 0 ? `+${value}` : `${value}`);

  const totalVotes = Object.values(history.voteBreakdown).reduce((a, b) => a + b, 0);
  const isLastRound = state.currentRound >= GAME_ROUNDS.length;
  const finalEffect = getHistoryEffect(history);
  const synergyApplied = history.synergyApplied ?? [];
  const conflictApplied = history.conflictApplied ?? [];

  const hasConflict = conflictApplied.length > 0;
  const hasSynergy = synergyApplied.length > 0;

  const roleScoresThisRound = (["state", "business", "worker", "citizen"] as RoleId[]).map((rid) => ({
    roleId: rid,
    score: finalEffect.rolePoints[rid] ?? 0,
  }));
  const maxScore = Math.max(...roleScoresThisRound.map((r) => r.score), 0);
  const topRolesThisRound = roleScoresThisRound
    .filter((r) => r.score === maxScore && maxScore > 0)
    .map((r) => ROLES.find((role) => role.id === r.roleId))
    .filter(Boolean);

  const topRolesExplanation = hasConflict
    ? "Vòng này đang nghiêng về xung đột lợi ích, nên các vai được lợi nhất là những bên kéo điểm về phía mình nhiều hơn."
    : hasSynergy
      ? "Vòng này có phối hợp ăn khớp, nên các vai được lợi nhất là những bên chạm đúng “điểm gặp nhau” để nhận thêm điểm."
      : "Chưa thấy xung đột hay phối hợp rõ rệt, nhưng vẫn có vài vai ghi điểm vòng này cao hơn mặt bằng.";

  const indicatorDeltaText =
    `Trong vòng này: ` +
    `Tăng trưởng ${formatDelta(finalEffect.growth)}, ` +
    `Công bằng ${formatDelta(finalEffect.equity)}, ` +
    `Ổn định ${formatDelta(finalEffect.stability)}.`;

  const indicatorWhyText = hasConflict
    ? "Xung đột khiến hệ thống bị kéo căng hơn: có thể tăng ở mặt này nhưng giảm ở mặt khác."
    : hasSynergy
      ? "Phối hợp làm các lựa chọn ăn khớp: các chỉ số thường được đẩy về đúng nhịp."
      : "Không có combo rõ rệt: chỉ số biến động theo tổng hợp lựa chọn trong vòng.";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-4 py-3 border-b border-border bg-card/50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold bg-secondary text-muted-foreground px-2 py-0.5 rounded-full border border-border">
              Vòng {state.currentRound} / {GAME_ROUNDS.length} — Kết quả theo vai
            </span>
            <span className="text-xs text-muted-foreground">{totalVotes} phiếu</span>
          </div>
          <IndicatorBar indicators={state.indicators} showLabels />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-3xl mx-auto w-full space-y-5">
        <div className="rounded-2xl border border-primary/35 bg-primary/5 p-5">
          <h2 className="text-xl font-extrabold leading-tight">{round.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">{round.context}</p>
        </div>

        <div className="rounded-2xl border bg-card p-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {hasConflict ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/50 bg-destructive/15 px-3 py-1.5 text-sm font-semibold text-destructive">
                Có xung đột
              </span>
            ) : hasSynergy ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/15 px-3 py-1.5 text-sm font-semibold text-primary">
                Phối hợp khá ổn
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-muted-foreground">
                Trung tính, chưa rõ xung đột
              </span>
            )}
          </div>
          {hasConflict && (
            <p className="text-xs text-muted-foreground">
              Vòng này các vai kéo mạnh về phía mình, hệ thống đang phải gồng.
            </p>
          )}
          {hasSynergy && (
            <p className="text-xs text-muted-foreground">
              Vòng này mọi người đã tìm được điểm gặp nhau, hệ thống được cộng thêm.
            </p>
          )}
          {topRolesThisRound.length > 0 && (
            <div className="pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1.5">Bên ghi nhiều Điểm vai nhất vòng này:</div>
              <div className="flex flex-wrap gap-2">
                {topRolesThisRound.map((role) =>
                  role ? (
                    <span
                      key={role.id}
                      className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border", role.bgClass, role.textClass, role.borderClass)}
                    >
                      {role.icon} {role.label}
                    </span>
                  ) : null
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{topRolesExplanation}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Mỗi vai đã chốt gì
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {ROLES.map((role) => {
              const choiceId = history.roleChoices[role.id as RoleId];
              const option = choiceId
                ? round.roles[role.id as RoleId].options.find((item) => item.id === choiceId)
                : null;
              const roleScore = finalEffect.rolePoints[role.id as RoleId] ?? 0;

              const roleWhy =
                roleScore > 0
                  ? hasConflict
                    ? "Kéo được điểm về phía mình trong bối cảnh căng."
                    : hasSynergy
                      ? "Chạm đúng nhịp phối hợp nên được cộng điểm."
                      : "Lựa chọn tạo khác biệt theo hướng thuận lợi."
                  : roleScore < 0
                    ? hasConflict
                      ? "Kéo lệch nhịp khi bàn đang căng nên bị thiệt."
                      : hasSynergy
                        ? "Không bắt được nhịp phối hợp nên hụt điểm."
                        : "Lựa chọn tạo bất lợi tương đối so với mặt bằng vòng."
                    : "Điểm vòng này cân bằng, chưa tạo khác biệt rõ.";

              return (
                <div
                  key={role.id}
                  className={cn(
                    "rounded-xl border bg-card p-3",
                    choiceId ? role.borderClass : "border-border opacity-70"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">{role.icon}</span>
                    <div className={cn("text-sm font-bold", role.textClass)}>{role.label}</div>
                  </div>
                  {option ? (
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-7 h-7 shrink-0 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center text-xs font-bold">
                          {option.id}
                        </span>
                        <div className="text-sm font-semibold truncate">{option.label}</div>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 font-mono text-sm font-bold",
                          roleScore > 0 ? "text-primary" : roleScore < 0 ? "text-destructive" : "text-muted-foreground"
                        )}
                      >
                        {roleScore > 0 ? "+" : ""}{roleScore}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-muted-foreground">Không có người chơi ở vai này.</div>
                  )}
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    Điểm chỉ tính riêng vòng này. {roleWhy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <p className="text-sm leading-relaxed text-foreground italic">&ldquo;{round.message}&rdquo;</p>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Trạng thái chỉ số sau vòng này
          </h3>
          <IndicatorBar indicators={state.indicators} showLabels />
          <div className="mt-3 p-3 rounded-xl bg-secondary/50 border border-border">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Vì sao tăng/giảm
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{indicatorDeltaText}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{indicatorWhyText}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Điểm win cuối game = tổng `rolePoints` + Utility theo trạng thái hệ thống cuối game (và trừ phạt cực đoan). 
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          {isHost ? (
            <Button className="w-full h-12 text-base font-semibold" onClick={nextRound}>
              {isLastRound ? "Xem kết quả cuối game" : `Tiếp theo: Vòng ${state.currentRound + 1}`}
            </Button>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-3">
              Chờ host chuyển sang vòng tiếp theo...
            </div>
          )}
          {!isHost && state.players.length === 1 && (
            <Button className="w-full h-12 text-base font-semibold mt-2" onClick={nextRound}>
              {isLastRound ? "Xem kết quả cuối game" : `Tiếp theo: Vòng ${state.currentRound + 1}`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
