"use client";

import { useEffect, useRef, useCallback } from "react";

interface Props {
  siteKey: string;
  onVerify: (token: string) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          theme: string;
          language: string;
          size: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export default function TurnstileWidget({ siteKey, onVerify }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      theme: "dark",
      language: "he",
      size: "normal",
    });
  }, [siteKey, onVerify]);

  useEffect(() => {
    if (window.turnstile) {
      render();
      return;
    }

    window.onTurnstileLoad = render;

    if (!document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      window.onTurnstileLoad = undefined;
    };
  }, [render]);

  if (!siteKey) return null;

  return <div ref={containerRef} className="mt-2" />;
}
