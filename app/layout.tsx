import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhahrr.com"),
  title: {
    default: "MHAHRR Natural | Pure Herbal Skincare, Hair Oils & Wellness Remedies",
    template: "%s | MHAHRR Natural",
  },
  description:
    "Discover MHAHRR Natural's 100% pure botanical skincare, organic hair oils, and traditional healing formulations crafted in Karachi, Pakistan. Grounded in Herbality, Purity, and Humanity.",
  keywords: [
    "MHAHRR Natural",
    "Mhahrr Naturals",
    "Mhahrr herbal skincare",
    "herbal skincare Pakistan",
    "organic hair oil Karachi",
    "pure herbal miracle hair oil",
    "natural healing remedies",
    "chemical free skincare Pakistan",
    "organic neem face wash",
    "turmeric glow face mask",
    "pure rose water toner",
    "herbal aloe vera gel",
    "botanical remedies Pakistan",
    "cold pressed herbal oils",
    "ayurvedic remedies Karachi",
    "holistic wellness remedies",
    "natural beauty brand Karachi",
    "cruelty free skincare Pakistan",
    "handmade herbal cosmetics",
    "glow skin naturally",
    "healing solution herbal care",
    "#MhahrrNaturals",
    "#HerbalSkincare",
    "#NaturalRemedies",
    "#OrganicWellness",
    "#PureHerbalOil",
  ],
  authors: [{ name: "MHAHRR Natural" }],
  creator: "MHAHRR Natural",
  publisher: "MHAHRR Natural",
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
    icon: "/logo/logo_without_text_bgremove.png",
    apple: "/logo/logo_without_text_bgremove.png",
  },
  openGraph: {
    title: "MHAHRR Natural | Pure Herbal Skincare & Wellness Remedies",
    description:
      "Handcrafted 100% natural, chemical-free herbal formulations for radiant skin, healthy hair, and holistic healing.",
    url: "https://mhahrr.com",
    siteName: "MHAHRR Natural",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/product_img/oilImg2.png",
        width: 864,
        height: 681,
        alt: "MHAHRR Natural Herbal Formulations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MHAHRR Natural | Pure Herbal Skincare & Healing Remedies",
    description:
      "Experience timeless botanical healing with MHAHRR Natural. Chemical-free, 100% pure organic care.",
    images: ["/product_img/oilImg2.png"],
    creator: "@Mhahrr_Naturals",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MHAHRR Natural",
  alternateName: "MHAHRR Naturals",
  url: "https://mhahrr.com",
  logo: "https://mhahrr.com/logo/logo_without_text_bgremove.png",
  description:
    "Pure herbal skincare, organic hair oils, and traditional natural remedies crafted with herbality, purity, and humanity.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-123-456-789",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.instagram.com/mhahrrnaturals/",
    "https://www.tiktok.com/@mhahrr.naturals",
    "https://x.com/Mhahrr_Naturals",
    "https://www.linkedin.com/in/mhahrr-naturals-56376b39b/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
