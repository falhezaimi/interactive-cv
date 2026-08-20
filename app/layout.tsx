import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import "../styles/print.css";

const siteUrl = "https://fares-cv.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fares Alhezaimi — Earth Intelligence & Scientific Software",
    template: "%s · Fares Alhezaimi",
  },
  description:
    "Research portfolio of Fares Alhezaimi: thermal remote sensing, wildfire detection, scientific software, ecological machine learning, and geospatial products.",
  keywords: [
    "Fares Alhezaimi",
    "ECOSTRESS",
    "thermal remote sensing",
    "wildfire detection",
    "scientific software",
    "NASA JPL",
    "Chapman University",
  ],
  authors: [{ name: "Fares Alhezaimi", url: siteUrl }],
  creator: "Fares Alhezaimi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Fares Alhezaimi",
    title: "Fares Alhezaimi — Earth Intelligence & Scientific Software",
    description:
      "Building scientific tools across thermal remote sensing, wildfire research, ecological ML, and geospatial product engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fares Alhezaimi — Earth Intelligence & Scientific Software",
    description:
      "Scientific software for Earth observation, wildfire research, and ecological intelligence.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
