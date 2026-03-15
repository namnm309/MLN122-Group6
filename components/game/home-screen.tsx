"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/lib/game-context";
import { ROLES } from "@/lib/game-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type Screen = "home" | "create" | "join" | "howto";

interface RoomListing {
  id: string;
  name: string;
  created_by: string;
  player_count: number;
}

export function HomeScreen() {
  const [screen, setScreen] = useState<Screen>("home");
  const { createRoom, joinRoom, dbReady } = useGame();

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

  if (screen === "howto") {
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
          <h2 className="text-2xl font-bold mb-2 text-balance">Hướng dẫn chơi</h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Game ra quyết định tập thể về kinh tế thị trường định hướng xã hội chủ nghĩa.
          </p>
          <div className="space-y-6">
            {[
              { step: "01", title: "Host tạo phòng", desc: "Host tạo phòng với tên riêng và chia sẻ mã phòng (CBLI-XXX) cho người chơi." },
              { step: "02", title: "Người chơi tham gia", desc: "Chọn phòng từ danh sách đang mở, hoặc nhập thẳng mã phòng." },
              { step: "03", title: "Chọn vai trò", desc: "Mỗi người chọn 1 trong 4 vai: Nhà nước, Doanh nghiệp, Người lao động, hoặc Người dân." },
              { step: "04", title: "Đọc tình huống & bỏ phiếu", desc: "Game có 5 vòng. Mỗi vòng trình bày tình huống kinh tế thực tế. Tất cả vote trong 30 giây." },
              { step: "05", title: "Xem kết quả & nhận kết thúc", desc: "Sau 5 vòng, hệ thống phân tích tổng chỉ số và trả về một trong 4 kết thúc có thể." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-bold mb-4">4 vai trò trong game</h3>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role) => (
                <div key={role.id} className={cn("p-3 rounded-xl border", role.bgClass, role.borderClass)}>
                  <div className={cn("font-semibold text-sm flex items-center gap-1.5", role.textClass)}>
                    <span>{role.icon}</span>
                    {role.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{role.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 p-4 rounded-xl bg-secondary border border-border">
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
          </div>
        </div>
        <div className="p-6 border-t border-border">
          <Button className="w-full" onClick={() => setScreen("home")}>Hiểu rồi, bắt đầu thôi!</Button>
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-4">
          <span
            className={cn("w-1.5 h-1.5 rounded-full", dbReady ? "bg-indicator-equity animate-pulse" : "bg-muted-foreground")}
            aria-hidden="true"
          />
          {dbReady ? "Multiplayer sẵn sàng" : "Đang kết nối..."}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-balance mb-3">
          Cân Bằng
          <br />
          <span className="text-primary">Lợi Ích</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xs leading-relaxed mb-10 text-pretty">
          Game ra quyết định tập thể về kinh tế thị trường định hướng xã hội chủ nghĩa
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
            onClick={() => setScreen("howto")}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Hướng dẫn chơi
          </button>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="flex justify-around text-center max-w-sm mx-auto">
          {[
            { label: "Vai trò", value: "4" },
            { label: "Vòng chơi", value: "5" },
            { label: "Kết thúc", value: "4" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
