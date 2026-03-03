'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { getConsent, CONSENT_EVENT } from '@/lib/cookie-consent'
import type { ConsentState } from '@/lib/cookie-consent'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export default function AnalyticsScripts() {
  const [consent, setConsentState] = useState<ConsentState | null>(null)

  useEffect(() => {
    setConsentState(getConsent())

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail
      setConsentState(detail)
    }

    window.addEventListener(CONSENT_EVENT, handler)
    return () => window.removeEventListener(CONSENT_EVENT, handler)
  }, [])

  return (
    <>
      {/* Google Analytics 4 — only if analytics consent given */}
      {GA_MEASUREMENT_ID && consent?.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel (Facebook) — only if marketing consent given */}
      {META_PIXEL_ID && consent?.marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}
