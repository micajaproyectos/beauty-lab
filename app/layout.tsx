import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
