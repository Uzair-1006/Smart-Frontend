import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./GlobalRedux/provider"; // Ensure the path matches the actual file location

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Agencies",
  description: "Smart Agencies – Empowering your business with web, tech, and marketing solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers> {/* Correctly use Providers component */}
      </body>
    </html>
  );
}
