"use client";

import { useGame, ROUND_DURATION_SECONDS } from "@/lib/game-context";
import { GAME_ROUNDS, ROLES, RoleId, type RoleChoiceOption, resolveConditionalQuestion } from "@/lib/game-data";
import { IndicatorBar } from "./indicator-bar";
import { RoleBadge } from "./role-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ROLE_IDS: RoleId[] = ["state", "business", "worker", "citizen"];
const MACRO_LABELS = {
  growth: "Tăng trưởng",
  equity: "Công bằng",
  stability: "Ổn định",
} as const;

function formatSigned(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function getTopMacroEffects(option: RoleChoiceOption) {
  return (Object.entries(option.macro) as Array<[keyof typeof MACRO_LABELS, number | undefined]>)
    .filter(([, value]) => typeof value === "number" && value !== 0)
    .sort((a, b) => Math.abs((b[1] ?? 0)) - Math.abs((a[1] ?? 0)))
    .slice(0, 2)
    .map(([key, value]) => `${MACRO_LABELS[key]} ${formatSigned(value ?? 0)}`);
}

function OptionTradeoffPreview({ option, roleId }: { option: RoleChoiceOption; roleId: RoleId }) {
  const roleDelta = option.rolePoints[roleId] ?? 0;
  const topMacroEffects = getTopMacroEffects(option);
  const conflictDelta = option.system.conflict ?? 0;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex flex-wrap gap-1.5">
        <span
          className={cn(
            "text-[11px] px-2 py-0.5 rounded-full border font-semibold",
            roleDelta > 0
              ? "border-primary/30 bg-primary/10 text-primary"
              : roleDelta < 0
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-border bg-background/70 text-muted-foreground"
          )}
        >
          Điểm vai: {formatSigned(roleDelta)}
        </span>
        {conflictDelta !== 0 && (
          <span
            className={cn(
              "text-[11px] px-2 py-0.5 rounded-full border",
              conflictDelta > 0
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-primary/30 bg-primary/10 text-primary"
            )}
          >
            Xung đột: {formatSigned(conflictDelta)}
          </span>
        )}
      </div>
      {topMacroEffects.length > 0 && (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Giá hệ thống: {topMacroEffects.join(", ")}.
        </p>
      )}
    </div>
  );
}

