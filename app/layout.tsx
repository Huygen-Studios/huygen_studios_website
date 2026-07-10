import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/components/web3/web3.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.huygenstudios.com"),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
  title: {
    default: "Huygen Studios | Premium AI Automation & Web Agency",
    template: "%s | Huygen Studios",
  },
  description:
    "Huygen Studios is a technology and creative studio specialising in enterprise AI automation, voice systems, and cinematic web interfaces. We build custom AI calling agents, WhatsApp automations, and premium web experiences.",
  keywords: [
    "AI automation agency",
    "AI voice agents",
    "WhatsApp automation",
    "cinematic web development",
    "enterprise AI integration",
    "Next.js development agency",
  ],
  authors: [{ name: "Huygen Studios", url: "https://www.huygenstudios.com" }],
  creator: "Huygen Studios",
  publisher: "Huygen Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Huygen Studios | Premium AI Automation & Web Agency",
    description:
      "Huygen Studios is the premier agency for elite AI automation, voice agents, and cinematic web experiences. Transform your business today.",
    url: "https://www.huygenstudios.com",
    siteName: "Huygen Studios",
    images: [
      {
        url: "/skiper76_2.png",
        width: 1200,
        height: 630,
        alt: "Huygen Studios - AI Automation & Web Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huygen Studios | Premium AI Automation & Web Agency",
    description:
      "Huygen Studios is the premier agency for elite AI automation, voice agents, and cinematic web experiences.",
    images: ["/skiper76_2.png"],
    creator: "@huygenstudios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  other: {
    "google-adsense-account": "ca-pub-1790543418739606",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Huygen Studios",
  url: "https://www.huygenstudios.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.huygenstudios.com/android-chrome-512x512.png",
    width: 512,
    height: 512,
  },
  description: "Technology and creative studio specialising in enterprise AI automation, voice systems, and cinematic web interfaces.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@huygenstudios.com",
    availableLanguage: ["English"]
  },
  sameAs: [
    "https://twitter.com/huygenstudios",
    "https://linkedin.com/company/huygen-studios"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Prevent Dark Reader extension from causing hydration errors */}
        <meta name="color-scheme" content="dark" />
        <meta name="darkreader-lock" />
        {/* RSS feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Huygen Studios Blog" href="https://www.huygenstudios.com/rss.xml" />
        <Script
          id="js-enabled-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-enabled');`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body text-white bg-[#050505]" suppressHydrationWarning>
        {children}
        {googleAnalyticsId ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
