"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { FullPageSlide } from "@/components/landing/fullpage-slide";
import { KnowledgeQuiz } from "@/components/landing/knowledge-quiz";
import type { LandingSlide } from "@/components/landing/landing-slides";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Github, MessageSquare, Sparkles } from "lucide-react";

type FullPageDeckProps = {
  slides: LandingSlide[];
};

type QuizAiToolCard = {
  name: string;
  desc: string;
  accentBorder: string;
  iconFrame: string;
  iconColor: string;
  titleColor: string;
  Icon: LucideIcon;
};

const QUIZ_AI_SUPPORT_TOOLS: QuizAiToolCard[] = [
  {
    name: "ChatGPT",
    desc: "Soạn kịch bản, hook mở đầu và chỉnh lời dẫn — giúp video bài thuyết trình mạch lạc, dễ nghe.",
    accentBorder: "border-l-2 border-l-emerald-600/75 dark:border-l-emerald-400/65",
    iconFrame:
      "rounded-xl border border-emerald-600/35 bg-emerald-600/[0.07] dark:border-emerald-400/40 dark:bg-emerald-400/10",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    titleColor: "text-emerald-800 dark:text-emerald-200",
    Icon: MessageSquare,
  },
  {
    name: "GitHub Copilot",
    desc: "Hỗ trợ code nhanh cho web/ghi chú kèm media, snippet và refactor trong quy trình dựng video.",
    accentBorder: "border-l-2 border-l-violet-600/75 dark:border-l-violet-400/65",
    iconFrame:
      "rounded-xl border border-violet-600/35 bg-violet-600/[0.07] dark:border-violet-400/40 dark:bg-violet-400/10",
    iconColor: "text-violet-700 dark:text-violet-300",
    titleColor: "text-violet-800 dark:text-violet-200",
    Icon: Github,
  },
  {
    name: "NotebookLM",
    desc: "Tổng hợp tài liệu & slide, trích ý chính và gợi ý nguồn để làm nội dung cùng voice-over.",
    accentBorder: "border-l-2 border-l-sky-600/75 dark:border-l-sky-400/65",
    iconFrame:
      "rounded-xl border border-sky-600/35 bg-sky-600/[0.07] dark:border-sky-400/40 dark:bg-sky-400/10",
    iconColor: "text-sky-700 dark:text-sky-300",
    titleColor: "text-sky-900 dark:text-sky-200",
    Icon: BookOpen,
  },
];

function toDrivePreviewUrl(url: string) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("drive.google.com")) return null;

    // Patterns:
    // - https://drive.google.com/file/d/<id>/view?...
    // - https://drive.google.com/open?id=<id>
    // - https://drive.google.com/uc?id=<id>&export=download
    const pathMatch = u.pathname.match(/\/file\/d\/([^/]+)/);
    const id = pathMatch?.[1] ?? u.searchParams.get("id");
    if (!id) return null;

    return `https://drive.google.com/file/d/${id}/preview`;
  } catch {
    return null;
  }
}

function isEditableElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    tag === "button" ||
    tag === "a" ||
    target.isContentEditable
  );
}

