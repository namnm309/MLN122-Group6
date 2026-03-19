"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SlideAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type FullPageSlideProps = {
  id: string;
  index: number;
  total: number;
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  actions?: SlideAction[];
  children?: ReactNode;
  className?: string;
};

export function FullPageSlide({
  id,
  index,
  total,
  eyebrow,
  title,
  accent,
  lead,
  actions,
  children,
  className,
}: FullPageSlideProps) {
  return (
    <section id={id} className={cn("fullpageSnapSection scroll-mt-24", className)}>
      <div className="h-full px-4 sm:px-6 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pt-24 pb-10 flex">
        <div className="max-w-6xl mx-auto w-full flex flex-col justify-between gap-8">
          <div>
            <Reveal className="flex items-center justify-between gap-4" delayMs={10}>
              {eyebrow ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {eyebrow}
                </div>
              ) : (
                <div />
              )}
            </Reveal>

            <Reveal delayMs={40} className="mt-6 max-w-5xl">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] text-balance">
                {title}
                {accent ? <span className="block text-primary">{accent}</span> : null}
              </h2>
            </Reveal>

            <Reveal delayMs={70} className="mt-5 max-w-3xl">
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
                {lead}
              </p>
            </Reveal>

            {actions?.length ? (
              <Reveal delayMs={90} className="mt-6 flex flex-col sm:flex-row gap-3">
                {actions.map((action) => {
                  const isPrimary = action.variant !== "secondary";
                  return (
                    <Button
                      key={`${id}-${action.href}-${action.label}`}
                      asChild
                      size="lg"
                      variant={isPrimary ? "default" : "outline"}
                      className={cn(!isPrimary && "bg-transparent")}
                    >
                      {action.href.startsWith("/") ? (
                        <Link href={action.href}>{action.label}</Link>
                      ) : (
                        <a href={action.href}>{action.label}</a>
                      )}
                    </Button>
                  );
                })}
              </Reveal>
            ) : null}

            {children ? (
              <Reveal delayMs={110} className="mt-10">
                {children}
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

