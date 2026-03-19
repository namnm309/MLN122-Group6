"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/lib/game-context";
import { GAME_INTRO, GLOBAL_ENDINGS, ROLES } from "@/lib/game-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type Screen = "home" | "create" | "join" | "howto";

interface RoomListing {
  id: string;
  name: string;
  created_by: string;
  player_count: number;
}

const GUIDE_GIF_URL = "/Tom%20Screaming%20Sticker%20by%20Disney%20Pixar.gif";
const GUIDE_MOBILE_GIF_URL = "/Animation%20Trend%20Sticker.gif";
const HOWTO_FOOTER_GIF_URL = "/Animation%20Trend%20Sticker.gif";

export function HomeScreen() {
  const [screen, setScreen] = useState<Screen>("home");
  const [showTheory, setShowTheory] = useState(false);
  const [showDetailedGuide, setShowDetailedGuide] = useState(false);
  const { createRoom, joinRoom, dbReady } = useGame();

  // Admin reset DB
  const [showResetPanel, setShowResetPanel] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [resetConfirmText, setResetConfirmText] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetMessageType, setResetMessageType] = useState<"success" | "error" | "">("");

  // Create form
  const [hostName, setHostName] = useState("");
  const [roomName, setRoomName] = useState("");

  // Join form
  const [joinName, setJoinName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Room listing
  const [rooms, setRooms] = useState<RoomListing[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch open rooms when join screen is shown
  useEffect(() => {
    if (screen !== "join" || !dbReady) return;

    const fetchRooms = async () => {
      setLoadingRooms(true);
      try {
        const { data: roomsData } = await supabase
          .from("rooms")
          .select("id, name, created_by, status")
          .eq("status", "waiting")
          .order("created_at", { ascending: false })
          .limit(20);

        if (roomsData) {
          // Get player counts for each room
          const roomsWithCounts: RoomListing[] = await Promise.all(
            roomsData.map(async (room) => {
              const { count } = await supabase
                .from("players")
                .select("*", { count: "exact", head: true })
                .eq("room_id", room.id);
              return {
                id: room.id,
                name: room.name,
                created_by: room.created_by,
                player_count: count ?? 0,
              };
            })
          );
          setRooms(roomsWithCounts);
        }
      } catch (e) {
        // DB not set up yet
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchRooms();

    // Subscribe to room changes
    const channel = supabase
      .channel("rooms-listing")
      .on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, fetchRooms)
      .on("postgres_changes", { event: "*", schema: "public", table: "players" }, fetchRooms)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [screen, dbReady]);

  const handleCreate = async () => {
    if (!hostName.trim()) {
      setError("Vui lòng nhập tên của bạn.");
      return;
    }
    setLoading(true);
    await createRoom(hostName.trim(), roomName.trim());
    setLoading(false);
  };

  const handleJoin = async () => {
    setError("");
    const codeToUse = selectedRoomId || joinCode.trim();
    if (!codeToUse) {
      setError("Vui lòng chọn phòng hoặc nhập mã phòng.");
      return;
    }
    if (!joinName.trim()) {
      setError("Vui lòng nhập tên của bạn.");
      return;
    }
    setLoading(true);
    const result = await joinRoom(codeToUse, joinName.trim());
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Lỗi không xác định.");
    }
  };

  const handleResetDb = async () => {
    setResetMessage("");
    setResetMessageType("");

    if (!dbReady) {
      setResetMessage("Database chưa sẵn sàng.");
      setResetMessageType("error");
      return;
    }

    if (adminUser.trim() !== "admin" || adminPass !== "mnam") {
      setResetMessage("Sai tài khoản hoặc mật khẩu admin.");
      setResetMessageType("error");
      return;
    }

    if (resetConfirmText.trim().toUpperCase() !== "RESET") {
      setResetMessage("Vui lòng nhập đúng chữ RESET để xác nhận.");
      setResetMessageType("error");
      return;
    }

    setResetLoading(true);
    try {
      // Delete child tables first, then rooms.
      const { error: votesError } = await supabase.from("votes").delete().not("id", "is", null);
      if (votesError) throw votesError;

      const { error: playersError } = await supabase.from("players").delete().not("id", "is", null);
      if (playersError) throw playersError;

      const { error: gameStateError } = await supabase.from("game_state").delete().not("id", "is", null);
      if (gameStateError) throw gameStateError;

      const { error: roomsError } = await supabase.from("rooms").delete().not("id", "is", null);
      if (roomsError) throw roomsError;

      setResetMessage("Đã reset toàn bộ dữ liệu game trong DB.");
      setResetMessageType("success");
      setAdminUser("");
      setAdminPass("");
      setResetConfirmText("");
      setShowResetPanel(false);
    } catch (e: any) {
      setResetMessage(e?.message || "Reset DB thất bại.");
      setResetMessageType("error");
    } finally {
      setResetLoading(false);
    }
  };

  if (screen === "howto") {
    if (showTheory) {
      const TheoryScreen = require("./theory-screen").TheoryScreen;
      return <TheoryScreen onBack={() => setShowTheory(false)} />;
    }
    if (showDetailedGuide) {
      const DetailedGuideScreen = require("./detailed-guide-screen").DetailedGuideScreen;
      return <DetailedGuideScreen onBack={() => setShowDetailedGuide(false)} />;
    }
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="px-6 py-4 border-b border-border flex items-center gap-3">
          <button
            onClick={() => setScreen("home")}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ← Quay lại
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full">
          <Reveal delayMs={40}>
            <h2 className="text-2xl font-bold mb-2 text-balance">Hướng dẫn chơi</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Đây là game mô phỏng bàn đàm phán lợi ích trong nền kinh tế. Bạn cần chơi đúng vai để bảo vệ lợi ích
              của vai mình, nhưng vẫn phải nhìn cái giá hệ thống phải trả. Flow mới có cơ chế budget lệch vai và phạt
              vượt budget để tránh chiến lược chọn đáp án “đẹp chung” ở mọi vòng.
            </p>
          </Reveal>
          <Reveal className="mb-8" delayMs={80}>
            <div className="p-4 rounded-2xl border border-border bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold">Có thể xem thêm phần nền tảng lý thuyết</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Tóm tắt gọn Chương 5 để hiểu bối cảnh và “quan hệ lợi ích” trước khi chơi.
                </div>
              </div>
              <Button className="shrink-0" variant="outline" onClick={() => setShowTheory(true)}>
                Xem lý thuyết chương 5
              </Button>
            </div>
          </Reveal>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Host tạo phòng và chia sẻ mã",
                desc: "Host nhập tên, tạo phòng, rồi gửi mã phòng cho mọi người. Người chơi có thể vào từ danh sách phòng đang mở hoặc nhập trực tiếp mã phòng.",
              },
              {
                step: "02",
                title: "Host bấm bắt đầu, hệ thống random vai",
                desc: "Người chơi không tự chọn vai. Khi host bắt đầu game, hệ thống sẽ random 1 trong 4 vai: Nhà nước, Doanh nghiệp, Người lao động, Người dân.",
              },
              {
                step: "03",
                title: "Mỗi vòng có bối cảnh riêng và đi theo từng lượt vai",
                desc: "Game có 5 vòng. Mỗi vòng là một tình huống kinh tế thực tế và 4 vai không vote cùng lúc, mà đi theo thứ tự lượt đã được hệ thống quy định cho vòng đó.",
              },
              {
                step: "04",
                title: "Tới lượt vai nào, vai đó chốt A/B/C/D trong 90 giây",
                desc: "Nếu trong cùng vai có nhiều người chơi, hệ thống lấy phương án đa số để đại diện cho vai. Vote đủ hoặc hết giờ thì tự chuyển sang vai tiếp theo.",
              },
              {
                step: "05",
                title: "Flow mới: mỗi vai có budget lệch vai = 2",
                desc: "Nếu bạn chọn phương án bị xem là lệch mục tiêu vai, game trừ 1 budget. Trên màn vote sẽ hiện hint theo vai, budget còn lại và cảnh báo lệch vai ngay ở từng option.",
              },
              {
                step: "06",
                title: "Nếu vượt budget vẫn được chọn, nhưng sẽ bị phạt",
                desc: "Khi budget = 0, chọn tiếp phương án lệch vai sẽ bị trừ điểm vai theo mức lũy tiến, đồng thời tăng xung đột hệ thống. Từ lần vượt sau, niềm tin xã hội còn bị trừ thêm.",
              },
              {
                step: "07",
                title: "Cuối vòng game chốt baseEffect + synergy/conflict + penalty budget",
                desc: "Kết quả vòng là tổng hiệu ứng lựa chọn 4 vai, cộng/trừ combo phối hợp hoặc xung đột, rồi mới cộng phạt do vượt budget. Vì vậy cùng một đáp án có thể cho kết quả khác tùy bối cảnh cả bàn.",
              },
              {
                step: "08",
                title: "Kết thúc 5 vòng: chấm vai thắng và ending xã hội",
                desc: "Vai thắng theo điểm cuối từng vai. Ending chung phản ánh trạng thái xã hội/hệ thống, trong đó `social-friction` dễ xuất hiện hơn khi conflict cao và equity giảm.",
              },
            ].map((item, index) => (
              <Reveal key={item.step} className="flex gap-4" delayMs={100 + index * 35}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed mt-0.5">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 p-4 rounded-xl border border-border bg-card" delayMs={180}>
            <h3 className="font-bold text-sm mb-2">Hiểu nhanh trong 30 giây</h3>
            <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <div>• Mỗi vai có budget lệch vai = 2 cho cả ván.</div>
              <div>• Lệch vai khi còn budget: trừ 1 budget, chưa bị phạt điểm vai.</div>
              <div>• Lệch vai khi hết budget: bị trừ điểm vai lũy tiến, conflict tăng, có thể giảm social trust.</div>
              <div>• Mục tiêu là chơi đúng vai và quản trị cái giá hệ thống, không phải chọn đáp án trung tính mọi lúc.</div>
            </div>
          </Reveal>

          <Reveal className="mt-10" delayMs={220}>
            <h3 className="font-bold mb-4">4 vai trò trong game</h3>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role, index) => (
                <Reveal
                  key={role.id}
                  className={cn("p-3 rounded-xl border", role.bgClass, role.borderClass)}
                  delayMs={250 + index * 30}
                  threshold={0.05}
                >
                  <div className={cn("font-semibold text-sm flex items-center gap-1.5", role.textClass)}>
                    <span>{role.icon}</span>
                    {role.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{role.description}</div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10 p-4 rounded-xl bg-secondary border border-border" delayMs={280}>
            <h3 className="font-bold text-sm mb-2">3 chỉ số chung</h3>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indicator-growth inline-block" />
                <strong className="text-indicator-growth">Tăng trưởng kinh tế</strong> — Hiệu quả phát triển sản xuất
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indicator-equity inline-block" />
                <strong className="text-indicator-equity">Công bằng xã hội</strong> — Bảo vệ người yếu thế, an sinh
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indicator-stability inline-block" />
                <strong className="text-indicator-stability">Ổn định thị trường</strong> — Kiểm soát biến động, niềm tin
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Cả 3 chỉ số này đều bắt đầu từ <strong className="text-foreground">5/10</strong>. Sau mỗi vòng, chúng tăng
              hoặc giảm theo lựa chọn của cả bàn chơi.
            </div>
          </Reveal>

          <Reveal className="mt-8 p-4 rounded-xl border border-border bg-card" delayMs={300}>
            <h3 className="font-bold text-sm mb-2">Hệ thống chốt vòng như thế nào?</h3>
            <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <div>• Game cộng hiệu ứng từ lựa chọn của 4 vai để ra kết quả gốc của vòng.</div>
              <div>• Nếu các lựa chọn ăn khớp nhau, game cộng thêm thưởng (`synergy`).</div>
              <div>• Nếu các lựa chọn kéo nhau quá lệch, game trừ thêm hoặc tăng xung đột (`conflict`).</div>
              <div>• Sau đó game áp quy tắc budget lệch vai và phạt vượt budget (nếu có).</div>
              <div>• Ngoài 3 chỉ số chung, game còn cộng dồn 4 chỉ số hệ thống: độ cứng, niềm tin, sức khỏe thị trường và xung đột.</div>
            </div>
          </Reveal>

          <Reveal className="mt-8 p-4 rounded-xl border border-border bg-card" delayMs={315}>
            <h3 className="font-bold text-sm mb-2">Khi vượt budget thì chuyện gì xảy ra?</h3>
            <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <div>• Lần vượt đầu: phạt điểm vai và cộng thêm xung đột hệ thống.</div>
              <div>• Vượt liên tiếp: mức phạt tăng dần, rủi ro xã hội cao hơn.</div>
              <div>• Bạn vẫn được quyền chọn, nhưng phải trả giá rõ ràng cho quyết định đó.</div>
              <div>• Kết quả này sẽ hiện ở màn kết quả vòng và recap cuối game.</div>
            </div>
          </Reveal>

          <Reveal className="mt-8 p-4 rounded-xl border border-border bg-card" delayMs={330}>
            <h3 className="font-bold text-sm mb-2">Cách tính điểm cuối game</h3>
            <div className="rounded-xl border border-border bg-background/70 p-3 mb-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Công thức tổng quát</div>
              <code className="text-sm font-mono text-foreground">
                FinalScore = rolePoints + Utility(theo trạng thái cuối game) - Penalty(cực đoan)
              </code>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <div>• <strong className="text-foreground">rolePoints</strong> là điểm vai bạn ăn được qua 5 vòng.</div>
              <div>• <strong className="text-foreground">Utility</strong> là điểm thưởng vì trạng thái cuối game đang có lợi cho vai bạn.</div>
              <div>• <strong className="text-foreground">Penalty</strong> là điểm phạt nếu hệ thống bị kéo tới trạng thái quá cực đoan.</div>
              <div>• Vai có <strong className="text-foreground">FinalScore</strong> cao nhất là bên thắng.</div>
            </div>
          </Reveal>

          <Reveal className="mt-6 p-4 rounded-xl border border-border bg-card" delayMs={350}>
            <h3 className="font-bold text-sm mb-2">Hiểu nhanh để khỏi nhầm</h3>
            <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <div>• Điểm cao cho vai bạn chưa chắc đồng nghĩa nền kinh tế đang tốt.</div>
              <div>• Ending chung đẹp chưa chắc vai bạn là người thắng.</div>
              <div>• Chơi lệch vai liên tục sẽ làm bạn mất điểm và hệ thống căng hơn.</div>
              <div>• Nói ngắn gọn: game này chấm cả <strong className="text-foreground">lợi ích riêng</strong> lẫn <strong className="text-foreground">cái giá chung</strong>.</div>
            </div>
          </Reveal>
        </div>
        <div className="p-6">
          <Reveal className="max-w-2xl mx-auto flex flex-col items-center gap-3" delayMs={320}>
            <img
              src={HOWTO_FOOTER_GIF_URL}
              alt="Bắt đầu"
              className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
              loading="eager"
            />
            <Button className="w-full" onClick={() => setScreen("home")}>Hiểu rồi, bắt đầu thôi!</Button>
            <Button className="w-full" variant="outline" onClick={() => setShowDetailedGuide(true)}>
              Xem hướng dẫn siêu chi tiết
            </Button>
          </Reveal>
        </div>
      </div>
    );
  }

  if (screen === "create") {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="px-6 py-4 border-b border-border flex items-center gap-3">
          <button
            onClick={() => { setScreen("home"); setError(""); setHostName(""); setRoomName(""); }}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ← Quay lại
          </button>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Tạo phòng mới</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Bạn sẽ là host, quan sát và điều phối game.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="room-name">
                  Tên phòng
                </label>
                <Input
                  id="room-name"
                  placeholder="Ví dụ: Lớp kinh tế chính trị K47..."
                  value={roomName}
                  onChange={(e) => { setRoomName(e.target.value); setError(""); }}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                  maxLength={50}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="host-name">
                  Tên của bạn (Host)
                </label>
                <Input
                  id="host-name"
                  placeholder="Nhập tên host..."
                  value={hostName}
                  onChange={(e) => { setHostName(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                  maxLength={30}
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
            <Button className="w-full" size="lg" onClick={handleCreate} disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo phòng"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "join") {
    const activeRoomCode = selectedRoomId || joinCode.trim();
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="px-6 py-4 border-b border-border flex items-center gap-3">
          <button
            onClick={() => { setScreen("home"); setError(""); setJoinName(""); setJoinCode(""); setSelectedRoomId(null); }}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ← Quay lại
          </button>
          <h1 className="text-base font-semibold">Tham gia phòng</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 max-w-lg mx-auto w-full">
          {/* Player name — always first */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="join-name">
              Tên của bạn
            </label>
            <Input
              id="join-name"
              placeholder="Nhập tên..."
              value={joinName}
              onChange={(e) => { setJoinName(e.target.value); setError(""); }}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              maxLength={30}
            />
          </div>

          {/* Live room listing */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Phòng đang mở</span>
              {dbReady && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-indicator-equity animate-pulse" />
                  Realtime
                </span>
              )}
            </div>

            {!dbReady ? (
              <div className="p-4 rounded-xl bg-card border border-border text-sm text-muted-foreground text-center">
                Database chưa sẵn sàng. Vui lòng chạy SQL setup.
              </div>
            ) : loadingRooms ? (
              <div className="p-4 rounded-xl bg-card border border-border text-sm text-muted-foreground text-center">
                Đang tải danh sách phòng...
              </div>
            ) : rooms.length === 0 ? (
              <div className="p-4 rounded-xl bg-card border border-border text-sm text-muted-foreground text-center">
                Chưa có phòng nào đang mở. Hãy nhập mã phòng phía dưới.
              </div>
            ) : (
              <div className="space-y-2">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => {
                      setSelectedRoomId(room.id);
                      setJoinCode("");
                      setError("");
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all",
                      selectedRoomId === room.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{room.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Host: {room.created_by} &nbsp;·&nbsp; Mã: <span className="font-mono">{room.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        {room.player_count} người
                      </span>
                      {selectedRoomId === room.id && (
                        <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Manual code input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="join-code">
              Hoặc nhập mã phòng thủ công
            </label>
            <Input
              id="join-code"
              placeholder="Ví dụ: CBLI-204"
              value={joinCode}
              onChange={(e) => {
                setJoinCode(e.target.value.toUpperCase());
                setSelectedRoomId(null);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground font-mono tracking-widest uppercase"
              maxLength={9}
            />
          </div>

          {/* Active selection indicator */}
          {activeRoomCode && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm">
              <span className="text-primary font-medium">Sẽ vào:</span>
              <span className="font-mono font-bold text-foreground">{activeRoomCode}</span>
            </div>
          )}

          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <div className="p-6 border-t border-border">
          <Button
            className="w-full"
            size="lg"
            onClick={handleJoin}
            disabled={loading || (!activeRoomCode && !joinCode.trim())}
          >
            {loading ? "Đang vào..." : "Vào phòng"}
          </Button>
        </div>
      </div>
    );
  }

  // Main home
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="fixed top-4 right-4 z-50 w-[260px]">
        {/* Invisible hotspot: only users who know the position can open the panel */}
        <button
          type="button"
          onClick={() => {
            setShowResetPanel((prev) => !prev);
            setResetMessage("");
            setResetMessageType("");
          }}
          className="absolute top-0 right-0 w-8 h-8 opacity-0"
          aria-label="Admin hotspot"
          title=""
        />

        {showResetPanel && (
          <div className="mt-2 p-3 rounded-xl border border-destructive/40 bg-background/95 backdrop-blur-sm space-y-2 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-semibold text-destructive">Reset DB (Admin Only)</div>
              <button
                type="button"
                onClick={() => setShowResetPanel(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
                aria-label="Đóng panel reset"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Hành động này sẽ xóa toàn bộ dữ liệu bảng rooms, players, votes, game_state.
            </p>

            <Input
              placeholder="Tài khoản admin"
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
              className="h-8 text-xs"
              maxLength={32}
            />
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="h-8 text-xs"
              maxLength={64}
            />
            <Input
              placeholder="Nhập RESET để xác nhận"
              value={resetConfirmText}
              onChange={(e) => setResetConfirmText(e.target.value)}
              className="h-8 text-xs uppercase"
              maxLength={16}
            />

            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={handleResetDb}
              disabled={resetLoading}
            >
              {resetLoading ? "Đang reset DB..." : "Reset DB"}
            </Button>

            {resetMessage && (
              <div
                className={cn(
                  "text-xs",
                  resetMessageType === "success" ? "text-indicator-equity" : "text-destructive"
                )}
              >
                {resetMessage}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <>
          <button
            type="button"
            onClick={() => setScreen("howto")}
            className="fixed left-5 bottom-5 sm:left-7 sm:bottom-7 z-50 w-[300px] sm:w-[360px] hidden sm:flex items-center justify-between gap-2 transition-transform hover:scale-105 active:scale-95"
            aria-label="Mở hướng dẫn bên trái"
            title="Hướng dẫn"
          >
            <img
              src={GUIDE_GIF_URL}
              alt="Hướng dẫn"
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
              style={{ transform: "scaleX(-1)" }}
              loading="eager"
            />
            <span
              className="text-sm sm:text-base font-extrabold tracking-tight leading-none uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
              style={{ animation: "guideTextRainbow 3.2s ease-in-out infinite" }}
            >
              HƯỚNG DẪN CHƠI !!!
            </span>
          </button>

          <button
            type="button"
            onClick={() => setScreen("howto")}
            className="fixed right-5 bottom-5 sm:right-7 sm:bottom-7 z-50 w-[300px] sm:w-[360px] hidden sm:flex items-center justify-between gap-2 transition-transform hover:scale-105 active:scale-95"
            aria-label="Mở hướng dẫn bên phải"
            title="Hướng dẫn"
          >
            <span
              className="text-sm sm:text-base font-extrabold tracking-tight leading-none uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
              style={{ animation: "guideTextRainbow 3.2s ease-in-out infinite" }}
            >
              HƯỚNG DẪN CHƠI !!!
            </span>
            <img
              src={GUIDE_GIF_URL}
              alt="Hướng dẫn"
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
              loading="eager"
            />
          </button>
        </>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-4">
          <span
            className={cn("w-1.5 h-1.5 rounded-full", dbReady ? "bg-indicator-equity animate-pulse" : "bg-muted-foreground")}
            aria-hidden="true"
          />
          {dbReady ? "Multiplayer sẵn sàng" : "Đang kết nối..."}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-balance mb-3">
          {GAME_INTRO.title.split(" ").slice(0, 2).join(" ")}
          <br />
          <span className="text-primary">{GAME_INTRO.title.split(" ").slice(2).join(" ")}</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xs leading-relaxed mb-10 text-pretty">
          {GAME_INTRO.hook}
        </p>

        <div className="flex gap-3 mb-12">
          {ROLES.map((role) => (
            <div
              key={role.id}
              className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-xl border", role.bgClass, role.borderClass)}
              title={role.label}
              aria-label={role.label}
            >
              {role.icon}
            </div>
          ))}
        </div>

        <div className="w-full max-w-xs space-y-3">
          <Button className="w-full h-12 text-base font-semibold" onClick={() => setScreen("create")}>
            Tạo phòng mới
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-base font-semibold border-border bg-card hover:bg-secondary text-foreground"
            onClick={() => setScreen("join")}
          >
            Tham gia phòng
          </Button>

          <button
            type="button"
            onClick={() => setScreen("howto")}
            className="sm:hidden w-full pt-2 flex flex-col items-center gap-2"
            aria-label="Mở hướng dẫn"
            title="Hướng dẫn"
          >
            <img
              src={GUIDE_MOBILE_GIF_URL}
              alt="Hướng dẫn"
              className="w-28 h-28 object-contain"
              loading="eager"
            />
            <span
              className="text-sm font-extrabold tracking-tight leading-none uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
              style={{ animation: "guideTextRainbow 3.2s ease-in-out infinite" }}
            >
              HƯỚNG DẪN CHƠI !!!
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes guideTextRainbow {
          0% {
            color: hsl(var(--foreground));
          }
          25% {
            color: hsl(var(--primary));
          }
          50% {
            color: #4a8fe8;
          }
          75% {
            color: #e8943a;
          }
          100% {
            color: hsl(var(--foreground));
          }
        }
      `}</style>
    </div>
  );
}
