import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "sin.Next Stack",
  description: "Full stack Next.js app with SingleStore, Elegance SDK & NextJS for real-time intelligent apps",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
          className={cn(
              "min-h-screen bg-gradient-radial from-gray-700 via-purple-500 to-gray-200 font-sans antialiased",
              fontSans.variable
          )}
      >
        <Providers>
            {children}
         </Providers>
      </body>
      </html>
  );
}
