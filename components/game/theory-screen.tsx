"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function TheoryScreen({ onBack }: { onBack: () => void }) {
  const toc = [
    { id: "video", label: "Video lý thuyết" },
    { id: "tomtat", label: "Tóm tắt nhanh" },
    { id: "theche", label: "Thể chế & vì sao phải hoàn thiện" },
    { id: "noidung", label: "Nội dung hoàn thiện thể chế" },
    { id: "loiich", label: "Lợi ích & quan hệ lợi ích" },
    { id: "nguyentac", label: "Nguyên tắc điều hòa lợi ích" },
    { id: "vidu", label: "Ví dụ thực tế" },
    { id: "ket", label: "Kết luận & công thức nhớ nhanh" },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 border-b border-border flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          ← Quay lại
        </button>
        <h1 className="text-base font-semibold ml-4">Lý thuyết chương 5</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-5xl mx-auto w-full">
        {/* Hero */}
        <Reveal delayMs={40} className="rounded-3xl border border-border bg-card p-6 sm:p-8 mb-6 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/15 blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-indicator-equity/10 blur-2xl" aria-hidden="true" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
              Tóm tắt học nhanh · dùng ngay trong game
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 text-balance leading-tight">
              Kinh tế thị trường định hướng xã hội chủ nghĩa
              <span className="text-primary"> & quan hệ lợi ích kinh tế</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Mục tiêu trang này là giúp bạn nắm được “luật chơi” (thể chế), vì sao cần hoàn thiện, và cách điều hòa lợi ích
              giữa các chủ thể. Đọc 3–5 phút là đủ để tranh luận trong game tự tin hơn.
            </p>
          </div>
        </Reveal>

        {/* Video */}
        <Reveal as="section" id="video" className="scroll-mt-6 mb-6" delayMs={80}>
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Video</div>
                <h3 className="text-lg sm:text-xl font-extrabold">Lý thuyết ngắn (xem tại đây)</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Nếu bạn chưa thấy video: hãy đặt file vào <span className="font-mono text-foreground">public/theory.mp4</span>.
                </p>
              </div>
              <a
                href="/theory.mp4"
                className="text-sm font-semibold text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Mở video ở tab mới
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border bg-background/30">
              <video
                controls
                preload="metadata"
                playsInline
                className="w-full h-auto"
              >
                <source src="/theory.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video. Bạn có thể tải trực tiếp tại{" "}
                <a href="/theory.mp4" className="underline">/theory.mp4</a>.
              </video>
            </div>
          </div>
        </Reveal>

        {/* Mobile TOC */}
        <div className="md:hidden mb-5 -mx-6 px-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
          {/* Desktop TOC */}
          <aside className="hidden md:block sticky top-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Mục lục</div>
              <nav className="space-y-1.5">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="block px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-border">
                <Button className="w-full" onClick={onBack}>
                  Quay lại hướng dẫn
                </Button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="space-y-4">
            <Reveal as="section" id="tomtat" className="scroll-mt-6" delayMs={120}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Tóm tắt nhanh (60 giây)
                </div>
                <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
                  <li>
                    <strong className="text-foreground">KTTT định hướng XHCN</strong> = dùng cơ chế thị trường để tạo động lực,
                    nhưng <strong className="text-foreground">Nhà nước định hướng</strong> để bảo đảm công bằng, an sinh, ổn định.
                  </li>
                  <li>
                    <strong className="text-foreground">Thể chế</strong> là “luật chơi” của nền kinh tế (luật, chính sách, bộ máy quản lý).
                    Thể chế tốt giúp thị trường chạy đúng, giảm méo mó và lợi ích nhóm.
                  </li>
                  <li>
                    <strong className="text-foreground">Quan hệ lợi ích</strong> là tương tác giữa cá nhân – tập thể – xã hội: vừa thống nhất vừa mâu thuẫn,
                    nên cần cơ chế điều hòa (pháp luật, thuế, lao động, an sinh, chống độc quyền…).
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal as="section" id="theche" className="scroll-mt-6" delayMs={140}>
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <h3 className="text-base font-bold">Thể chế là gì & vì sao phải hoàn thiện?</h3>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    <strong className="text-foreground">Thể chế</strong> là toàn bộ luật lệ, chính sách và cách quản lý để nền kinh tế vận hành.
                    Có thể hiểu nôm na là “bộ luật chơi” của thị trường.
                  </p>
                  <div className="p-3 rounded-xl bg-secondary border border-border">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Nếu thể chế yếu dễ dẫn tới
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      Luật chồng chéo, thủ tục rườm rà, cạnh tranh không công bằng, tham nhũng/lợi ích nhóm,
                      chênh lệch giàu nghèo tăng, người lao động thiệt thòi, tài nguyên bị khai thác bừa bãi.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <section id="noidung" className="scroll-mt-6" aria-label="Nội dung hoàn thiện thể chế">
              <div className="rounded-2xl border border-border bg-card p-5 overflow-x-auto min-h-[300px]">
                <h3 className="text-base font-bold mb-3">Nội dung hoàn thiện thể chế (5 mảng)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground leading-relaxed break-words">
                  {[ 
                    {
                      k: "A",
                      t: "Sở hữu & thành phần kinh tế",
                      d: "Thừa nhận nhiều hình thức sở hữu; tạo điều kiện phát triển theo pháp luật.",
                    },
                    {
                      k: "B",
                      t: "Yếu tố thị trường vận hành đồng bộ",
                      d: "Đồng bộ các thị trường: hàng hóa, lao động, vốn, BĐS, KH-CN…",
                    },
                    {
                      k: "C",
                      t: "Vai trò quản lý của Nhà nước",
                      d: "Ban hành luật, điều tiết, chống độc quyền, kiểm soát lạm phát, đầu tư hạ tầng – giáo dục – y tế.",
                    },
                    {
                      k: "D",
                      t: "Tăng trưởng đi cùng công bằng",
                      d: "Không chỉ GDP tăng: giảm nghèo, tạo việc làm, an sinh, hỗ trợ vùng khó khăn.",
                    },
                    {
                      k: "E",
                      t: "Hội nhập kinh tế quốc tế",
                      d: "Minh bạch, cạnh tranh, sở hữu trí tuệ, cải cách thủ tục, nâng chất lượng hàng hóa.",
                    },
                  ].map((x) => (
                    <div key={x.k} className="p-4 rounded-2xl border border-border bg-background/30">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 text-primary font-mono font-extrabold text-sm flex items-center justify-center shrink-0">
                          {x.k}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground break-words">{x.t}</div>
                          <div className="mt-0.5 break-words">{x.d}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="loiich" className="scroll-mt-6" aria-label="Lợi ích & quan hệ lợi ích">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3 overflow-x-auto min-h-[300px]">
                <h3 className="text-base font-bold">Lợi ích kinh tế & quan hệ lợi ích</h3>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    <strong className="text-foreground">Lợi ích kinh tế</strong> là cái các chủ thể muốn đạt được khi tham gia hoạt động kinh tế
                    (lương, lợi nhuận, thu ngân sách, giá rẻ – chất lượng tốt…).
                  </p>
                  <p>
                    <strong className="text-foreground">Quan hệ lợi ích</strong> là mối quan hệ giữa các bên khi theo đuổi lợi ích:
                    có thể hợp tác, cũng có thể xung đột.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[ 
                      { t: "Cá nhân", d: "Động lực trực tiếp học tập – lao động – sáng tạo." },
                      { t: "Tập thể", d: "Lợi ích của nhóm/tổ chức/doanh nghiệp/cơ quan." },
                      { t: "Xã hội/Quốc gia", d: "Lợi ích chung của cộng đồng và đất nước." },
                    ].map((x) => (
                      <div key={x.t} className="p-3 rounded-xl bg-secondary border border-border">
                        <div className="text-sm font-semibold text-foreground">{x.t}</div>
                        <div className="text-sm text-muted-foreground mt-0.5 leading-relaxed break-words">{x.d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl border border-border bg-background/30">
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Nhớ nhanh
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      Lợi ích <strong className="text-foreground">vừa thống nhất</strong> (kinh tế tốt thì nhiều bên cùng hưởng),
                      vừa <strong className="text-foreground">mâu thuẫn</strong> (mỗi bên muốn tối đa phần mình).
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Reveal as="section" id="nguyentac" className="scroll-mt-6" delayMs={200}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-bold mb-3">Nguyên tắc điều hòa quan hệ lợi ích (4 ý)</h3>
                <ol className="text-sm text-muted-foreground leading-relaxed space-y-2 list-decimal pl-4">
                  <li>Tôn trọng lợi ích chính đáng của các chủ thể.</li>
                  <li>Kết hợp hài hòa lợi ích cá nhân – tập thể – xã hội.</li>
                  <li>Lợi ích cá nhân phải phù hợp lợi ích xã hội (trong khuôn khổ pháp luật và đạo đức).</li>
                  <li>Nhà nước giữ vai trò điều tiết: pháp luật, thuế, lương, an sinh, môi trường, chống độc quyền…</li>
                </ol>
              </div>
            </Reveal>

            <Reveal as="section" id="vidu" className="scroll-mt-6" delayMs={220}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-bold mb-3">Ví dụ thực tế dễ nhớ</h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  {[
                    {
                      t: "Chủ doanh nghiệp ↔ Công nhân",
                      d: "Mâu thuẫn lương/chi phí. Điều hòa bằng luật lao động, lương tối thiểu, giờ làm, công đoàn.",
                    },
                    {
                      t: "Nông dân ↔ Thương lái ↔ Người tiêu dùng",
                      d: "Khác mục tiêu giá – lợi nhuận – chất lượng. Giải bằng hợp tác xã, logistics, minh bạch giá.",
                    },
                    {
                      t: "Khu công nghiệp: DN ↔ Người dân ↔ Nhà nước ↔ Xã hội",
                      d: "Xung đột đất/đền bù/môi trường. Cần đền bù minh bạch, tái định cư, kiểm soát môi trường, tạo việc làm.",
                    },
                  ].map((x) => (
                    <div key={x.t} className="p-4 rounded-2xl bg-secondary border border-border">
                      <div className="font-semibold text-foreground">{x.t}</div>
                      <div className="mt-1">{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal as="section" id="ket" className="scroll-mt-6" delayMs={240}>
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <h3 className="text-base font-bold">Kết luận & công thức nhớ nhanh</h3>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                  <p>
                    Hoàn thiện thể chế là làm “luật chơi kinh tế” đầy đủ và hợp lý hơn để thị trường vận hành hiệu quả,
                    kinh tế phát triển nhưng vẫn bảo đảm công bằng và định hướng vì con người.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl border border-border bg-background/30">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Công thức 1
                      </div>
                      <div className="font-mono text-sm text-foreground">
                        KTTT ĐH XHCN = Thị trường + Nhà nước định hướng + Công bằng
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-background/30">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Công thức 2
                      </div>
                      <div className="font-mono text-sm text-foreground">
                        Quan hệ lợi ích = Cá nhân + Tập thể + Xã hội → cần hài hòa/điều tiết
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="md:hidden pt-2" delayMs={260}>
              <Button className="w-full" onClick={onBack}>
                Quay lại hướng dẫn chơi
              </Button>
            </Reveal>
          </main>
        </div>
      </div>
    </div>
  );
}
