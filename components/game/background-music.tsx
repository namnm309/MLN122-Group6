"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackgroundMusic({
  audioSrc,
  shouldPlay,
  defaultEnabled = true,
}: {
  audioSrc: string;
  shouldPlay: boolean;
  defaultEnabled?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [userGestureNeeded, setUserGestureNeeded] = useState(false);
  const retriedOnceRef = useRef(false);

  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!enabled || !shouldPlay) return;

    try {
      // `play()` can be blocked by browser autoplay policy.
      await audio.play();
      setUserGestureNeeded(false);
      retriedOnceRef.current = false;
    } catch (err) {
      // Ask browser for user gesture.
      setUserGestureNeeded(true);
    }
  }, [enabled, shouldPlay]);

  useEffect(() => {
    // Create a single Audio instance for this component lifecycle.
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 1;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (!shouldPlay || !enabled) {
      audioRef.current.pause();
      setUserGestureNeeded(false);
      retriedOnceRef.current = false;
      return;
    }

    attemptPlay();
  }, [attemptPlay, enabled, shouldPlay]);

  useEffect(() => {
    if (!userGestureNeeded) return;
    if (!shouldPlay || !enabled) return;

    const unlock = () => {
      if (retriedOnceRef.current) return;
      retriedOnceRef.current = true;

      // Retry exactly once after the first user gesture.
      void attemptPlay().finally(() => {
        // If it still fails, user gesture is still required; keep icon enabled.
        setUserGestureNeeded(false);
      });
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [attemptPlay, enabled, shouldPlay, userGestureNeeded]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={enabled ? "Tắt nhạc" : "Bật nhạc"}
      title={enabled ? "Tắt nhạc" : "Bật nhạc"}
      className="fixed right-4 bottom-4 z-[60] rounded-full bg-background/70 hover:bg-background/90 border border-border/60 backdrop-blur"
      onClick={() => setEnabled((v) => !v)}
    >
      {enabled ? <Volume2 className="text-foreground" /> : <VolumeX className="text-foreground" />}
    </Button>
  );
}

