import type { Metadata } from "next";
import type { ReactNode } from "react";

import { shellFontVariables } from "@/components/shell/monitoring-shell";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.RENDER_EXTERNAL_URL ?? "http://localhost:3006"),
  title: {
    default: "Worthing Coastal Monitoring Demonstrator",
    template: "%s | FutureScaping"
  },
  description:
    "FutureScaping client preview showing how public evidence, coastal imagery, weather, tides, provenance and client-supplied survey layers can support Worthing change monitoring.",
  icons: {
    icon: "/brand/monitoring-system-favicon.svg",
    shortcut: "/brand/monitoring-system-favicon.svg",
    apple: "/brand/monitoring-system-favicon.svg"
  },
  openGraph: {
    title: "Worthing Coastal Monitoring Demonstrator",
    description:
      "A FutureScaping client preview for a public-data-led Worthing coastal change monitoring system.",
    type: "website",
    siteName: "FutureScaping",
    images: [
      {
        url: "/generated-images/worthing-wide-frontage-overview-illustration-v1.png",
        width: 1536,
        height: 1024,
        alt: "Illustrative Worthing seafront monitoring preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Worthing Coastal Monitoring Demonstrator",
    description:
      "A FutureScaping client preview for a public-data-led Worthing coastal change monitoring system.",
    images: ["/generated-images/worthing-wide-frontage-overview-illustration-v1.png"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={shellFontVariables()}>{children}</body>
    </html>
  );
}
