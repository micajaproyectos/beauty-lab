import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./components/Providers";

const GA4_ID = "G-FXBYJSLEQG";
const GADS_ID = "AW-18082765966";

export { GA4_ID, GADS_ID };

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Beauty Lab — Estética Facial Premium",
  description:
    "Tratamientos de estética facial premium. Ciencia y ritual al servicio de tu piel.",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "YnpAh1qZljA8gvXmIXiyqk14epfgymePQFSzrmDdSj4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google tag (gtag.js) — carga GA4 + Google Ads con un solo script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}');
            gtag('config', '${GADS_ID}');
          `}
        </Script>
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
