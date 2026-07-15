import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { displayFont, bodyFont } from "@/config/fonts.generated";
import { motionMode } from "@/config/design.generated";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionLayer from "@/components/layout/MotionLayer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-motion={motionMode}
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <MotionLayer />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
