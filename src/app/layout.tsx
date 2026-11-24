import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@/components/site/analytics"
import { CookieConsent } from "@/components/site/cookie-consent"
import { LeadPopup } from "@/components/lead-popup/lead-popup"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { ThemeProvider } from "@/components/site/theme-provider"
import { JsonLd } from "@/components/seo/json-ld"
import { organizationJsonLd, rootMetadata, websiteJsonLd } from "@/lib/seo"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata = rootMetadata

const themeInit = `(function(){try{var k='hushlane-theme';var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(t);e.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Analytics />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <LeadPopup />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
