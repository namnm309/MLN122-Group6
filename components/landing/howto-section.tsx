"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ROLES } from "@/lib/game-data";
import { cn } from "@/lib/utils";

export function HowtoSection() {
  return (
    <section id="huongdan" className="scroll-mt-20">
      <div className="px-6 py-14 max-w-5xl mx-auto w-full">
        <Reveal delayMs={40}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
                Hướng dẫn chơi
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed max-w-3xl">
                Đây là game mô phỏng ra quyết định tập thể trong kinh tế thị trường định hướng xã hội chủ nghĩa.
                Mỗi quyết định của nhóm sẽ tác động trực tiếp đến 3 chỉ số chung và điểm của từng vai.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link href="/game">Vào game</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal className="mt-8" delayMs={80}>
          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold">Có thể xem thêm phần nền tảng lý thuyết</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Tóm tắt gọn Chương 5 để hiểu bối cảnh và “quan hệ lợi ích” trước khi chơi.
              </div>
            </div>
            <Button asChild className="shrink-0" variant="outline">
              <a href="#lythuyet">Cuộn tới lý thuyết</a>
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 space-y-6">
          {[
            {
              step: "01",
              title: "Host tạo phòng và chia sẻ mã",
              desc: "Host nhập tên, tạo phòng, rồi gửi mã phòng cho mọi người. Người chơi có thể vào từ danh sách phòng đang mở hoặc nhập trực tiếp mã phòng.",
            },
            {
              step: "02",
              title: "Người chơi chọn vai trước khi bắt đầu",
              desc: "Mỗi người chọn một vai phù hợp góc nhìn của mình. Khi đã chọn vai, người chơi chờ host bấm bắt đầu game.",
            },
            {
              step: "03",
              title: "Mỗi vòng gồm bối cảnh + phương án",
              desc: "Game có 5 vòng. Mỗi vòng đưa ra một tình huống kinh tế thực tế, kèm 4 phương án quyết định (A/B/C/D).",
            },
            {
              step: "04",
              title: "Bỏ phiếu trong 30 giây",
              desc: "Người chơi bỏ 1 phiếu duy nhất trong 30 giây. Có thể theo dõi số người đã vote theo thời gian thực. Hết giờ hệ thống tự chốt kết quả theo các phiếu hiện có.",
            },
            {
              step: "05",
              title: "Nhận kết quả vòng và cập nhật chỉ số",
              desc: "Phương án thắng sẽ làm thay đổi 3 chỉ số chung: Tăng trưởng, Công bằng, Ổn định. Đồng thời mỗi vai nhận điểm lợi ích khác nhau theo phương án vừa thắng.",
            },
            {
              step: "06",
              title: "Kết thúc sau 5 vòng",
              desc: "Cuối game, hệ thống tổng hợp điểm vai trò và mức cân bằng 3 chỉ số để trả về kết cục tổng thể của nền kinh tế.",
            },
          ].map((item, index) => (
            <Reveal key={item.step} className="flex gap-4" delayMs={110 + index * 35}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0">
                {item.step}
              </div>
              <div className="min-w-0">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed mt-0.5">{item.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 p-4 rounded-xl border border-border bg-card" delayMs={200}>
          <h3 className="font-bold text-sm mb-2">Lưu ý quan trọng</h3>
          <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
            <div>• Mỗi vòng chỉ chọn được 1 phương án, đã chọn là không đổi trong vòng đó.</div>
            <div>• Nếu bạn chưa vote và hết giờ, hệ thống vẫn xử lý vòng dựa trên các phiếu đã có.</div>
            <div>• Mục tiêu của từng vai khác nhau, vì vậy tranh luận trước khi vote là phần cốt lõi của game.</div>
          </div>
        </Reveal>

        <Reveal className="mt-12" delayMs={230}>
          <h3 className="font-bold mb-4 text-lg">4 vai trò trong game</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
        </Reveal>

        <Reveal className="mt-12 flex flex-col sm:flex-row gap-3" delayMs={320}>
          <Button asChild size="lg" className="flex-1">
            <Link href="/game">Vào game ngay</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex-1">
            <a href="#lythuyet">Xem lý thuyết trước</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

