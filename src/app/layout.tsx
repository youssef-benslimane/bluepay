import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BluePay — Logiciel de Paie Marocain",
    template: "%s | BluePay",
  },
  description:
    "BluePay est la solution SaaS de gestion de la paie conçue pour les entreprises marocaines. Automatisez vos bulletins de paie, CNSS, AMO et IR en toute conformité.",
  keywords: [
    "logiciel paie maroc",
    "paie marocaine",
    "gestion paie PME maroc",
    "CNSS AMO IR maroc",
    "solution RH maroc",
    "bulletin de paie",
    "SaaS RH",
  ],
  authors: [{ name: "BluePay", url: "https://bluepay.ma" }],
  creator: "BluePay",
  metadataBase: new URL("https://bluepay.ma"),
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://bluepay.ma",
    siteName: "BluePay",
    title: "BluePay — Logiciel de Paie Marocain",
    description:
      "Solution SaaS de gestion de la paie conçue pour les entreprises marocaines. CNSS, AMO, IR automatisés.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "BluePay — Logiciel de Paie Marocain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BluePay — Logiciel de Paie Marocain",
    description:
      "Solution SaaS de gestion de la paie conçue pour les entreprises marocaines.",
    images: ["/og/home.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
