"use client";

import { FullPageDeck } from "@/components/landing/fullpage-deck";
import { landingSlides } from "@/components/landing/landing-slides";

export function LandingShell() {
  return (
    <main className="bg-background text-foreground">
      <FullPageDeck slides={landingSlides} />
    </main>
  );
}

