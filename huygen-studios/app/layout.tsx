import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import "./globals.css";


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
  metadataBase: new URL("https://huygenstudios.com"),
  title: {
    default: "Huygen Studios | Premium AI Automation & Web Agency",
    template: "%s | Huygen Studios",
  },
  description:
    "Huygen Studios is the premier agency for elite AI automation, voice agents, and cinematic web experiences. We transform operational bottlenecks into intelligent, automated systems for forward-thinking businesses.",
  keywords: [
    "Huygen Studios",
    "premium AI automation agency",
    "AI voice agents",
    "outbound AI calling",
    "WhatsApp chat automation",
    "automated lead capture systems",
    "cinematic web services",
    "premium web development",
    "drop-in business automation",
    "SEO & growth agency",
    "high-end video editing",
    "creative digital experiences",
    "AI lead qualification",
    "business operating systems",
    "custom AI infrastructure",
    "AI customer service",
    "AI chatbots",
    "intelligent automation",
    "B2B AI solutions",
    "machine learning integration",
    "workflow automation",
    "digital transformation",
    "award-winning web design",
    "Next.js web development",
    "custom software development",
    "generative AI consulting",
    "LLM integration",
    "AI-powered SEO",
    "marketing automation",
    "conversion rate optimization",
    "UI/UX design",
    "branding and identity",
    "3D web experiences",
    "WebGL development",
    "React development agency",
    "SaaS development",
    "enterprise AI",
    "business intelligence",
    "data-driven growth",
    "AI sales assistants"
  ],
  authors: [{ name: "Huygen Studios", url: "https://huygenstudios.com" }],
  creator: "Huygen Studios",
  publisher: "Huygen Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Huygen Studios | Premium AI Automation & Web Agency",
    description:
      "Huygen Studios is the premier agency for elite AI automation, voice agents, and cinematic web experiences. Transform your business today.",
    url: "https://huygenstudios.com",
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
  verification: {
    google: "add-your-google-site-verification-here", // REPLACE with actual tag
  },
  other: {
    "google-adsense-account": "ca-pub-1790543418739606",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Huygen Studios",
  url: "https://huygenstudios.com",
  logo: "https://huygenstudios.com/skiper76.png",
  description: "Premium agency for AI automation, voice agents, and cinematic web experiences.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9262102440",
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
        <meta name="google-adsense-account" content="ca-pub-1790543418739606" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body text-white bg-[#050505]">
        {children}
        <Footer />
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
