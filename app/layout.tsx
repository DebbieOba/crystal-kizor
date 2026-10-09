import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/components/layout/Analytics";
import { site } from "@/data/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${site.name} — Architect, Designer, Entrepreneur, Speaker & Researcher`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.seoDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.seoDescription,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.seoDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  width: "device-width",
  initialScale: 1,
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false,anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
