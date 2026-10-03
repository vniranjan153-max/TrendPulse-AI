import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrendPulse AI",
  description: "Discover internet trends before they peak.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
