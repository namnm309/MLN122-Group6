"use client";

import { FullPageDeck } from "@/components/landing/fullpage-deck";
import { landingSlides } from "@/components/landing/landing-slides";
import { LandingQr } from "@/components/landing/landing-qr";

export function LandingShell() {
  return (
    <main className="bg-background text-foreground">
      <FullPageDeck slides={landingSlides} />

      <div className="pointer-events-none fixed bottom-5 left-5 z-50 hidden md:block">
        <LandingQr />
      </div>
    </main>
  );
}

