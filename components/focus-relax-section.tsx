"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { BreathingExercise } from "@/components/breathing-exercise"
import { AmbientSoundMixer } from "@/components/ambient-sound-mixer"

interface FocusRelaxSectionProps {
  mode: "focus" | "calm"
}

export function FocusRelaxSection({ mode }: FocusRelaxSectionProps) {
  const [activeTab, setActiveTab] = useState<"timer" | "breathing" | "sounds">("timer")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="glass soft-glow border-0 p-6 md:p-8">
        <div className="flex gap-2 mb-6">
          {[
            { id: "timer", label: "Focus Timer" },
            { id: "breathing", label: "Breathing" },
            { id: "sounds", label: "Ambient Sounds" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id ? "bg-primary/30 text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "timer" && <PomodoroTimer />}
        {activeTab === "breathing" && <BreathingExercise />}
        {activeTab === "sounds" && <AmbientSoundMixer />}
      </Card>
    </motion.div>
  )
}
