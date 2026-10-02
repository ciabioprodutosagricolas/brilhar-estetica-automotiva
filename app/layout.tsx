import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/anton/400.css";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilhar-estetica-automotiva.netlify.app";
const SITE_TITLE =
  "Brilhar Estética Automotiva | PPF e detalhamento em Rondonópolis";
const SITE_DESCRIPTION =
  "PPF, polimento técnico, vitrificação, higienização e lavagem detalhada em Rondonópolis. Cuidado profissional para todos os carros.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Brilhar Estética Automotiva",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Brilhar Estética Automotiva",
  keywords: [
    "estética automotiva em Rondonópolis",
    "PPF em Rondonópolis",
    "polimento técnico",
    "vitrificação automotiva",
    "lavagem detalhada",
    "higienização automotiva",
  ],
  creator: "Brilhar Estética Automotiva",
  publisher: "Brilhar Estética Automotiva",
  category: "Estética automotiva",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Brilhar Estética Automotiva",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/media/polimento.webp",
        width: 1536,
        height: 1024,
        alt: "Polimento profissional realizado pela Brilhar Estética Automotiva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/media/polimento.webp"],
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#071314",
  colorScheme: "light",
};

const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Brilhar Estética Automotiva",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/media/logo-brilhar.png`,
  image: [
    `${SITE_URL}/media/polimento.webp`,
    `${SITE_URL}/media/ppf-application.webp`,
    `${SITE_URL}/media/lavagem.jpg`,
  ],
  telephone: "+55 66 99691-9667",
  email: "brilharfinanceiro@gmail.com",
  areaServed: {
    "@type": "City",
    name: "Rondonópolis",
    containedInPlace: {
      "@type": "State",
      name: "Mato Grosso",
    },
  },
  sameAs: ["https://www.instagram.com/brilhar.estetica.automotiva/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de estética automotiva",
    itemListElement: [
      "PPF",
      "Polimento técnico",
      "Vitrificação automotiva",
      "Lavagem detalhada",
      "Higienização interna",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessStructuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