function HostRoundDashboard() {
  const { state, endRoundNow, dbReady } = useGame();
  const round = GAME_ROUNDS[state.currentRound - 1];
  const activeRole = round?.turnOrder?.[state.turnIndex] ?? null;
  const votedCount = Object.keys(state.votes).length;
  const totalCount = state.players.length;
  const pctCountdown = (state.countdown / ROUND_DURATION_SECONDS) * 100;
  const isUrgent = state.countdown <= 10;

  if (!round) return null;

  const roleTallies = ROLE_IDS.reduce((acc, roleId) => {
    acc[roleId] = {};
    round.roles[roleId].options.forEach((option) => {
      acc[roleId][option.id] = { count: 0, voters: [] as string[] };
    });
    return acc;
  }, {} as Record<RoleId, Record<string, { count: number; voters: string[] }>>);

  state.players.forEach((player) => {
    if (!player.role) return;
    const voteIndex = state.votes[player.id];
    if (voteIndex === undefined) return;
    const option = round.roles[player.role].options[Number(voteIndex)];
    if (!option) return;
    roleTallies[player.role][option.id].count += 1;
    roleTallies[player.role][option.id].voters.push(player.name);
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-4 py-3 border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/30">
                Vòng {state.currentRound} / {GAME_ROUNDS.length}
              </span>
              <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full border border-border font-medium">
                HOST — Quan sát theo vai
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center gap-1.5 font-mono font-bold text-lg",
                  isUrgent ? "text-destructive" : "text-foreground"
                )}
              >
                {isUrgent && <span className="w-2 h-2 rounded-full bg-destructive animate-ping" />}
                {state.countdown}s
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={endRoundNow}
                disabled={state.phase !== "round" || !dbReady}
              >
                Kết thúc vòng
              </Button>
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

      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-5xl mx-auto w-full space-y-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-extrabold text-xl text-balance mb-2 leading-tight">{round.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{round.context}</p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Nhìn xem mỗi vai đang nghiêng về option nào. Đây là một bàn đàm phán lợi ích, không phải bài trắc nghiệm tìm đáp án đẹp nhất.
              </p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Mỗi đáp án tạo điểm cộng hoặc trừ cho vai của bạn. Sau 5 vòng, bàn tính điểm cuối = `rolePoints` + Utility theo trạng thái hệ thống - Phạt cực đoan. Vai có điểm cuối cao nhất thắng.
              </p>
            </div>
            <div className="shrink-0 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-mono text-muted-foreground">
              {votedCount}/{totalCount} đã vote
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {ROLE_IDS.map((roleId) => {
            const roleInfo = ROLES.find((role) => role.id === roleId);
            const playersInRole = state.players.filter((player) => player.role === roleId);
            const options = round.roles[roleId].options;
            const maxVotes = Math.max(...options.map((option) => roleTallies[roleId][option.id].count), 1);

            return (
              <div
                key={roleId}
                className={cn(
                  "rounded-2xl border bg-card p-4 space-y-4",
                  activeRole && roleId !== activeRole ? "opacity-70" : ""
                )}
                style={{ borderColor: `${roleInfo?.color}40` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg" aria-hidden="true">{roleInfo?.icon}</span>
                      <div className={cn("text-sm font-bold", roleInfo?.textClass)}>{roleInfo?.label}</div>
                    </div>
                    {activeRole && roleId !== activeRole && (
                      <p className="mt-2 text-[11px] text-muted-foreground">Chờ lượt của {ROLES.find((r) => r.id === activeRole)?.label ?? activeRole}</p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {round.roles[roleId].question}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    {playersInRole.length ? `${playersInRole.length} người chơi` : "Chưa có người chơi"}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {options.map((option) => {
                    const tally = roleTallies[roleId][option.id];
                    const pct = playersInRole.length > 0 ? (tally.count / playersInRole.length) * 100 : 0;
                    const isLeading = tally.count === maxVotes && tally.count > 0;

                    return (
                      <div
                        key={`${roleId}-${option.id}`}
                        className={cn(
                          "rounded-xl border p-3",
                          isLeading ? "border-primary/40 bg-primary/5" : "border-border"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border",
                              isLeading
                                ? "bg-primary border-primary text-primary-foreground"
                                : "bg-secondary border-border text-muted-foreground"
                            )}
                          >
                            {option.id}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{option.label}</div>
                            <div className="text-xs text-muted-foreground leading-relaxed mt-1">
                              {option.text}
                            </div>
                            <OptionTradeoffPreview option={option} roleId={roleId} />
                          </div>
                          <div className="text-xs font-mono text-muted-foreground shrink-0">
                            {tally.count} phiếu
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden mt-3">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isLeading ? "bg-primary" : "bg-muted-foreground/35"
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {tally.voters.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {tally.voters.map((name) => (
                              <span
                                key={`${roleId}-${option.id}-${name}`}
                                className="text-[11px] px-2 py-0.5 rounded-full border bg-background/70 border-border text-muted-foreground"
                              >
                                {name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GuestRoundScreen() {
  const { state, currentPlayerDbId, currentPlayerId, submitVote } = useGame();
  const round = GAME_ROUNDS[state.currentRound - 1];
  const myId = currentPlayerDbId || currentPlayerId;
  const currentPlayer = state.players.find((p) => p.id === myId);
  const myVote = myId ? state.votes[myId] : null;
  const votedCount = Object.keys(state.votes).length;
  const totalCount = state.players.length;
  const pctCountdown = (state.countdown / ROUND_DURATION_SECONDS) * 100;
  const isUrgent = state.countdown <= 10;

  if (!round) return null;

  const roleId = currentPlayer?.role ?? null;
  const roleInfo = roleId ? ROLES.find((role) => role.id === roleId) : null;
  const roleRound = roleId ? round.roles[roleId] : null;
  const activeRole = round.turnOrder[state.turnIndex] ?? null;
  const isMyTurn = roleId !== null && activeRole !== null && roleId === activeRole;

  const computeRoleChoices = (): Record<RoleId, string | null> => {
    const selections: Record<RoleId, string | null> = { state: null, business: null, worker: null, citizen: null };
    const counts: Record<RoleId, Record<string, number>> = { state: {}, business: {}, worker: {}, citizen: {} };

    (Object.keys(counts) as RoleId[]).forEach((rid) => {
      round.roles[rid].options.forEach((o) => {
        counts[rid][o.id] = 0;
      });
    });

    state.players.forEach((p) => {
      if (!p.role) return;
      const voteIndex = state.votes[p.id];
      if (voteIndex === undefined) return;
      const opt = round.roles[p.role].options[Number(voteIndex)];
      if (!opt) return;
      counts[p.role][opt.id] = (counts[p.role][opt.id] ?? 0) + 1;
    });

    (Object.keys(counts) as RoleId[]).forEach((rid) => {
      let bestChoice: string | null = null;
      let bestCount = -1;
      Object.entries(counts[rid]).forEach(([oid, c]) => {
        if (c > bestCount) {
          bestChoice = oid;
          bestCount = c;
        }
      });
      selections[rid] = bestCount > 0 ? bestChoice : null;
    });

    return selections;
  };

  const selections = isMyTurn ? computeRoleChoices() : null;
  const conditionalQuestion =
    isMyTurn && activeRole ? resolveConditionalQuestion(round.roles[activeRole], selections as any) : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-4 py-3 border-b border-border bg-card/50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/30">
                Vòng {state.currentRound} / {GAME_ROUNDS.length}
              </span>
              {roleId && <RoleBadge roleId={roleId} size="sm" />}
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

      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-2xl mx-auto w-full space-y-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-extrabold text-xl text-balance mb-3 leading-tight">{round.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{round.context}</p>
        </div>

        {roleInfo && roleRound ? (
          <>
            <div
              className="rounded-2xl p-4 border-2"
              style={{
                borderColor: `${roleInfo.color}55`,
                background: `${roleInfo.color}10`,
                opacity: isMyTurn ? 1 : 0.6,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base" aria-hidden="true">{roleInfo.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: roleInfo.color }}>
                  Góc nhìn của bạn — {roleInfo.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{roleInfo.goal}</p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Ưu tiên đúng lợi ích của vai bạn trước. Bạn không ở đây để làm giám khảo công tâm tuyệt đối, mà để xem lựa chọn của mình kéo hệ thống đi đâu.
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Nếu phương án đó có lợi cho bạn nhưng làm bên khác khó chịu, đó chính là điều game muốn cả bàn nhìn thấy.
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Chọn đáp án sẽ tạo điểm cộng hoặc trừ cho vai của bạn. Sau 5 vòng, bàn tính điểm cuối = `rolePoints` + Utility theo trạng thái hệ thống - Phạt cực đoan. Vai có điểm cuối cao nhất thắng.
              </p>
              {!isMyTurn && activeRole && (
                <p className="text-xs text-muted-foreground mt-3">
                  Chờ lượt của{" "}
                  <span className="font-semibold text-foreground">
                    {ROLES.find((r) => r.id === activeRole)?.label ?? activeRole}
                  </span>
                  ...
                </p>
              )}
            </div>

            <div>
              <h3 className="font-bold text-base mb-3">{conditionalQuestion ?? roleRound.question}</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Hãy vote như {roleInfo.label.toLowerCase()}, không vote như người đứng ngoài muốn tất cả cùng đẹp.
              </p>
              <div className="space-y-3">
                {roleRound.options.map((option, index) => {
                  const isMyVote = myVote === String(index);
                  return (
                    <button
                      key={`${roleId}-${option.id}`}
                      onClick={() => isMyTurn && !myVote && submitVote(index)}
                      disabled={!isMyTurn || !!myVote}
                      className={cn(
                        "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200",
                        "flex items-start gap-3",
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
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-foreground">{option.label}</div>
                        <div className="text-sm leading-relaxed text-muted-foreground mt-1">
                          {option.text}
                        </div>
                        <OptionTradeoffPreview option={option} roleId={roleId as RoleId} />
                      </div>
                      {isMyVote && (
                        <span className="ml-auto text-primary text-lg shrink-0" aria-hidden="true">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            Chờ gán vai để hiện câu hỏi của bạn...
          </div>
        )}
      </div>

      <div className="border-t border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
          <div className="text-muted-foreground">{votedCount}/{totalCount} đã vote</div>
          {myVote ? (
            <div className="text-indicator-equity font-medium">
              Đã chốt phương án {roleRound?.options[Number(myVote)]?.id ?? "?"} — chờ xem các vai khác kéo bàn chơi đi đâu...
            </div>
          ) : (
            <div className="text-muted-foreground animate-pulse">Đang chờ bạn chốt lợi ích của vai mình...</div>
          )}
        </div>
        <div className="max-w-2xl mx-auto flex gap-1.5 mt-2">
          {state.players.map((player) => {
            const hasVoted = !!state.votes[player.id];
            const playerRole = player.role ? ROLES.find((role) => role.id === player.role) : null;
            return (
              <div
                key={player.id}
                title={`${player.name}${hasVoted ? " (đã vote)" : ""}`}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-all duration-300",
                  hasVoted ? (playerRole ? playerRole.bgClass : "bg-primary") : "bg-secondary"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function RoundScreen() {
  const { isHost } = useGame();
  return isHost ? <HostRoundDashboard /> : <GuestRoundScreen />;
}
