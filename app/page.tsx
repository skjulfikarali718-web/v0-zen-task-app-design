"use client"

import { useState, useEffect } from "react"
import { WelcomePopup } from "@/components/welcome-popup"
import { Dashboard } from "@/components/dashboard"
import { AnimatedBackground } from "@/components/animated-background"
import { TipOfTheDay } from "@/components/tip-of-the-day"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has seen welcome popup
    const hasSeenWelcome = localStorage.getItem("zen-welcome-seen")
    if (!hasSeenWelcome) {
      setShowWelcome(true)
    }
    setIsLoading(false)
  }, [])

  const handleWelcomeComplete = () => {
    localStorage.setItem("zen-welcome-seen", "true")
    setShowWelcome(false)
  }

  if (isLoading) {
    return null
  }

  return (
    <main className="ambient-gradient min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {showWelcome && <WelcomePopup onComplete={handleWelcomeComplete} />}
        {!showWelcome && <Dashboard />}
        <TipOfTheDay />
      </div>
    </main>
  )
}
