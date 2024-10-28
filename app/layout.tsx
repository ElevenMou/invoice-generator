import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AuthProvider from "@/contexts/AuthProvider";
import Header from "@/components/layout/Header";
import { Analytics } from "@vercel/analytics/react";
import VercelSpeedInsights from "@/components/layout/VercelSpeedInsights";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Movoice",
    default: "Movoice",
  },
  description: "Generate and follow your invoices",
  icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="min-h-min">
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
        <VercelSpeedInsights />
      </body>
    </html>
  );
}
