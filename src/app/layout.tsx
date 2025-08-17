import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import TrackClient from "@/components/providers/TrackClient";
import PWAClient from "@/components/providers/PWAClient";
import OAuthCodeRouter from "@/components/providers/OAuthCodeRouter";
import WaitlistModal from "@/components/ui/WaitlistModal";
import "./globals.css";
import { Suspense } from "react";


export const metadata: Metadata = {
  metadataBase: new URL('https://smartslate.io'),
  title: {
    default: "Smartslate — Build Your Future-Ready Workforce",
    template: "%s | Smartslate",
  },
  description: "Revolutionizing the way the World learns. Bridge the skills gap with Smartslate's innovative learning solutions.",
  keywords: "learning, workforce development, skills training, AI education, LMS, corporate training",
  authors: [{ name: "Smartslate Team" }],
  openGraph: {
    title: "Smartslate — Build Your Future-Ready Workforce",
    description: "Revolutionizing the way the World learns.",
    type: "website",
    locale: "en_US",
    url: "https://smartslate.io",
    siteName: "Smartslate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smartslate — Build Your Future-Ready Workforce"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Smartslate — Build Your Future-Ready Workforce",
    description: "Revolutionizing the way the World learns.",
    images: ["/og-image.png"]
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Smartslate',
  },
  other: {
    'msapplication-TileColor': '#091521',
    'msapplication-TileImage': '/images/courses/swirl.png?v=favicon4',
  },
  icons: {
    icon: [
      { url: "/images/courses/swirl.png?v=favicon4", type: "image/png", sizes: "16x16" },
      { url: "/images/courses/swirl.png?v=favicon4", type: "image/png", sizes: "32x32" },
      { url: "/images/courses/swirl.png?v=favicon4", type: "image/png", sizes: "192x192" },
      { url: "/images/courses/swirl.png?v=favicon4", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/images/courses/swirl.png?v=favicon4" }
    ],
    shortcut: [
      { url: "/images/courses/swirl.png?v=favicon4" }
    ]
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#091521',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
            <Suspense fallback={null}>
              <TrackClient />
              <PWAClient />
              <OAuthCodeRouter />
            </Suspense>
            <WaitlistModal />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
