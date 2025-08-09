import type { Metadata } from "next";
import { StackTheme } from "@stackframe/stack";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthStackProvider from "@/components/providers/StackProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import TrackClient from "@/components/providers/TrackClient";
import PWAClient from "@/components/providers/PWAClient";
import PWAInstallPrompt from "@/components/providers/PWAInstallPrompt";
import "./globals.css";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Smartslate",
  description: "Revolutionizing the way the World learns. Bridge the skills gap with SmartSlate's innovative learning solutions.",
  keywords: "learning, workforce development, skills training, AI education, LMS, corporate training",
  authors: [{ name: "SmartSlate Team" }],
  openGraph: {
    title: "SmartSlate - Build Your Future-Ready Workforce",
    description: "Revolutionizing the way the World learns.",
    type: "website",
    locale: "en_US",
    url: "https://smartslate.io",
    siteName: "SmartSlate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmartSlate - Build Your Future-Ready Workforce"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartSlate - Build Your Future-Ready Workforce",
    description: "Revolutionizing the way the World learns.",
    images: ["/og-image.png"]
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  themeColor: "#091521",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthStackProvider>
            <StackTheme>
              <ThemeProvider>
                <PWAInstallPrompt />
                <Header />
                <main className="main-content">
                  {children}
                </main>
                <Footer />
                <Suspense fallback={null}>
                  <TrackClient />
                  <PWAClient />
                  <PWAInstallPrompt />
                </Suspense>
              </ThemeProvider>
            </StackTheme>
          </AuthStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
