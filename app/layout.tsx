import "@/app/globals.css";
import siteMetadata from "@/app/data/siteMetadata";
import { inter } from "@/app/components/fonts";
import { Providers } from "@/app/providers";
import CheckServerStatus from "@/app/components/CheckServerStatus";
import PerformanceMetrics from "@/app/components/PerformanceMetrics";
import ErrorBoundary from "@/app/components/error/ErrorBoundary";

import type { Metadata } from "next";


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
        <Providers>
          <CheckServerStatus>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </CheckServerStatus>
          <PerformanceMetrics />
        </Providers>
      </body>
    </html >
  );
}