export function FullPageDeck({ slides }: FullPageDeckProps) {
  const slideRefs = useMemo(
    () => slides.map(() => ({ current: null as HTMLElement | null })),
    [slides]
  );
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const didInitialSnapRef = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add("fullpageBody");
    document.documentElement.classList.add("fullpageHtml");
    return () => {
      document.body.classList.remove("fullpageBody");
      document.documentElement.classList.remove("fullpageHtml");
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const nextIndex = slideRefs.findIndex((ref) => ref.current === visibleEntry.target);
        if (nextIndex >= 0) setActiveIndex(nextIndex);
      },
      {
        threshold: [0.4, 0.6, 0.8],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    slideRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [isMobile, slideRefs]);

  // On first mount, force the scroll container to "snap" to the right slide immediately.
  // Without this, sometimes the initial position is slightly offset until the user scrolls.
  useEffect(() => {
    if (isMobile) return;
    if (didInitialSnapRef.current) return;
    didInitialSnapRef.current = true;

    const rawHash = window.location.hash.replace("#", "");
    const targetIndex = slides.findIndex((slide) => slide.id === rawHash);
    const idx = targetIndex >= 0 ? targetIndex : 0;

    // Update state for nav UI immediately.
    setActiveIndex((prev) => (prev === idx ? prev : idx));

    // Double rAF helps ensure layout/classes are applied before snapping.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slideRefs[idx]?.current?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    });
  }, [isMobile, slideRefs, slides]);

  useEffect(() => {
    const scrollToHash = (behavior: ScrollBehavior) => {
      const rawHash = window.location.hash.replace("#", "");
      if (!rawHash) return;

      const targetIndex = slides.findIndex((slide) => slide.id === rawHash);
      if (targetIndex < 0) return;

      slideRefs[targetIndex]?.current?.scrollIntoView({ behavior, block: "start" });
    };

    const syncHashScroll = () => scrollToHash("smooth");

    window.addEventListener("hashchange", syncHashScroll);
    return () => window.removeEventListener("hashchange", syncHashScroll);
  }, [slideRefs, slides]);

  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableElement(event.target)) return;

      const nextKeys = ["PageDown", "ArrowDown"];
      const prevKeys = ["PageUp", "ArrowUp"];
      const wantsNext = nextKeys.includes(event.key) || (event.key === " " && !event.shiftKey);
      const wantsPrev = prevKeys.includes(event.key) || (event.key === " " && event.shiftKey);

      if (!wantsNext && !wantsPrev) return;

      event.preventDefault();
      const targetIndex = wantsNext
        ? Math.min(activeIndex + 1, slides.length - 1)
        : Math.max(activeIndex - 1, 0);

      slideRefs[targetIndex]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isMobile, slideRefs, slides.length]);

  return (
    <>
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:flex flex-col gap-2">
        {slides.map((slide, index) => (
          <a
            key={slide.id}
            href={`#${slide.id}`}
            aria-label={slide.navLabel}
            title={slide.navLabel}
            className={cn(
              "group relative flex items-center justify-end gap-3 py-1 pl-6",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
            )}
          >
            <span
              className={cn(
                "pointer-events-none select-none",
                "max-w-0 overflow-hidden whitespace-nowrap",
                "rounded-full border border-border bg-background/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur",
                "opacity-0 translate-x-1 transition-all duration-200",
                "group-hover:max-w-[220px] group-hover:opacity-100 group-hover:translate-x-0",
                "group-focus-visible:max-w-[220px] group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                activeIndex === index && "border-primary/40 text-foreground"
              )}
            >
              {slide.navLabel}
            </span>

            <span
              className={cn(
                "h-3 w-3 rounded-full border-2 transition-all",
                activeIndex === index
                  ? "border-primary bg-primary scale-125 shadow-sm"
                  : "border-muted-foreground/40 bg-background/95 shadow-sm group-hover:border-primary/70"
              )}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>

      <div className="fixed left-6 right-6 top-[calc(76px+env(safe-area-inset-top))] z-40 flex items-center justify-between md:hidden">
        <div className="rounded-full border border-border bg-background/85 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
          {slides[activeIndex]?.navLabel}
        </div>
      </div>

      {slides.map((slide, index) => {
        const nextSlide = slides[index + 1];
        const previousSlide = slides[index - 1];
        const commonProps = {
          id: slide.id,
          index,
          total: slides.length,
          eyebrow: slide.eyebrow,
          title: slide.title,
          lead: slide.lead,
        };

        const navFooter = (
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-border/80 pt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <div>{previousSlide ? `Truoc: ${previousSlide.navLabel}` : "Bat dau"}</div>
            <div>{nextSlide ? `Tiep: ${nextSlide.navLabel}` : "Vao game"}</div>
          </div>
        );

        switch (slide.kind) {
          case "hero":
            return (
              <div
                key={slide.id}
                ref={(node) => {
                  slideRefs[index].current = node;
                }}
              >
                <FullPageSlide
                  {...commonProps}
                  accent={slide.accent}
                  actions={slide.actions}
                  className="relative"
                >
                  <div className="max-w-3xl border-t border-border/80 pt-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Cuộn theo nhịp slide để nắm bối cảnh, nguyên tắc và cách chơi mà không bị quá tải thông tin.
                    </p>
                    {navFooter}
                  </div>
                </FullPageSlide>
              </div>
            );

          case "video":
            return (
              <div
                key={slide.id}
                ref={(node) => {
                  slideRefs[index].current = node;
                }}
              >
                <FullPageSlide {...commonProps} actions={slide.actions}>
                  <div className="mx-auto w-full max-w-6xl">
                    <div className="overflow-hidden rounded-4xl border border-border bg-card/70 shadow-sm">
                      {(() => {
                        const drivePreviewUrl = toDrivePreviewUrl(slide.videoSrc);
                        return drivePreviewUrl ? (
                        <iframe
                          className="w-full h-[42dvh] sm:h-[52dvh] max-h-[560px] bg-black/5"
                          src={drivePreviewUrl}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          title={slide.title}
                        />
                        ) : (
                        <video
                          controls
                          preload="metadata"
                          playsInline
                          className="w-full bg-black/5 object-contain h-[42dvh] sm:h-[52dvh] max-h-[560px]"
                        >
                          <source src={slide.videoSrc} type="video/mp4" />
                        </video>
                        );
                      })()}
                    </div>

                    {slide.note ? (
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-center">
                        {slide.note}
                      </p>
                    ) : null}
                  </div>
                </FullPageSlide>
              </div>
            );

          case "content":
            return (
              <div
                key={slide.id}
                ref={(node) => {
                  slideRefs[index].current = node;
                }}
              >
                <FullPageSlide
                  {...commonProps}
                  actions={slide.actions}
                  childrenWrapperClassName={
                    slide.id === "noidung"
                      ? "mt-4"
                      : slide.id === "loiich" || slide.id === "nguyentac"
                        ? "mt-2"
                        : undefined
                  }
                  fullHeight={slide.id === "noidung" || slide.id === "loiich" || slide.id === "nguyentac" ? false : undefined}
                  childrenReveal={
                    slide.id === "noidung" || slide.id === "loiich" || slide.id === "nguyentac" ? false : undefined
                  }
                  headerTight={slide.id === "loiich" || slide.id === "nguyentac" ? true : undefined}
                  outerPaddingClassName={
                    slide.id === "noidung"
                      ? "pt-[calc(4.75rem+env(safe-area-inset-top))] sm:pt-20 pb-10 sm:pb-14"
                      : slide.id === "loiich" || slide.id === "nguyentac"
                        ? "pt-[calc(4.75rem+env(safe-area-inset-top))] sm:pt-20 pb-16 sm:pb-22"
                        : undefined
                  }
                  innerGapClassName={slide.id === "noidung" || slide.id === "loiich" || slide.id === "nguyentac" ? "gap-6" : undefined}
                >
                  <div
                    className={cn(
                      "grid gap-10 lg:grid-cols-[1.3fr_0.7fr]",
                      (slide.id === "noidung" || slide.id === "loiich" || slide.id === "nguyentac") && "gap-6"
                    )}
                  >
                    <div
                      className={cn(
                        "space-y-4",
                        (slide.id === "loiich" || slide.id === "nguyentac") && "space-y-3"
                      )}
                    >
                      {slide.bullets.map((bullet) => (
                        <div
                          key={`${slide.id}-${bullet.label ?? bullet.text}`}
                          className={cn(
                            "border-t border-border/70 pt-4",
                            (slide.id === "loiich" || slide.id === "nguyentac") && "pt-3"
                          )}
                        >
                          {bullet.label ? (
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                              {bullet.label}
                            </div>
                          ) : null}
                          <p
                            className={cn(
                              "mt-2 text-sm sm:text-base leading-relaxed text-foreground/90",
                              (slide.id === "loiich" || slide.id === "nguyentac") && "mt-1.5"
                            )}
                          >
                            {bullet.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div
                      className={cn(
                        "space-y-4",
                        (slide.id === "loiich" || slide.id === "nguyentac") && "space-y-3"
                      )}
                    >
                      {slide.asideTitle && slide.asideText ? (
                        <div className="border-l-2 border-primary/40 pl-4">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {slide.asideTitle}
                          </div>
                          <p
                            className={cn(
                              "mt-2 text-sm leading-relaxed text-muted-foreground",
                              (slide.id === "loiich" || slide.id === "nguyentac") && "mt-1.5"
                            )}
                          >
                            {slide.asideText}
                          </p>
                        </div>
                      ) : null}

                      {slide.formulas?.length ? (
                        <div className="space-y-3">
                          {slide.formulas.map((formula) => (
                            <div key={formula} className="rounded-2xl border border-border bg-card/65 px-4 py-3 font-mono text-sm text-foreground">
                              {formula}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </FullPageSlide>
              </div>
            );

          case "quiz":
            return (
              <div
                key={slide.id}
                ref={(node) => {
                  slideRefs[index].current = node;
                }}
              >
                <FullPageSlide {...commonProps}>
                  <div className="max-w-5xl space-y-8">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg">Bắt đầu làm quiz</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
                        <DialogHeader className="px-6 pt-6">
                          <DialogTitle>Củng cố kiến thức · QUIZ</DialogTitle>
                        </DialogHeader>
                        <div className="px-6 pb-6">
                          <KnowledgeQuiz className="border-0 p-0 bg-transparent max-h-[70dvh]" />
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="rounded-3xl border border-border bg-card/70 p-5 lg:col-span-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Bạn sẽ ôn gì
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground leading-relaxed">
                          <div className="rounded-2xl border border-border bg-background/30 p-4">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                              5.2
                            </div>
                            <div className="mt-1 font-semibold text-foreground">Hoàn thiện thể chế</div>
                            <div className="mt-1">
                              Khái niệm “luật chơi”, vì sao phải hoàn thiện và 5 mảng trọng tâm.
                            </div>
                          </div>
                          <div className="rounded-2xl border border-border bg-background/30 p-4">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                              5.3
                            </div>
                            <div className="mt-1 font-semibold text-foreground">Quan hệ lợi ích kinh tế</div>
                            <div className="mt-1">
                              Mặt thống nhất–mâu thuẫn và nguyên tắc điều hòa giữa các chủ thể.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-card/70 p-5 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                        <span
                          className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-primary sm:mx-0"
                          aria-hidden
                        >
                          <Sparkles className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1 text-center sm:text-left">
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Công cụ hỗ trợ
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Các công cụ AI nhóm dùng khi làm video cho bài thuyết trình
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {QUIZ_AI_SUPPORT_TOOLS.map((tool) => (
                          <div
                            key={tool.name}
                            className={cn(
                              "flex gap-3 rounded-2xl border border-border bg-background/30 p-4",
                              tool.accentBorder
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center",
                                tool.iconFrame
                              )}
                            >
                              <tool.Icon className={cn("h-5 w-5", tool.iconColor)} aria-hidden />
                            </div>
                            <div className="min-w-0">
                              <div className={cn("text-sm font-semibold tracking-tight", tool.titleColor)}>
                                {tool.name}
                              </div>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FullPageSlide>
              </div>
            );

          case "howtoSteps":
            return (
              <div
                key={slide.id}
                ref={(node) => {
                  slideRefs[index].current = node;
                }}
              >
                <FullPageSlide {...commonProps} actions={slide.actions}>
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {slide.steps.map((step) => (
                        <div key={`${slide.id}-${step.label}`} className="border-t border-border/70 pt-3">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                            {step.label}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{step.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-l-2 border-primary/40 pl-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Lưu ý
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{slide.note}</p>
                    </div>
                  </div>
                </FullPageSlide>
              </div>
            );

          case "howtoSummary":
            return (
              <div
                key={slide.id}
                ref={(node) => {
                  slideRefs[index].current = node;
                }}
              >
                <FullPageSlide {...commonProps} actions={slide.actions}>
                  <div className="grid gap-10 lg:grid-cols-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Bốn vai
                      </div>
                      <div className="mt-4 space-y-3">
                        {slide.roles.map((role) => (
                          <div key={`${slide.id}-${role.label}`} className="border-t border-border/70 pt-3">
                            <div className="text-sm font-semibold text-foreground">{role.label}</div>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{role.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Ba chỉ số chung
                      </div>
                      <div className="mt-4 space-y-3">
                        {slide.indicators.map((indicator) => (
                          <div key={`${slide.id}-${indicator.label}`} className="border-t border-border/70 pt-3">
                            <div className="text-sm font-semibold text-foreground">{indicator.label}</div>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{indicator.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FullPageSlide>
              </div>
            );
        }
      })}

      <footer className="fullpageSnapSection">
        <div className="h-full px-6 py-10 sm:py-12 flex">
          <div className="max-w-6xl mx-auto w-full flex items-center">
            <Reveal className="w-full rounded-4xl border border-border bg-card/75 px-6 py-6 sm:px-8 sm:py-7" delayMs={50}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Chuyen sang game
                  </div>
                  <h3 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                    Sẵn sàng bước vào vòng tranh luận thật?
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Tạo phòng hoặc tham gia phòng để trải nghiệm việc cân bằng tăng trưởng, công bằng và ổn định qua từng quyết định tập thể.
                  </p>
                </div>
                <Button asChild size="lg" className="sm:shrink-0">
                  <Link href="/game">Vào game</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </footer>
    </>
  );
}

