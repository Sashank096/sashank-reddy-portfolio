import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchPalette from "@/components/SearchPalette";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: `Portfolio of ${site.name}, ${site.tagline}. ${site.support}`,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c14" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <SearchPalette />
      </body>
    </html>
  );
}
