import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple NPS, CSAT, and CES Surveys for Small Teams",
  description: "A lightweight feedback tool that lets startups and small businesses send branded NPS, CSAT, or CES surveys by email. No logins, no dashboards, just signal.",
  keywords: ["NPS", "CSAT", "CES", "surveys", "feedback", "startups", "small business", "customer experience", "email surveys"],
  authors: [{ name: "blank, dave" }],
  creator: "blank, dave",
  publisher: "Blank Digital Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blank-survey-waitlist.vercel.app",
    title: "Simple NPS, CSAT, and CES Surveys for Small Teams",
    description: "A lightweight feedback tool that lets startups and small businesses send branded NPS, CSAT, or CES surveys by email. No logins, no dashboards, just signal.",
    siteName: "Blank Survey",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Simple NPS, CSAT, and CES Surveys for Small Teams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple NPS, CSAT, and CES Surveys for Small Teams",
    description: "Send branded email surveys without the bloat. Built for indie founders and small businesses.",
    images: ["/og-image.svg"],
    creator: "@blankdigitalmedia",
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
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
