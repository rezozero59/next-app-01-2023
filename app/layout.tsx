import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import ThemeProvider from "@/providers/theme-provider";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/query-provider";
import AuthProvider from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LD Blog",
  description: "By Laurent Delassus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div
                className="flex flex-col 
         justify-between flex-fill min-h-screen"
              >
                <Header />
                <div className="flex-grow">{children}</div>
                <Footer />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
