"use client";

import { useState, useEffect } from "react";
import { WelcomePopup } from "@/components/welcome-popup";
import { Dashboard } from "@/components/dashboard";
import { AnimatedBackground } from "@/components/animated-background";
import { TipOfTheDay } from "@/components/tip-of-the-day";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen welcome popup
    const hasSeenWelcome = localStorage.getItem("zen-welcome-seen");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
    setIsLoading(false);
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem("zen-welcome-seen", "true");
    setShowWelcome(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <main className="ambient-gradient min-h-screen relative overflow-y-auto">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-8 text-center">

        {/* Welcome or Dashboard */}
        <div className="w-full max-w-4xl">
          {showWelcome && <WelcomePopup onComplete={handleWelcomeComplete} />}
          {!showWelcome && <Dashboard />}
        </div>

        {/* Tip of the Day */}
        <div className="w-full max-w-3xl mt-10">
          <TipOfTheDay />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-sm text-gray-400">
          <p>© 2025 ZenTask. All rights reserved.</p>
          <p className="mt-1">
            Follow us on{" "}
            <a
              href="#"
              className="underline text-gray-300 hover:text-white transition"
            >
              LinkedIn
            </a>
            {" "}and{" "}
            <a
              href="#"
              className="underline text-gray-300 hover:text-white transition"
            >
              Instagram
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
