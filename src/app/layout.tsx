import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import SplashScreen from "@/components/brand/SplashScreen";
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
    default: "DCRF - Disaster & Climate Resilience Federation",
    template: "%s | DCRF",
  },
  description:
    "A joint-venture federation of TCU Impact Foundation (TCUIF) and DiCAF, uniting corporates, NGOs, academia, government and experts to advance disaster preparedness, climate resilience and sustainable development across India.",
  keywords: [
    "Disaster Management India",
    "Climate Resilience",
    "Disaster Preparedness",
    "Climate Action India",
    "Disaster Tech",
    "Geospatial Technology",
    "Climate Finance",
    "Disaster Risk Assessment",
    "TCUIF",
    "DiCAF",
    "disastersnews.com",
  ],
  authors: [{ name: "Disaster & Climate Resilience Federation" }],
  creator: "Disaster & Climate Resilience Federation",
  metadataBase: new URL("https://dcrf.org.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dcrf.org.in",
    title: "DCRF - Disaster & Climate Resilience Federation",
    description:
      "Uniting India for Disaster Resilience & Climate Action. A national federation advancing disaster preparedness and climate resilience.",
    siteName: "Disaster & Climate Resilience Federation",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCRF - Disaster & Climate Resilience Federation",
    description:
      "Uniting India for Disaster Resilience & Climate Action. A national federation advancing disaster preparedness and climate resilience.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e6e9ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2530" },
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
          <SplashScreen>
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
          </SplashScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}
