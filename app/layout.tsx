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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} font-sans antialiased flex flex-col min-h-screen relative`}>

        {/* Animated Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-20 bg-gradient-to-r from-purple-800 via-indigo-900 to-gray-900 animate-gradient-x"></div>

        {/* Floating Particles */}
        <div id="particles" className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <span
              key={i}
              className="absolute bg-white/20 rounded-full animate-particle"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></span>
          ))}
        </div>

        {/* Header */}
        <header className="w-full p-8 bg-gray-900/70 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-3xl md:text-4xl font-bold">ZenTask</h1>
            <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-gray-300">
              <a href="/" className="hover:text-indigo-400 transition-colors whitespace-nowrap">Home</a>
              <a href="/about" className="hover:text-indigo-400 transition-colors whitespace-nowrap">About</a>
              <a href="/contact" className="hover:text-indigo-400 transition-colors whitespace-nowrap">Contact</a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full p-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-gray-900/70 backdrop-blur-sm p-8 text-gray-400 mt-auto">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-3">
            <p>© 2025 ZenTask. All rights reserved.</p>
            <p>
              Follow us on{" "}
              <a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a>,{" "}
              <a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a>
            </p>
          </div>
        </footer>

        {/* Animations */}
        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 15s ease infinite;
          }

          @keyframes particle {
            0% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-30px) translateX(15px); opacity: 0.4; }
            100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          }
          .animate-particle {
            animation: particle linear infinite;
          }
        `}</style>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              const particles = document.getElementById('particles');
              window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                particles.style.transform = 'translateY(' + scrollY * 0.1 + 'px)';
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
