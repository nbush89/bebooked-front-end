import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bebooked — Your calendar, fully loaded.",
  description:
    "Bebooked helps beauty professionals in Charlotte, NC fill last-minute openings. Post a slot, share a link, get booked.",
  openGraph: {
    title: "Bebooked — Your calendar, fully loaded.",
    description:
      "Fill your last-minute openings. Post a slot, share your link, get booked. Launching in Charlotte, NC.",
    url: "https://bebookedtoday.com",
    siteName: "Bebooked",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
