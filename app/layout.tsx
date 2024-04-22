import type { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { inter } from "@/app/ui/fonts";



export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: siteMetadata.language,
    type: 'website',
  },
  twitter: {
    title: siteMetadata.title,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} pl-[calc(100vw-100%)]`} >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
