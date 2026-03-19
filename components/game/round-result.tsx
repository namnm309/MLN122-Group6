"use client";

import { useGame } from "@/lib/game-context";
import { GAME_ROUNDS, ROLES, computeRoleScores, getHistoryEffect, type RoundEffect, type RoleId } from "@/lib/game-data";
import { IndicatorBar, IndicatorDelta } from "./indicator-bar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function EffectSummary({ title, effect }: { title: string; effect: RoundEffect }) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </div>
      <IndicatorDelta effect={effect} />
      <div className="grid grid-cols-2 gap-2 mt-3">
        {ROLES.map((role) => {
          const pts = effect.rolePoints[role.id as RoleId] ?? 0;
          return (
            <div key={role.id} className="rounded-xl border border-border bg-background/40 px-3 py-2 text-xs">
              <span className={cn("font-semibold", role.textClass)}>{role.label}</span>
              <span className="ml-2 font-mono">{pts > 0 ? "+" : ""}{pts}</span>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {[
          ["Độ cứng", effect.system.rigidity],
          ["Niềm tin", effect.system.socialTrust],
          ["Sức khỏe thị trường", effect.system.marketHealth],
          ["Xung đột", effect.system.conflict],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-background/40 px-3 py-2 text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="ml-2 font-mono text-foreground">{Number(value) > 0 ? "+" : ""}{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RoundResult() {
  const { state, isHost, nextRound } = useGame();

  const round = GAME_ROUNDS[state.currentRound - 1];
  const history = state.roundHistory[state.roundHistory.length - 1];

  if (!round || !history) return null;

  const totalVotes = Object.values(history.voteBreakdown).reduce((a, b) => a + b, 0);
  const isLastRound = state.currentRound >= GAME_ROUNDS.length;
  const cumulativeScores = computeRoleScores(state.roundHistory);
  const baseEffect = history.baseEffect ?? getHistoryEffect(history);
  const finalEffect = getHistoryEffect(history);
  const synergyApplied = history.synergyApplied ?? [];
  const conflictApplied = history.conflictApplied ?? [];

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
          <div className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
            Vòng này đã bộc lộ điều gì?
          </div>
          <h2 className="text-xl font-extrabold leading-tight">{round.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">{round.context}</p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-3">
            Cùng một biến cố, mỗi vai kéo theo một hướng khác nhau. Kết quả bên dưới cho thấy ai đang được lợi và hệ thống đang phải trả giá ra sao.
          </p>
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
              const cumulative = cumulativeScores[role.id as RoleId] ?? 0;

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
                    <>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center text-xs font-bold">
                          {option.id}
                        </span>
                        <div className="text-sm font-semibold">{option.label}</div>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{option.text}</p>
                    </>
                  ) : (
                    <div className="mt-3 text-xs text-muted-foreground">Không có người chơi ở vai này.</div>
                  )}
                  <div className="mt-3 text-xs text-muted-foreground">
                    Điểm vòng này: <span className="font-mono text-foreground">{roleScore > 0 ? "+" : ""}{roleScore}</span>
                    {" · "}
                    Tổng: <span className="font-mono font-bold text-foreground">{cumulative > 0 ? "+" : ""}{cumulative}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <EffectSummary title="Hiệu ứng cơ sở từ 4 lựa chọn" effect={baseEffect} />

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Synergy Bonus
            </div>
            {synergyApplied.length ? (
              <div className="space-y-3">
                {synergyApplied.map((rule) => (
                  <div key={rule.id} className="rounded-xl border border-primary/30 bg-primary/5 p-3">
                    <div className="text-sm font-semibold text-primary">{rule.label}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rule.text}</p>
                    <p className="text-[11px] text-primary/90 mt-2 leading-relaxed">
                      Vòng này mọi người đã nhường nhau vừa đủ nên hệ thống ăn được bonus thật, không chỉ đẹp trên lời nói.
                    </p>
                    <div className="mt-2">
                      <IndicatorDelta effect={rule.effect} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Không có combo phối hợp đẹp nào được kích hoạt.</div>
            )}
          </div>

          <div className="rounded-2xl border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Conflict Penalty
            </div>
            {conflictApplied.length ? (
              <div className="space-y-3">
                {conflictApplied.map((rule) => (
                  <div key={rule.id} className="rounded-xl border border-destructive/30 bg-destructive/5 p-3">
                    <div className="text-sm font-semibold text-destructive">{rule.label}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rule.text}</p>
                    <p className="text-[11px] text-destructive/90 mt-2 leading-relaxed">
                      Các vai kéo mạnh về phần mình nên hệ thống dính phạt. Đây là lúc thấy rõ lợi ích riêng không tự động biến thành lợi ích chung.
                    </p>
                    <div className="mt-2">
                      <IndicatorDelta effect={rule.effect} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Không có tổ hợp xung đột mạnh nào bị phạt thêm.</div>
            )}
          </div>
        </div>

        <EffectSummary title="Tác động cuối cùng của vòng này" effect={finalEffect} />

        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Phân tích
          </div>
          <p className="text-sm leading-relaxed text-foreground italic">"{round.message}"</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{round.lesson}</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Nói ngắn gọn: nếu mỗi bên chỉ ôm phần ngon nhất cho mình, bàn chơi sẽ rất nhanh trượt từ tranh luận sang bất ổn.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Trạng thái chỉ số sau vòng này
          </h3>
          <IndicatorBar indicators={state.indicators} showLabels />
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
