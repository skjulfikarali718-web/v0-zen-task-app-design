"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")

  useEffect(() => {
    if (!isActive) return

    const phases = ["inhale", "hold", "exhale"]
    const durations = { inhale: 4000, hold: 4000, exhale: 4000 }

    let currentPhaseIndex = 0
    let timeout: NodeJS.Timeout

    const cyclePhase = () => {
      const currentPhase = phases[currentPhaseIndex] as "inhale" | "hold" | "exhale"
      setPhase(currentPhase)
      timeout = setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
        cyclePhase()
      }, durations[currentPhase])
    }

    cyclePhase()
    return () => clearTimeout(timeout)
  }, [isActive])

  const phaseText = {
    inhale: "Inhale...",
    hold: "Hold...",
    exhale: "Exhale...",
  }

  const phaseScale = {
    inhale: 1.5,
    hold: 1.5,
    exhale: 0.8,
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ scale: isActive ? phaseScale[phase] : 1 }}
        transition={{ duration: phase === "hold" ? 0 : 4, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 mb-8 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-sm text-foreground/60 mb-2">{isActive ? phaseText[phase] : "Ready to breathe?"}</p>
          <p className="text-2xl font-bold text-primary">{isActive ? (phase === "hold" ? "4" : "...") : "∞"}</p>
        </div>
      </motion.div>

      <p className="text-foreground/70 mb-8 text-center max-w-xs">
        Follow the circle's movement. Breathe in as it expands, hold, then breathe out as it shrinks.
      </p>

      <Button
        onClick={() => setIsActive(!isActive)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full"
      >
        {isActive ? "Stop" : "Start Breathing"}
      </Button>
    </div>
  )
}
