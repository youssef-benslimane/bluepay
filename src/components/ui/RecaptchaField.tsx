"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function isRecaptchaEnabled(): boolean {
  return Boolean(RECAPTCHA_SITE_KEY);
}

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; theme?: "light" | "dark"; hl?: string }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      ready: (callback: () => void) => void;
    };
    ___recaptchaOnLoad?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    window.___recaptchaOnLoad = () => resolve();
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=___recaptchaOnLoad&render=explicit&hl=fr";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Impossible de charger reCAPTCHA"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export interface RecaptchaFieldRef {
  getToken: () => string;
  reset: () => void;
}

interface RecaptchaFieldProps {
  className?: string;
}

export const RecaptchaField = forwardRef<RecaptchaFieldRef, RecaptchaFieldProps>(
  function RecaptchaField({ className }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      getToken: () => {
        if (!window.grecaptcha || widgetIdRef.current === null) return "";
        return window.grecaptcha.getResponse(widgetIdRef.current);
      },
      reset: () => {
        if (!window.grecaptcha || widgetIdRef.current === null) return;
        window.grecaptcha.reset(widgetIdRef.current);
      },
    }));

    useEffect(() => {
      if (!isRecaptchaEnabled() || !containerRef.current) return;

      let cancelled = false;

      loadRecaptchaScript()
        .then(() => {
          if (cancelled || !containerRef.current || !window.grecaptcha) return;

          window.grecaptcha.ready(() => {
            if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;

            widgetIdRef.current = window.grecaptcha!.render(containerRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              theme: "light",
              hl: "fr",
            });
          });
        })
        .catch(() => {
          if (!cancelled) setLoadError("Impossible de charger la vérification de sécurité.");
        });

      return () => {
        cancelled = true;
        widgetIdRef.current = null;
      };
    }, []);

    if (!isRecaptchaEnabled()) return null;

    if (loadError) {
      return <p className="text-sm text-error">{loadError}</p>;
    }

    return <div ref={containerRef} className={className} />;
  }
);
