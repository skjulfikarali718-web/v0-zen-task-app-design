"use client"
import { OnboardingFlow } from "./onboarding-flow"
import { useState } from "react"

interface WelcomePopupProps {
  onComplete: () => void
}

export function WelcomePopup({ onComplete }: WelcomePopupProps) {
  const [showOnboarding, setShowOnboarding] = useState(true)

  if (showOnboarding) {
    return <OnboardingFlow onComplete={onComplete} />
  }

  return null
}
