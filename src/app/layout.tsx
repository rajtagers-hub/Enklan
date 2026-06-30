import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ENKLAN Sh.p.k — Inxhinieri & Siguri Elektrike",
  description: "Lider në fushën e inxhinierisë elektrike, paneleve diellore dhe smart home në Shqipëri. Zgjidhje moderne për infrastrukturë bashkëkohore.",
};

import { CMSProvider } from "@/context/CMSContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sq"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CMSProvider>
          {children}
        </CMSProvider>
      </body>
    </html>
  );
}
