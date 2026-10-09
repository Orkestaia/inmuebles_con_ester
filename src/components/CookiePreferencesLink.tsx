"use client";

import { resetConsent } from "@/lib/cookie-consent";

export function CookiePreferencesLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        resetConsent();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }}
      className={`underline underline-offset-2 ${className}`}
    >
      Cambiar mi decisión sobre las cookies
    </button>
  );
}
