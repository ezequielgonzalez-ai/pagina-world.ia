import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AIAssistant } from "@/components/AIAssistant";
import { NewsletterPopup } from "@/components/NewsletterPopup";

// Font optimization with display swap for LCP
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://world-ia.vercel.app"),
  title: {
    default: "WORLD.IA | Tu Mundo de Inteligencia Artificial - Las Mejores Herramientas de IA",
    template: "%s | WORLD.IA",
  },
  description: "WORLD.IA es tu portal completo de Inteligencia Artificial. Descubre 6,367+ herramientas de IA, tienda de tecnología, cursos, rankings y todo lo que necesitas para dominar la IA. Directorio #1 en español.",
  keywords: [
    "WORLD.IA",
    "AI Tools",
    "Artificial Intelligence",
    "Herramientas de IA",
    "Inteligencia Artificial",
    "AI Directory",
    "ChatGPT",
    "Claude",
    "Midjourney",
    "DALL-E",
    "AI Image Generation",
    "AI Video",
    "AI Audio",
    "AI Coding",
    "AI Productivity",
    "Best AI Tools",
    "Cursos IA",
    "Tienda Tecnología",
    "Rankings IA",
  ],
  authors: [{ name: "WORLD.IA", url: "https://world-ia.vercel.app" }],
  creator: "Ezequiel Gonzalez",
  publisher: "WORLD.IA",
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
  icons: {
    icon: [
      { url: "/avatar.png", sizes: "32x32" },
      { url: "/avatar.png", sizes: "192x192" },
    ],
    apple: [{ url: "/avatar.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "WORLD.IA | Tu Mundo de Inteligencia Artificial",
    description: "El directorio más completo de IA. 6,367+ herramientas, tienda tech, cursos, rankings y más.",
    url: "https://world-ia.vercel.app",
    siteName: "WORLD.IA",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 1200,
        alt: "WORLD.IA - Tu Mundo de Inteligencia Artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WORLD.IA | Tu Mundo de Inteligencia Artificial",
    description: "6,367+ herramientas de IA, tienda tech, cursos y más.",
    images: ["/avatar.png"],
    creator: "@MGonzalez85598",
    site: "@MGonzalez85598",
  },
  alternates: {
    canonical: "https://world-ia.vercel.app",
    languages: {
      "en-US": "https://world-ia.vercel.app?lang=en",
      "es-ES": "https://world-ia.vercel.app?lang=es",
    },
  },
  category: "technology",
  classification: "AI Tools Directory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/avatar.png" fetchPriority="high" />
        
        {/* Theme script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch {}
            `,
          }}
        />
        
        {/* Google AdSense - loaded after interaction */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9430304865198789"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "WORLD.IA",
              description: "Tu Mundo de Inteligencia Artificial - Directorio #1 de IA",
              url: "https://world-ia.vercel.app",
              author: {
                "@type": "Organization",
                name: "WORLD.IA",
                url: "https://world-ia.vercel.app",
                logo: "https://world-ia.vercel.app/avatar.png",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://world-ia.vercel.app?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WORLD.IA",
              url: "https://world-ia.vercel.app",
              logo: "https://world-ia.vercel.app/avatar.png",
              sameAs: [
                "https://twitter.com/MGonzalez85598",
                "https://www.youtube.com/@MatíasEzequielGonzález-d4d6v",
                "https://www.linkedin.com/in/matiasezequielgonzalez/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen overflow-x-hidden`}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Saltar al contenido principal
        </a>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <LanguageProvider>
              {children}
              <AIAssistant />
              <NewsletterPopup />
              <Toaster />
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
