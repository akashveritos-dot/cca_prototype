import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Climate Carbon Alliance India (CCAI)",
    template: "%s | Climate Carbon Alliance India",
  },
  description:
    "Accelerating India's transition to Net Zero through high-integrity carbon markets and high-permanence carbon dioxide removal (CDR) ecosystems.",
  keywords: [
    "Carbon Removal India",
    "Carbon Markets India",
    "CDR India",
    "Biochar India",
    "CCTS India",
    "Green Credit Programme",
    "Climate Change India",
    "Net Zero India",
  ],
  authors: [{ name: "Climate Carbon Alliance India" }],
  creator: "Climate Carbon Alliance India",
  metadataBase: new URL("https://climatecarbonalliance.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://climatecarbonalliance.in",
    title: "Climate Carbon Alliance India (CCAI)",
    description:
      "Accelerating India's transition to Net Zero through high-integrity carbon markets and high-permanence carbon dioxide removal (CDR) ecosystems.",
    siteName: "Climate Carbon Alliance India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Climate Carbon Alliance India (CCAI)",
    description:
      "Accelerating India's transition to Net Zero through high-integrity carbon markets and high-permanence carbon dioxide removal (CDR) ecosystems.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf1f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1e2230" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-brand-primary/20"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
