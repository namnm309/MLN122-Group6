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

  // Build leaderboard — roles that have players get ranked, show all 4 roles
  const leaderboard = ROLES.map((role) => {
    const players = state.players.filter((p) => p.role === role.id);
    return {
      role,
      score: roleScores[role.id as RoleId] ?? 0,
      players,
    };
  }).sort((a, b) => b.score - a.score);

  const topScore = leaderboard[0].score;
  const winners = leaderboard.filter((r) => r.score === topScore);
  const isTie = winners.length > 1;

  const roleEndingCards = leaderboard.map(({ role, score }) => {
    const roleEnding = determineRoleEnding(role.id as RoleId, {
      roleScore: score,
      indicators: state.indicators,
      system: systemScores,
    });
    return { role, score, roleEnding };
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
          Kết thúc game
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-balance mb-2 leading-tight">
          {ending.title}
        </h1>
        <p className="text-muted-foreground text-sm text-pretty max-w-sm mx-auto">
          {ending.subtitle}
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
            {isTie ? "Đồng chiến thắng" : "Vai chiến thắng"}
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
              ? "Các vai đã cùng nhau đạt điểm cao nhất — thể hiện sự cân bằng lợi ích lý tưởng!"
              : `Vai ${winners[0].role.label} đã thu được nhiều lợi ích nhất qua các quyết định của nhóm.`}
          </p>
        </div>

        {/* Role leaderboard */}
        <div>
          <h2 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
            Bảng xếp hạng lợi ích
          </h2>
          <div className="space-y-2">
            {leaderboard.map(({ role, score, players }, idx) => {
              const maxPossible = GAME_ROUNDS.length * 2; // max 2pts per round
              const pct = Math.max(0, ((score + maxPossible) / (maxPossible * 2)) * 100);
              const isWinner = score === topScore;
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
                      {score > 0 ? "+" : ""}{score}
                    </div>
                    <div className="text-xs text-muted-foreground">điểm</div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Điểm = tổng lợi ích của vai đó qua {GAME_ROUNDS.length} vòng quyết định
          </p>
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
            Lịch sử quyết định
          </h2>
          <div className="space-y-2">
            {state.roundHistory.map((hist) => {
              const round = GAME_ROUNDS.find((r) => r.id === hist.roundId);
              const winOpt = round?.options[hist.winOption];
              if (!round || !winOpt) return null;
              const ef = hist.effect;
              const rp = ef.rolePoints;
              return (
                <div key={hist.roundId} className="p-3 rounded-xl bg-card border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                      {hist.roundId}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{round.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Phương án <span className="font-mono font-bold text-foreground">{String.fromCharCode(65 + hist.winOption)}</span>
                        {" — "}{winOpt.text}
                      </div>
                      {/* Role impact row */}
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
            Kết Riêng Theo Vai
          </h2>
          <div className="space-y-2">
            {roleEndingCards.map(({ role, roleEnding, score }) => (
              <div key={role.id} className="p-3 rounded-xl border bg-card" style={{ borderColor: `${role.color}50` }}>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-bold" style={{ color: role.color }}>
                    {role.icon} {role.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">Điểm vai: {score > 0 ? "+" : ""}{score}</div>
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
            Bài học rút ra
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Trong nền kinh tế thị trường định hướng xã hội chủ nghĩa, cần phải{" "}
            <strong className="text-foreground">cân bằng lợi ích</strong> giữa Nhà nước, doanh nghiệp,
            người lao động và người dân. Điểm số từng vai phản ánh mức độ lợi ích được bảo vệ qua
            từng quyết định — không ai thắng một mình, chỉ có{" "}
            <strong className="text-foreground">cân bằng chung mới là chiến thắng thực sự</strong>.
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
