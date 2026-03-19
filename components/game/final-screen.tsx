"use client";

import { useGame } from "@/lib/game-context";
import {
  GAME_ROUNDS,
  ROLES,
  GLOBAL_ENDINGS,
  determineGlobalEnding,
  determineRoleEnding,
  computeRoleScores,
  computeSystemScores,
  getHistoryEffect,
  type Indicators,
  type SystemScores,
  type RoleId,
} from "@/lib/game-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INDICATOR_CONFIG = [
  { key: "growth" as const, label: "Tăng trưởng kinh tế", colorClass: "bg-indicator-growth", textClass: "text-indicator-growth" },
  { key: "equity" as const, label: "Công bằng xã hội", colorClass: "bg-indicator-equity", textClass: "text-indicator-equity" },
  { key: "stability" as const, label: "Ổn định thị trường", colorClass: "bg-indicator-stability", textClass: "text-indicator-stability" },
];

const MEDAL = ["#FFD700", "#C0C0C0", "#CD7F32", "#888"];
const SCORE_EPS = 1e-9;

function formatFinalScore(value: number) {
  const rounded = Math.round(value * 10) / 10; // 1 chữ số thập phân
  return rounded > 0 ? `+${rounded}` : `${rounded}`;
}

function calcStateUtility(ind: Indicators, sys: SystemScores) {
  return 2.2 * ind.stability + 1.8 * sys.socialTrust + 1.2 * ind.growth + 0.8 * ind.equity + 0.8 * sys.marketHealth - 2.0 * sys.conflict - 1.2 * sys.rigidity;
}

function calcBusinessUtility(ind: Indicators, sys: SystemScores) {
  return 2.3 * ind.growth + 2.0 * sys.marketHealth + 1.0 * ind.stability + 0.4 * sys.socialTrust + 0.3 * ind.equity - 1.6 * sys.rigidity - 1.4 * sys.conflict;
}

function calcWorkerUtility(ind: Indicators, sys: SystemScores) {
  return 2.3 * ind.equity + 2.0 * ind.stability + 1.3 * sys.socialTrust + 0.8 * ind.growth + 0.4 * sys.marketHealth - 1.5 * sys.conflict - 0.8 * sys.rigidity;
}

function calcCitizenUtility(ind: Indicators, sys: SystemScores) {
  return 2.0 * ind.equity + 2.1 * sys.socialTrust + 1.5 * ind.stability + 0.7 * sys.marketHealth + 0.5 * ind.growth - 1.9 * sys.conflict - 0.9 * sys.rigidity;
}

function calcStatePenalty(ind: Indicators, sys: SystemScores) {
  let p = 0;
  if (ind.growth >= 8 && ind.equity <= 2) p += 3;
  if (ind.stability >= 8 && sys.rigidity >= 7) p += 4;
  if (sys.socialTrust <= 1 && sys.conflict >= 6) p += 5;
  if (ind.growth <= 1 && ind.stability <= 2) p += 3;
  return p;
}

function calcBusinessPenalty(ind: Indicators, sys: SystemScores) {
  let p = 0;
  if (ind.equity >= 8 && sys.marketHealth <= 2) p += 3;
  if (sys.rigidity >= 7) p += 4;
  if (sys.marketHealth <= 2 && sys.socialTrust <= 2) p += 4;
  if (ind.growth <= 1) p += 3;
  return p;
}

function calcWorkerPenalty(ind: Indicators, sys: SystemScores) {
  let p = 0;
  if (ind.growth >= 8 && ind.equity <= 2) p += 5;
  if (sys.socialTrust <= 1 && sys.conflict >= 6) p += 4;
  if (ind.equity <= 2) p += 4;
  if (ind.stability <= 2) p += 3;
  return p;
}

function calcCitizenPenalty(ind: Indicators, sys: SystemScores) {
  let p = 0;
  if (sys.socialTrust <= 1 && sys.conflict >= 6) p += 5;
  if (ind.growth >= 8 && ind.equity <= 2) p += 4;
  if (sys.marketHealth <= 2 && sys.socialTrust <= 2) p += 4;
  if (ind.stability <= 2) p += 3;
  return p;
}

function calcFinalRoleScore(roleId: RoleId, choicePoints: number, ind: Indicators, sys: SystemScores) {
  let utility = 0;
  let penalty = 0;
  switch (roleId) {
    case "state":
      utility = calcStateUtility(ind, sys);
      penalty = calcStatePenalty(ind, sys);
      break;
    case "business":
      utility = calcBusinessUtility(ind, sys);
      penalty = calcBusinessPenalty(ind, sys);
      break;
    case "worker":
      utility = calcWorkerUtility(ind, sys);
      penalty = calcWorkerPenalty(ind, sys);
      break;
    case "citizen":
      utility = calcCitizenUtility(ind, sys);
      penalty = calcCitizenPenalty(ind, sys);
      break;
  }
  return choicePoints + utility - penalty;
}

