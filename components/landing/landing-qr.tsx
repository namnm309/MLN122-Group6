"use client";

import { useEffect, useMemo, useState } from "react";
import * as QRCode from "qrcode";

import { cn } from "@/lib/utils";

type LandingQrProps = {
  className?: string;
  /**
   * Optional override for the QR target URL.
   * If omitted, uses NEXT_PUBLIC_SITE_URL or current origin.
   */
  href?: string;
};

export function LandingQr({ className, href }: LandingQrProps) {
  const targetUrl = useMemo(() => {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (href) return href;
    if (envUrl) return envUrl;
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  }, [href]);

  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    if (!targetUrl) return;

    QRCode.toDataURL(targetUrl, {
      width: 196,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0b1b0f", light: "#ffffff" },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setDataUrl("");
      });

    return () => {
      cancelled = true;
    };
  }, [targetUrl]);

  if (!dataUrl) return null;

  return (
    <div
      className={cn(
        "pointer-events-auto select-none",
        "rounded-2xl border border-border bg-background/90 p-3 shadow-sm backdrop-blur",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <img
          src={dataUrl}
          alt="QR vào trang web"
          className="h-[92px] w-[92px] rounded-xl border border-border bg-white"
        />
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Quét để vào web
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">MLN-122 Group 6</div>
          <div className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground">{targetUrl}</div>
        </div>
      </div>
    </div>
  );
}

