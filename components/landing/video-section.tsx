"use client";

import { Reveal } from "@/components/ui/reveal";

export function VideoSection() {
  return (
    <section id="video" className="scroll-mt-20">
      <div className="px-6 py-14 max-w-6xl mx-auto w-full">
        <Reveal delayMs={40}>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Video</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-balance">
                Video lý thuyết ngắn
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-3xl">
                Xem nhanh trước, rồi kéo xuống phần lý thuyết để đọc tóm tắt theo từng mục.
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
        </Reveal>

        <Reveal delayMs={80} className="mt-5">
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Nếu bạn chưa thấy video: hãy đặt file vào <span className="font-mono text-foreground">public/theory.mp4</span>.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border bg-background/30">
              <video controls preload="metadata" playsInline className="w-full h-auto">
                <source src="/theory.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video. Bạn có thể tải trực tiếp tại{" "}
                <a href="/theory.mp4" className="underline">
                  /theory.mp4
                </a>
                .
              </video>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

