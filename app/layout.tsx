import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "My developer portfolio",
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
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
          )}
      >
      <TooltipProvider>{children}</TooltipProvider>
      </body>
      </html>
  );
}
