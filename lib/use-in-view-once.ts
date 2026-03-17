"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOnceOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useInViewOnce<T extends HTMLElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
}: UseInViewOnceOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsInView(true);
        observer.disconnect();
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, isInView };
}
