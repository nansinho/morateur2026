'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getConsentForCategory } from '@/lib/cookie-consent'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export default function AnalyticsScripts() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false)
  const [marketingAllowed, setMarketingAllowed] = useState(false)

  useEffect(() => {
    // Check current consent on mount
    setAnalyticsAllowed(getConsentForCategory('analytics'))
    setMarketingAllowed(getConsentForCategory('marketing'))

    // Listen for consent changes
    const handleConsentUpdate = () => {
      setAnalyticsAllowed(getConsentForCategory('analytics'))
      setMarketingAllowed(getConsentForCategory('marketing'))
    }
    window.addEventListener('consent-updated', handleConsentUpdate)
    return () => window.removeEventListener('consent-updated', handleConsentUpdate)
  }, [])

  return (
    <>
      {/* Google Analytics 4 — only loaded with analytics consent */}
      {GA_MEASUREMENT_ID && analyticsAllowed && (
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
                anonymize_ip: true,
              });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel (Facebook) — only loaded with marketing consent */}
      {META_PIXEL_ID && marketingAllowed && (
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
