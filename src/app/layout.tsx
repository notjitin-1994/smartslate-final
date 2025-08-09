import type { Metadata } from "next";
import { StackTheme } from "@stackframe/stack";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthStackProvider from "@/components/providers/StackProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import TrackClient from "@/components/providers/TrackClient";
import "./globals.css";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "SmartSlate - Build Your Future-Ready Workforce",
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
  icons: {
    icon: [{ url: "/logo-swirl.png?v=3", type: "image/png" }],
    apple: [{ url: "/logo-swirl.png?v=3" }],
    shortcut: [{ url: "/logo-swirl.png?v=3" }]
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
                <Header />
                <main className="main-content">
                  {children}
                </main>
                <Footer />
                <Suspense fallback={null}>
                  <TrackClient />
                </Suspense>
              </ThemeProvider>
            </StackTheme>
          </AuthStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
