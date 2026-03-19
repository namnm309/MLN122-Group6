"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ROLES } from "@/lib/game-data";

export function DetailedGuideScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 border-b border-border flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          ← Quay lại
        </button>
        <h1 className="text-base font-semibold ml-4">Hướng dẫn siêu chi tiết</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-4xl mx-auto w-full space-y-5">
        <Reveal delayMs={40} className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-2xl font-extrabold leading-tight text-balance">
            Toàn bộ cơ chế game: điểm số, thắng-thua, chỉ số và các tình huống có thể xảy ra
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Trang này giải thích đầy đủ flow game theo phiên bản mới: chơi theo vai, có budget lệch vai, có phạt vượt
            budget, có synergy/conflict và ending chung cho cả xã hội.
          </p>
        </Reveal>

        <Reveal delayMs={70} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">1) Flow mỗi ván chơi</h3>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• Game có 5 vòng, mỗi vòng là một bối cảnh kinh tế khác nhau.</div>
            <div>• Mỗi vòng đi theo thứ tự vai, không phải tất cả vote cùng lúc.</div>
            <div>• Mỗi vai chốt 1 phương án A/B/C/D (nếu nhiều người cùng vai thì lấy đa số).</div>
            <div>• Hệ thống cộng hiệu ứng từ 4 vai, áp synergy/conflict, rồi áp penalty do budget.</div>
            <div>• Kết thúc 5 vòng: chốt điểm thắng vai + ending chung của xã hội.</div>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">2) Vai trò và mục tiêu cốt lõi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROLES.map((role) => (
              <div key={role.id} className="p-3 rounded-xl border border-border bg-background/40">
                <div className="font-semibold">{role.icon} {role.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{role.goal}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Bạn không phải giám khảo trung lập. Bạn đang đại diện cho lợi ích của đúng vai đó.
          </p>
        </Reveal>

        <Reveal delayMs={130} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">3) Chỉ số nào đang được theo dõi?</h3>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• <strong className="text-foreground">3 chỉ số chung</strong>: Tăng trưởng, Công bằng, Ổn định (thang 0-10, bắt đầu từ 5).</div>
            <div>• <strong className="text-foreground">4 chỉ số hệ thống</strong>: Độ cứng quản trị, Niềm tin xã hội, Sức khỏe thị trường, Xung đột lợi ích.</div>
            <div>• Chỉ số hệ thống được cộng dồn qua các vòng và ảnh hưởng utility/ending cuối game.</div>
          </div>
        </Reveal>

        <Reveal delayMs={160} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">4) Budget lệch vai (flow mới)</h3>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• Mỗi vai có <strong className="text-foreground">2 budget lệch vai</strong> cho cả ván.</div>
            <div>• Chọn phương án bị coi là lệch mục tiêu vai: trừ 1 budget.</div>
            <div>• Budget & cảnh báo lệch vai luôn hiển thị ngay tại màn vote của người chơi.</div>
            <div>• Budget là tài nguyên chiến lược: có thể dùng để “hy sinh vai” ở thời điểm cần thiết, nhưng không thể lạm dụng mãi.</div>
          </div>
        </Reveal>

        <Reveal delayMs={190} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">5) Nếu vượt budget thì sao?</h3>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• Khi budget đã về 0, bạn vẫn được chọn phương án lệch vai.</div>
            <div>• Nhưng sẽ bị phạt điểm vai theo mức lũy tiến (mạnh dần theo số lần vượt).</div>
            <div>• Đồng thời hệ thống bị tăng xung đột, và từ các lần vượt sâu có thể giảm thêm niềm tin xã hội.</div>
            <div>• Các khoản phạt này hiện rõ ở màn kết quả vòng và recap cuối game.</div>
          </div>
        </Reveal>

        <Reveal delayMs={220} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">6) Cơ chế tính điểm cuối game</h3>
          <div className="rounded-xl border border-border bg-background/70 p-3 mb-3">
            <code className="text-sm font-mono text-foreground">
              FinalScore = rolePoints + Utility(theo trạng thái hệ thống) - Penalty(cực đoan)
            </code>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• <strong className="text-foreground">rolePoints</strong>: điểm bạn kiếm được trực tiếp từ lựa chọn theo vai qua 5 vòng.</div>
            <div>• <strong className="text-foreground">Utility</strong>: trạng thái cuối game có lợi đến đâu cho vai của bạn.</div>
            <div>• <strong className="text-foreground">Penalty</strong>: phạt khi hệ thống bị kéo sang trạng thái cực đoan/bất lợi.</div>
            <div>• Vai có FinalScore cao nhất là bên thắng (có thể đồng hạng).</div>
          </div>
        </Reveal>

        <Reveal delayMs={250} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">7) Vai trò có thể thắng bằng cách nào?</h3>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• <strong className="text-foreground">Nhà nước</strong>: giữ ổn định + trust tốt, tránh để xung đột bùng.</div>
            <div>• <strong className="text-foreground">Doanh nghiệp</strong>: giữ tăng trưởng và sức khỏe thị trường, không tự phá năng lực phát triển dài hạn.</div>
            <div>• <strong className="text-foreground">Người lao động</strong>: tăng công bằng nhưng không làm hệ thống gãy nhịp liên tục.</div>
            <div>• <strong className="text-foreground">Người dân</strong>: bảo vệ sức mua và trust, hạn chế phản ứng cực đoan gây méo thị trường.</div>
          </div>
        </Reveal>

        <Reveal delayMs={280} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">8) Các tình huống thường gặp trong trận</h3>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• <strong className="text-foreground">Vai bạn được điểm cao nhưng ending xấu</strong>: bạn thắng lợi ích riêng, nhưng xã hội phải trả giá.</div>
            <div>• <strong className="text-foreground">Ending chung khá đẹp nhưng vai bạn không top</strong>: bàn chơi ổn, nhưng vai bạn nhượng bộ nhiều.</div>
            <div>• <strong className="text-foreground">Đầu game ổn, cuối game rơi mạnh</strong>: thường do các vòng sau kích hoạt conflict chain + vượt budget liên tục.</div>
            <div>• <strong className="text-foreground">Social Friction xuất hiện</strong>: conflict tích lũy cao và công bằng bị kéo xuống.</div>
          </div>
        </Reveal>

        <Reveal delayMs={310} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3">9) Mẹo chơi thực dụng (không spoiler đáp án)</h3>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <div>• Đừng đốt budget quá sớm nếu chưa thật sự cần.</div>
            <div>• Theo dõi chỉ số hệ thống, không chỉ nhìn điểm vai trước mắt.</div>
            <div>• Khi conflict đã cao, các lựa chọn cứng dễ đẩy game vào ending căng.</div>
            <div>• Luôn đọc hint vai của bạn trước khi chốt option.</div>
          </div>
        </Reveal>

        <Reveal delayMs={340} className="pt-2">
          <Button className="w-full" onClick={onBack}>
            Quay lại hướng dẫn chơi
          </Button>
        </Reveal>
      </div>
    </div>
  );
}

