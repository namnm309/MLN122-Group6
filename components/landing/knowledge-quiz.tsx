"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { KnowledgeQuizQuestion } from "@/lib/knowledge-quiz";
import { knowledgeQuizQuestions } from "@/lib/knowledge-quiz";
import { cn } from "@/lib/utils";

function shuffle<T>(items: readonly T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const LABELS = ["A", "B", "C", "D"] as const;

export function KnowledgeQuiz({ className, count = 10 }: { className?: string; count?: number }) {
  const questionBank = useMemo(() => knowledgeQuizQuestions.slice(0, count), [count]);

  const [questions, setQuestions] = useState<KnowledgeQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = questions[currentIndex];
  const isAnswered = selectedIndex !== null;
  const isCorrect = isAnswered && current ? selectedIndex === current.correctIndex : false;

  const reset = useCallback(() => {
    const next = shuffle(questionBank);
    setQuestions(next);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
  }, [questionBank]);

  useEffect(() => {
    reset();
  }, [reset]);

  const total = questions.length || questionBank.length;
  const isDone = questions.length > 0 && currentIndex >= questions.length;

  if (!questions.length) return null;

  if (isDone) {
    return (
      <div className={cn("rounded-3xl border border-border bg-card p-6 sm:p-8", className)}>
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kết quả</div>
        <div className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
          Bạn đúng <span className="text-primary">{score}</span> / {total} câu
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button size="lg" variant="outline" asChild>
            <a href="#howto-flow">Sang hướng dẫn chơi</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8",
        "flex flex-col",
        "max-h-[70dvh]",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mt-2 text-lg sm:text-xl font-extrabold">
              Câu {currentIndex + 1} / {total}
            </div>
          </div>
          <div className="shrink-0 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-mono text-muted-foreground">
            Điểm: {score}/{total}
          </div>
        </div>

        <div className="mt-5 text-base sm:text-lg font-semibold text-foreground leading-relaxed">
          {current.question}
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.choices.map((choice, idx) => {
            const selected = selectedIndex === idx;
            const correct = idx === current.correctIndex;

            const showState = isAnswered;
            const isCorrectPick = showState && selected && correct;
            const isWrongPick = showState && selected && !correct;
            const isCorrectAnswer = showState && !selected && correct;

            return (
              <button
                key={`${current.id}-${idx}`}
                type="button"
                disabled={isAnswered}
                onClick={() => {
                  if (isAnswered) return;
                  setSelectedIndex(idx);
                  if (idx === current.correctIndex) setScore((s) => s + 1);
                }}
                className={cn(
                  "text-left rounded-2xl border px-4 py-3 transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isAnswered ? "cursor-not-allowed" : "hover:bg-secondary",
                  !showState && "border-border bg-background/40",
                  isCorrectPick && "border-primary/60 bg-primary/10",
                  isWrongPick && "border-destructive/60 bg-destructive/10",
                  isCorrectAnswer && "border-primary/35 bg-background/40"
                )}
                aria-pressed={selected}
                aria-label={`${LABELS[idx]}: ${choice}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 h-8 w-8 shrink-0 rounded-xl border flex items-center justify-center font-mono font-extrabold text-sm",
                      !showState && "border-border bg-card text-muted-foreground",
                      isCorrectPick && "border-primary/60 bg-primary/10 text-primary",
                      isWrongPick && "border-destructive/60 bg-destructive/10 text-destructive",
                      isCorrectAnswer && "border-primary/35 bg-card text-primary"
                    )}
                    aria-hidden="true"
                  >
                    {LABELS[idx]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base text-foreground leading-relaxed">{choice}</div>
                    {isCorrectAnswer && <div className="mt-1 text-xs text-primary font-semibold">Đáp án đúng</div>}
                    {isWrongPick && <div className="mt-1 text-xs text-destructive font-semibold">Bạn chọn sai</div>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            className={cn(
              "mt-5 rounded-2xl border p-4 text-sm leading-relaxed",
              isCorrect ? "border-primary/40 bg-primary/10" : "border-destructive/40 bg-destructive/10"
            )}
            role="status"
            aria-live="polite"
          >
            <div className={cn("font-semibold", isCorrect ? "text-primary" : "text-destructive")}>
              {isCorrect ? "Chính xác" : "Chưa đúng"}
            </div>
            <div className="mt-1 text-muted-foreground">{current.explanation}</div>
          </div>
        )}

        <div className="h-4" />
      </div>

      <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
        <Button
          size="lg"
          disabled={!isAnswered}
          onClick={() => {
            if (!isAnswered) return;
            setSelectedIndex(null);
            setCurrentIndex((i) => i + 1);
          }}
          className="sm:w-auto"
        >
          Câu tiếp theo
        </Button>
      </div>
    </div>
  );
}

