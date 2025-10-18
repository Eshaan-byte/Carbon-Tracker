import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProviderDev from "@/components/auth/AuthProviderDev";
import ScrollToTop from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carbon Tracker - Digital Footprint Monitor",
  description:
    "Track your digital carbon footprint and make a positive environmental impact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProviderDev>{children}</AuthProviderDev>
        <ScrollToTop />
      </body>
    </html>
  );
}