export function FinalScreen() {
  const { state, restartGame } = useGame();
  const roleScores = computeRoleScores(state.roundHistory);
  const systemScores = computeSystemScores(state.roundHistory);
  const ending = determineGlobalEnding({
    indicators: state.indicators,
    roleScores,
    system: systemScores,
  });
  const totalScore = state.indicators.growth + state.indicators.equity + state.indicators.stability;

  // Điểm cuối để xếp hạng thắng thua
  const leaderboard = ROLES.map((role) => {
    const roleId = role.id as RoleId;
    const choiceScore = roleScores[roleId] ?? 0;
    const finalScore = calcFinalRoleScore(roleId, choiceScore, state.indicators, systemScores);
    const players = state.players.filter((p) => p.role === role.id);
    return {
      role,
      choiceScore,
      score: finalScore,
      players,
    };
  }).sort((a, b) => b.score - a.score);

  const topScore = leaderboard[0].score;
  const winners = leaderboard.filter((r) => Math.abs(r.score - topScore) <= SCORE_EPS);
  const isTie = winners.length > 1;

  // Ending riêng cho từng vai vẫn dựa trên tổng `rolePoints` của vai đó
  const roleEndingCards = ROLES.map((role) => {
    const roleId = role.id as RoleId;
    const choiceScore = roleScores[roleId] ?? 0;
    const roleEnding = determineRoleEnding(roleId, {
      roleScore: choiceScore,
      indicators: state.indicators,
      system: systemScores,
    });
    return { role, score: choiceScore, roleEnding };
  });

  const minFinalScore = Math.min(...leaderboard.map((l) => l.score));
  const maxFinalScore = Math.max(...leaderboard.map((l) => l.score));
  const deviationSummary = ROLES.map((role) => {
    const roleId = role.id as RoleId;
    const used = state.roleDeviationUsed[roleId] ?? 0;
    const overBudgetCount = state.roleDeviationPenaltyCount[roleId] ?? 0;
    const totalPenalty = state.roundHistory.reduce(
      (acc, hist) => acc + (hist.deviationPenaltyApplied?.[roleId] ?? 0),
      0
    );
    return { role, used, overBudgetCount, totalPenalty };
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Ending hero */}
      <div
        className="px-6 py-10 text-center"
        style={{ background: `${ending.color}18`, borderBottom: `1px solid ${ending.color}40` }}
      >
        <div className="text-5xl mb-4" aria-hidden="true">
          {ending.icon}
        </div>
        <div
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: ending.color }}
        >
          Màn chốt đơn cuối game
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-balance mb-2 leading-tight">
          {ending.title}
        </h1>
        <p className="text-muted-foreground text-sm text-pretty max-w-sm mx-auto">
          {ending.description}
        </p>
        <p className="text-xs text-muted-foreground max-w-md mx-auto mt-3 leading-relaxed">
          Đây không phải màn chấm đúng sai. Đây là ảnh chụp cuối cùng của cả bàn sau khi 4 vai kéo hệ thống về những hướng rất khác nhau.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-2xl mx-auto w-full space-y-6">

        {/* Winner announcement */}
        <div className="p-5 rounded-2xl border-2 text-center"
          style={{ borderColor: MEDAL[0], background: `${MEDAL[0]}12` }}>
          <div className="text-3xl mb-2" aria-hidden="true">
            {isTie ? "🤝" : "🏆"}
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            {isTie ? "Đồng lên top" : "Vai hưởng lợi nhất"}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {winners.map(({ role }) => (
              <span
                key={role.id}
                className={cn("px-3 py-1 rounded-full text-sm font-bold border", role.bgClass, role.textClass, role.borderClass)}
              >
                {role.label}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            {isTie
              ? "Các vai đã cùng nhau lên đỉnh điểm số — bàn chơi khá cân bằng, không ai bị bỏ lại quá xa."
              : `Vai ${winners[0].role.label} là bên \"win\" nhiều nhất qua chuỗi quyết định của nhóm. Nhưng win cho một vai chưa chắc đồng nghĩa hệ thống cũng đang ổn.`}
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Vai thắng = điểm cuối cao nhất qua tất cả các vòng: `rolePoints` + Utility (theo trạng thái hệ thống) - Phạt cực đoan.
          </p>
        </div>

        {/* Role leaderboard */}
        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Bảng xếp hạng lợi ích
          </h2>
          <div className="space-y-2">
            {leaderboard.map(({ role, score, players }, idx) => {
              const pct =
                maxFinalScore === minFinalScore ? 100 : ((score - minFinalScore) / (maxFinalScore - minFinalScore)) * 100;
              const isWinner = Math.abs(score - topScore) <= SCORE_EPS;
              return (
                <div
                  key={role.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all",
                    isWinner ? "border-current" : "border-border bg-card"
                  )}
                  style={isWinner ? { borderColor: role.color, background: `${role.color}12` } : {}}
                >
                  {/* Rank */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0"
                    style={{ background: MEDAL[idx] + "33", color: MEDAL[idx] }}
                  >
                    {idx + 1}
                  </div>

                  {/* Role info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn("text-sm font-bold", role.textClass)}>{role.label}</span>
                      {isWinner && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                          style={{ background: role.color + "22", color: role.color }}>
                          {isTie ? "Đồng" : "Thắng"}
                        </span>
                      )}
                    </div>
                    {players.length > 0 && (
                      <div className="text-xs text-muted-foreground truncate">
                        {players.map((p) => p.name).join(", ")}
                      </div>
                    )}
                    {/* Score bar */}
                    <div className="mt-1.5 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: role.color }}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right shrink-0">
                    <div
                      className="text-lg font-extrabold font-mono"
                      style={{ color: role.color }}
                    >
                      {formatFinalScore(score)}
                    </div>
                    <div className="text-xs text-muted-foreground">điểm cuối</div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Điểm cuối = Điểm vai (tổng `rolePoints`) + Utility theo trạng thái hệ thống cuối game - Phạt cực đoan.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Kỷ luật vai và chi phí lệch vai
          </h2>
          <div className="space-y-2">
            {deviationSummary.map(({ role, used, overBudgetCount, totalPenalty }) => (
              <div key={`deviation-final-${role.id}`} className="p-3 rounded-xl border bg-card border-border">
                <div className="flex items-center justify-between gap-3">
                  <div className={cn("text-sm font-bold", role.textClass)}>
                    {role.icon} {role.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Lệch vai: <span className="font-semibold text-foreground">{used}</span> lần
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">
                  Vượt budget: <span className="font-semibold text-foreground">{overBudgetCount}</span> lần
                  {totalPenalty > 0 ? (
                    <span className="ml-2 text-destructive font-semibold">(-{totalPenalty} điểm vai)</span>
                  ) : (
                    <span className="ml-2">không bị phạt vượt budget</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final indicators */}
        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Chỉ số nền kinh tế cuối game
          </h2>
          <div className="p-4 rounded-2xl bg-card border border-border space-y-4">
            {INDICATOR_CONFIG.map((ind) => {
              const value = state.indicators[ind.key];
              const pct = ((value + 5) / 15) * 100; // base 5, range 0-10 delta
              return (
                <div key={ind.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className={cn("font-medium", ind.textClass)}>{ind.label}</span>
                    <span className="font-mono font-bold">{value > 5 ? "+" : ""}{value - 5} ({value}/10)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000", ind.colorClass)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-between pt-1 border-t border-border">
              <span className="text-sm font-medium">Tổng điểm nền kinh tế</span>
              <span className="font-mono font-extrabold text-xl text-primary">
                {totalScore} / 30
              </span>
            </div>
          </div>
        </div>

        {/* Round recap */}
        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Timeline quyết định của bàn chơi
          </h2>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Nhìn lại từng vòng để thấy rõ: có lúc bàn chơi phối hợp được, có lúc mỗi bên kéo một hướng và hệ thống phải trả giá.
          </p>
          <div className="space-y-2">
            {state.roundHistory.map((hist) => {
              const round = GAME_ROUNDS.find((r) => r.id === hist.roundId);
              if (!round) return null;
              const finalEffect = getHistoryEffect(hist);
              const rp = finalEffect.rolePoints;
              return (
                <div key={hist.roundId} className="p-3 rounded-xl bg-card border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                      {hist.roundId}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{round.title}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ROLES.map((role) => {
                          const choiceId = hist.roleChoices[role.id as RoleId];
                          if (!choiceId) return null;
                          const option = round.roles[role.id as RoleId].options.find((item) => item.id === choiceId);
                          if (!option) return null;
                          return (
                            <span
                              key={`${hist.roundId}-${role.id}`}
                              className="text-[11px] px-1.5 py-0.5 rounded-md border border-border text-muted-foreground bg-background/50"
                            >
                              {role.label}: <span className="font-semibold text-foreground">{option.id}</span>
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ROLES.map((role) => {
                          const pts = rp?.[role.id as RoleId] ?? 0;
                          if (pts === 0) return null;
                          return (
                            <span
                              key={role.id}
                              className="text-xs px-1.5 py-0.5 rounded-md font-semibold"
                              style={{
                                background: pts > 0 ? `${role.color}22` : "#e0624a22",
                                color: pts > 0 ? role.color : "#e0624a",
                              }}
                            >
                              {role.label} {pts > 0 ? "+" : ""}{pts}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(hist.synergyApplied ?? []).map((rule) => (
                          <span
                            key={`${hist.roundId}-${rule.id}`}
                            className="text-[11px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                          >
                            + {rule.label}
                          </span>
                        ))}
                        {(hist.conflictApplied ?? []).map((rule) => (
                          <span
                            key={`${hist.roundId}-${rule.id}`}
                            className="text-[11px] px-1.5 py-0.5 rounded-md bg-destructive/10 text-destructive border border-destructive/20"
                          >
                            - {rule.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role personal endings */}
        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Kết riêng cho từng vai
          </h2>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Mỗi vai đều có ending riêng vì mỗi vai bước ra khỏi bàn chơi với một mức được lợi, bị ép hay thỏa hiệp rất khác nhau.
          </p>
          <div className="space-y-2">
            {roleEndingCards.map(({ role, roleEnding, score }) => (
              <div key={role.id} className="p-3 rounded-xl border bg-card" style={{ borderColor: `${role.color}50` }}>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-bold" style={{ color: role.color }}>
                    {role.icon} {role.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">Điểm vai: {formatFinalScore(score)}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{roleEnding.academicName}</div>
                <div className="text-sm font-semibold mt-1">{roleEnding.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{roleEnding.description}</div>
                <div className="text-xs mt-2">
                  <span className="font-semibold">Điểm mạnh:</span> {roleEnding.strengths}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  <span className="font-semibold text-foreground">Rủi ro:</span> {roleEnding.risks}
                </div>
                <div className="text-xs italic mt-1.5">"{roleEnding.quote}"</div>
                <div className="text-[11px] text-muted-foreground mt-1">{roleEnding.vibe}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System dimensions */}
        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Chỉ Số Hệ Thống
          </h2>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Đây là phần cho thấy cái giá hoặc phần thưởng mà cả xã hội phải nhận sau khi các vai giằng co lợi ích với nhau.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Độ cứng quản trị", value: systemScores.rigidity },
              { label: "Niềm tin xã hội", value: systemScores.socialTrust },
              { label: "Sức khỏe thị trường", value: systemScores.marketHealth },
              { label: "Xung đột lợi ích", value: systemScores.conflict },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl border bg-card border-border">
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div
                  className={cn(
                    "text-lg font-mono font-bold mt-1",
                    item.value >= 0 ? "text-foreground" : "text-destructive"
                  )}
                >
                  {item.value > 0 ? "+" : ""}{item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All possible endings */}
        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            8 Kết Thúc Chung
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {GLOBAL_ENDINGS.map((e) => (
              <div
                key={e.id}
                className={cn(
                  "p-3 rounded-xl border transition-all",
                  e.id === ending.id ? "scale-[1.02]" : "border-border opacity-50"
                )}
                style={e.id === ending.id ? { borderColor: e.color, background: `${e.color}15` } : {}}
              >
                <div className="text-xl mb-1" aria-hidden="true">{e.icon}</div>
                <div className="text-xs font-bold leading-snug">{e.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{e.description}</div>
                {e.id === ending.id && (
                  <div className="mt-1.5 text-xs font-bold" style={{ color: e.color }}>
                    Kết thúc của nhóm bạn
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning note */}
        <div className="p-4 rounded-2xl border border-dashed border-border">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Bài học sau khi \"chốt kèo\"
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Sau vài vòng tranh luận, dễ thấy{" "}
            <strong className="text-foreground">mỗi vai đều có lý riêng</strong> và không có phương án nào làm
            tất cả cùng vui 100%. Điểm số từng vai cho thấy bên nào được lợi nhiều hơn, còn ba chỉ số chung cho thấy{" "}
            <strong className="text-foreground">hệ thống đang cân bằng hay bắt đầu lệch pha</strong>.{" "}
            Nếu chỉ chăm chăm win cho vai mình, bàn chơi rất dễ rơi vào các ending căng thẳng;{" "}
            còn khi chịu khó nhường nhau một chút, bạn sẽ thấy{" "}
            <strong className="text-foreground">cân bằng chung mới là \"trận thắng\" đáng giá nhất</strong>.
          </p>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            Nói cách khác: cùng một vấn đề, Nhà nước, Doanh nghiệp, Người lao động và Người dân không bao giờ nhìn giống hệt nhau. Chính vì vậy, xã hội bền không nhờ một bên luôn thắng, mà nhờ các bên tìm được mức phối hợp đủ chấp nhận để cùng đi tiếp.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <Button className="w-full h-12 text-base font-semibold" onClick={restartGame}>
            Chơi lại từ đầu
          </Button>
        </div>
      </div>
    </div>
  );
}
