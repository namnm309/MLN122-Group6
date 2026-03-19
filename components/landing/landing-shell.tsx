"use client";

import { useState } from "react";

import { FullPageDeck } from "@/components/landing/fullpage-deck";
import { landingSlides } from "@/components/landing/landing-slides";
import { LandingQr } from "@/components/landing/landing-qr";

export function LandingShell() {
  const [showQr, setShowQr] = useState(true);

  return (
    <main className="bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto border-b border-border bg-background/85 shadow-sm backdrop-blur">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Chủ đề thuyết trình
                </div>
                <div className="mt-1 text-base sm:text-lg font-bold text-foreground leading-snug">
                  Chương 5: Kinh tế thị trường định hướng xã hội chủ nghĩa và các quan hệ lợi ích kinh tế ở Việt Nam
                </div>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-card text-sm font-semibold text-foreground">
                  Nhóm 6
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <FullPageDeck slides={landingSlides} />

      <div className="fixed bottom-5 left-5 z-50 hidden md:flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={() => setShowQr((prev) => !prev)}
          className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-border bg-background/90 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary shadow-sm transition-colors"
        >
          {showQr ? "Ẩn mã QR" : "Hiện mã QR"}
        </button>
        {showQr && (
          <div className="pointer-events-auto">
            <LandingQr />
          </div>
        )}
      </div>
    </main>
  );
}

