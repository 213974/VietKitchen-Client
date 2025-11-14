import type { Metadata, Viewport } from "next";
import { Lora, Poppins } from "next/font/google";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "@/contexts/AuthProvider";
import GenericErrorBoundary from "@/components/common/ErrorBoundary/GenericErrorBoundary";

import "./globals.css";
import "@/styles/theme.css"; // Import the default theme

// --- Font Configuration ---
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-family-sans",
});

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--font-family-serif",
});

// --- Metadata & SEO ---
export const metadata: Metadata = {
  title: {
    default: "Viet Kitchen & Tea House - Sterling, VA",
    template: "%s | Viet Kitchen & Tea House",
  },
  description: "Authentic Vietnamese cuisine and bubble tea in Sterling, VA. Explore our menu of pho, banh mi, boba tea, and more in a modern, welcoming setting.",
  metadataBase: new URL("https://www.vietkitchenteahouse.com"),
  openGraph: {
    title: "Viet Kitchen & Tea House - Sterling, VA",
    description: "Authentic Vietnamese cuisine and bubble tea in Sterling, VA.",
    url: "https://www.vietkitchenteahouse.com",
    siteName: "Viet Kitchen & Tea House",
    images: [
      {
        url: "/gallery/store_front1.jpg", // Points to public/gallery/store_front1.jpg
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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

export const viewport: Viewport = {
  themeColor: "#3e8a78", // Corresponds to --accent-primary in theme.css
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${lora.variable}`}>
        <HelmetProvider>
          <GenericErrorBoundary>
            <AuthProvider>{children}</AuthProvider>
          </GenericErrorBoundary>
        </HelmetProvider>
      </body>
    </html>
  );
}