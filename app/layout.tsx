import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

const title = `sin.Next Stack`;
export const metadata: Metadata = {
  title: {
    default: title,
    template: `${title} - %s`,
  },
  description: "Full stack Next.js app with SingleStore, Elegance SDK & NextJS for real-time intelligent apps",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex h-screen w-full min-w-80 max-w-full flex-col overflow-y-auto overflow-x-hidden",
        )}
      >
        {children}
      </body>
    </html>
  );
}
