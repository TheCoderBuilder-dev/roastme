import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { SupabaseProvider } from "@/context/SupabaseProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roast Me Rank - The Ultimate Roasting Platform",
  description: "Upload your pic, get roasted, rank up, and have fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <SupabaseProvider>
          <ToastProvider>
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
            <footer className="border-t border-gray-200 py-6 mt-10">
              <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Roast Me Rank. All rights reserved.
                <div className="mt-2 flex justify-center gap-4">
                  <a href="#" className="hover:text-orange-500">Terms</a>
                  <a href="#" className="hover:text-orange-500">Privacy</a>
                  <a href="#" className="hover:text-orange-500">Guidelines</a>
                </div>
              </div>
            </footer>
            <ToastViewport />
          </ToastProvider>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
