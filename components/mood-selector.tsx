"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Mood = "chill" | "focus" | "night-owl"

interface MoodSelectorProps {
  onMoodChange?: (mood: Mood) => void
}

const moods = [
  { id: "chill", label: "Chill", icon: "😌", color: "from-blue-500 to-cyan-500" },
  { id: "focus", label: "Focus", icon: "🎯", color: "from-purple-500 to-pink-500" },
  { id: "night-owl", label: "Night Owl", icon: "🌙", color: "from-indigo-600 to-purple-900" },
]

export function MoodSelector({ onMoodChange }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<Mood>("chill")

  useEffect(() => {
    const savedMood = localStorage.getItem("zen-mood") as Mood | null
    if (savedMood) {
      setSelectedMood(savedMood)
    }
  }, [])

  const handleMoodChange = (mood: Mood) => {
    setSelectedMood(mood)
    localStorage.setItem("zen-mood", mood)
    onMoodChange?.(mood)
    document.documentElement.setAttribute("data-mood", mood)
  }

  return (
    <div className="flex gap-3">
      {moods.map((mood) => (
        <motion.button
          key={mood.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleMoodChange(mood.id as Mood)}
          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg transition-all ${
            selectedMood === mood.id
              ? "bg-primary/30 border border-primary/50 shadow-lg shadow-primary/20"
              : "bg-foreground/5 border border-foreground/10 hover:bg-foreground/10"
          }`}
        >
          <span className="text-2xl">{mood.icon}</span>
          <span className="text-xs font-semibold text-foreground">{mood.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
