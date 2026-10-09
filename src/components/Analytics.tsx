"use client";

import Script from "next/script";
import { useEffect } from "react";
import { applyConsentMode, useConsent } from "@/lib/cookie-consent";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/**
 * Carga GA4 y el píxel de Meta SOLO después de aceptar cookies.
 * Antes de aceptar no se hace ninguna petición a Google ni a Meta.
 * Consent Mode v2 arranca en "denied" y se actualiza al aceptar.
 */
export function Analytics() {
  const consent = useConsent();
  const enabled = consent === "accepted";

  useEffect(() => {
    if (consent !== "pending") applyConsentMode(consent);
  }, [consent]);

  if (!enabled) return null;

  return (
    <>
      {GA4_ID && (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
gtag('js',new Date());gtag('config','${GA4_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

/** Dispara el evento Lead en píxel y GA4 con el mismo event_id que recibe n8n (CAPI). */
export function trackLead(eventId: string, origen: string) {
  const w = window as unknown as { fbq?: Fbq; gtag?: Gtag };
  try {
    w.fbq?.("track", "Lead", { content_name: origen }, { eventID: eventId });
  } catch {
    /* sin píxel */
  }
  try {
    w.gtag?.("event", "generate_lead", { origen, event_id: eventId });
  } catch {
    /* sin GA4 */
  }
}

/** Clic en WhatsApp: métrica secundaria. */
export function trackWhatsApp(lugar: string) {
  const w = window as unknown as { fbq?: Fbq; gtag?: Gtag };
  try {
    w.fbq?.("track", "Contact", { content_name: lugar });
  } catch {
    /* sin píxel */
  }
  try {
    w.gtag?.("event", "whatsapp_click", { lugar });
  } catch {
    /* sin GA4 */
  }
}

function readCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** _fbp/_fbc solo si el usuario ha aceptado cookies de marketing. */
export function metaBrowserIds(): { fbp?: string; fbc?: string } {
  return { fbp: readCookie("_fbp"), fbc: readCookie("_fbc") };
}
