import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GeoIntel AI — Mining Intelligence Platform",
  description: "AI-Powered Geological, Mining and Reporting Solution for CMPDI/CIL subsidiaries · Ministry of Coal, Government of India.",
  keywords: "coal india, mining intelligence, CMPDI, CIL, geological data, mining reports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
