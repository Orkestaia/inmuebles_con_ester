"use client";

import { useSyncExternalStore } from "react";

export const CONSENT_KEY = "ice-cookie-consent";
export type ConsentState = "pending" | "accepted" | "rejected";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function read(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : "pending";
  } catch {
    return "pending";
  }
}

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "pending";
  return read();
}

function notify() {
  listeners.forEach((l) => l());
}

type Gtag = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: Gtag };
  w.dataLayer = w.dataLayer ?? [];
  if (typeof w.gtag === "function") w.gtag(...args);
  else w.dataLayer.push(args);
}

/** Google Consent Mode v2: actualiza los cuatro permisos a la vez. */
export function applyConsentMode(state: ConsentState) {
  const v = state === "accepted" ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: v,
    analytics_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });
}

export function setConsent(value: "accepted" | "rejected") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* almacenamiento bloqueado: el banner volverá a salir */
  }
  applyConsentMode(value);
  notify();
}

/** Reabre el banner para cambiar la decisión. */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* nada */
  }
  notify();
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => "pending");
}
