"use client";

import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

import { useInViewOnce } from "@/lib/use-in-view-once";
import { cn } from "@/lib/utils";

type RevealOwnProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delayMs?: number;
  rootMargin?: string;
  threshold?: number;
};

type RevealProps<T extends ElementType = "div"> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delayMs = 0,
  rootMargin,
  threshold,
  style,
  ...props
}: RevealProps<T>) {
  const { ref, isInView } = useInViewOnce<HTMLElement>({ rootMargin, threshold });
  const Component = (as ?? "div") as ElementType;
  const mergedStyle = {
    "--reveal-delay": `${delayMs}ms`,
    ...(style ?? {}),
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      data-reveal={isInView ? "visible" : "hidden"}
      className={cn("reveal", className)}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
