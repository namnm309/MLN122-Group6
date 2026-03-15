"use client";

import { Indicators } from "@/lib/game-data";

interface IndicatorBarProps {
  indicators: Indicators;
  showLabels?: boolean;
}

const INDICATOR_CONFIG = [
  {
    key: "growth" as keyof Indicators,
    label: "Tăng trưởng kinh tế",
    shortLabel: "Tăng trưởng",
    colorClass: "bg-indicator-growth",
    textClass: "text-indicator-growth",
    icon: "📈",
  },
  {
    key: "equity" as keyof Indicators,
    label: "Công bằng xã hội",
    shortLabel: "Công bằng",
    colorClass: "bg-indicator-equity",
    textClass: "text-indicator-equity",
    icon: "⚖️",
  },
  {
    key: "stability" as keyof Indicators,
    label: "Ổn định thị trường",
    shortLabel: "Ổn định",
    colorClass: "bg-indicator-stability",
    textClass: "text-indicator-stability",
    icon: "📊",
  },
];

export function IndicatorBar({ indicators, showLabels = false }: IndicatorBarProps) {
  return (
    <div className="flex gap-3 w-full">
      {INDICATOR_CONFIG.map((ind) => {
        const value = indicators[ind.key];
        const pct = (value / 10) * 100;
        return (
          <div key={ind.key} className="flex-1 flex flex-col gap-1">
            {showLabels && (
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium ${ind.textClass} flex items-center gap-1`}>
                  <span aria-hidden="true">{ind.icon}</span>
                  <span className="hidden sm:inline">{ind.label}</span>
                  <span className="sm:hidden">{ind.shortLabel}</span>
                </span>
                <span className="text-muted-foreground font-mono">{value}/10</span>
              </div>
            )}
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${ind.colorClass}`}
                style={{ width: `${pct}%` }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={10}
                aria-label={ind.label}
              />
            </div>
            {!showLabels && (
              <span className={`text-xs ${ind.textClass} text-center`}>
                {ind.shortLabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface IndicatorDeltaProps {
  effect: { growth: number; equity: number; stability: number };
}

export function IndicatorDelta({ effect }: IndicatorDeltaProps) {
  return (
    <div className="flex gap-3">
      {INDICATOR_CONFIG.map((ind) => {
        const delta = effect[ind.key];
        if (delta === 0) return null;
        return (
          <span
            key={ind.key}
            className={`text-xs font-mono font-bold ${
              delta > 0 ? "text-indicator-equity" : "text-destructive"
            }`}
          >
            {ind.shortLabel}: {delta > 0 ? "+" : ""}
            {delta}
          </span>
        );
      })}
    </div>
  );
}
