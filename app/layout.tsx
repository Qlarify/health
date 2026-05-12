import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-instrument-serif",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-inter-tight",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital health platform for hospitals in India`,
    template: `%s · ${site.name}`,
  },
  description:
    "Qlarify Health is a digital health platform for hospitals in India — patient-journey strategy, healthcare analytics, AI in healthcare and patient insights for OPD growth.",
  applicationName: site.name,
  generator: undefined,
  authors: [{ name: site.name }],
  keywords: [
    "digital health platform",
    "healthcare marketing India",
    "patient acquisition hospitals",
    "healthcare analytics",
    "AI in healthcare",
    "hospital SEO",
    "YouTube for hospitals",
    "patient insights",
    "Bengaluru",
    "Mumbai",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Digital health platform for hospitals in India`,
    description:
      "Patient-journey strategy, healthcare analytics, AI in healthcare and patient insights — built exclusively for hospitals in India.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Digital health platform for hospitals in India`,
    description:
      "Patient-journey strategy, healthcare analytics, AI in healthcare and patient insights — built exclusively for hospitals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SkipLink />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
