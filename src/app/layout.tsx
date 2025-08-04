import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
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
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
