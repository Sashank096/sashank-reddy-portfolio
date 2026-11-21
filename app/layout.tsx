import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import SearchPalette from "@/components/SearchPalette";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: `Portfolio of ${site.name}, ${site.tagline}. ${site.support}`,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    title: `${site.name} | ${site.tagline}`,
    description: `Portfolio of ${site.name}, ${site.tagline}. ${site.support}`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: `Portfolio of ${site.name}, ${site.tagline}. ${site.support}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){var t;try{t=localStorage.getItem('theme')}catch{}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#07060A':'#FAF7F5'})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#07060A" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Navbar />
        <SmoothScroll />
        <main id="main">{children}</main>
        <Footer />
        <SearchPalette />
      </body>
    </html>
  );
}
