import type { Metadata } from "next";
import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vieking.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VIE KING — Chaque tête mérite une couronne",
    template: "%s — VIE KING",
  },
  description:
    "VIE KING est une maison née en Martinique, au croisement de la mode de luxe, de l'art contemporain et du streetwear. Pas des casquettes. Des couronnes.",
  openGraph: {
    title: "VIE KING — Chaque tête mérite une couronne",
    description:
      "Une maison née en Martinique, au croisement de la mode de luxe, de l'art contemporain et du streetwear.",
    url: siteUrl,
    siteName: "VIE KING",
    images: ["/og-image.jpg"],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIE KING — Chaque tête mérite une couronne",
    description: "Pas des casquettes. Des couronnes.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
