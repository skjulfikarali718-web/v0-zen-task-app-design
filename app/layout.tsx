import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ZenTask – Focus, Relax & Grow",
  description: "Your peaceful space to focus, relax, and grow every day",
  generator: "v0.app",
  openGraph: {
    title: "ZenTask – Focus, Relax & Grow",
    description: "Your peaceful space to focus, relax, and grow every day",
    url: "https://yourapp.com",
    siteName: "ZenTask",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZenTask OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenTask – Focus, Relax & Grow",
    description: "Your peaceful space to focus, relax, and grow every day",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} font-sans antialiased bg-gray-900 text-white flex flex-col min-h-screen`}>
        
        {/* Header */}
        <header className="w-full p-6 bg-gray-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold">ZenTask</h1>
            <nav className="flex gap-6 text-gray-300">
              <a href="/" className="hover:text-indigo-400 transition-colors">Home</a>
              <a href="/about" className="hover:text-indigo-400 transition-colors">About</a>
              <a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 max-w-7xl mx-auto p-6 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full bg-gray-900 p-6 text-gray-400 mt-auto">
          <div className="max-w-7xl mx-auto text-center flex flex-col gap-2">
            <p>© 2025 ZenTask. All rights reserved.</p>
            <p>
              Follow us on{" "}
              <a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a>,{" "}
              <a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a>
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
