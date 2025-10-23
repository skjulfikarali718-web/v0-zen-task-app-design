"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lightbulb } from "lucide-react"

const tips = [
  "Start your day with a 5-minute breathing exercise to set a calm tone.",
  "Use the Pomodoro technique: 25 minutes of focus, then a 5-minute break.",
  "Ambient sounds can boost focus by up to 30%. Find your perfect mix!",
  "Take a 2-minute walk every hour to refresh your mind and body.",
  "Hydration improves cognitive function. Drink water regularly throughout the day.",
  "The best time to tackle difficult tasks is in the morning when your energy is highest.",
  "Practice gratitude for 2 minutes daily to improve your overall well-being.",
  "Habit streaks build momentum. Consistency matters more than perfection.",
  "Silence your notifications during focus sessions to minimize distractions.",
  "End your day by reviewing what you accomplished. Celebrate small wins!",
]

export function TipOfTheDay() {
  const [isVisible, setIsVisible] = useState(false)
  const [tip, setTip] = useState("")

  useEffect(() => {
    const today = new Date().toDateString()
    const lastTipDate = localStorage.getItem("zen-tip-date")
    const hasSeenTip = localStorage.getItem("zen-tip-seen")

    if (lastTipDate !== today && !hasSeenTip) {
      const randomTip = tips[Math.floor(Math.random() * tips.length)]
      setTip(randomTip)
      setIsVisible(true)
      localStorage.setItem("zen-tip-date", today)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("zen-tip-seen", "true")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass soft-glow border-0 rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated sparkles background */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Lightbulb size={28} className="text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground">Tip of the Day</h3>
              </div>

              <p className="text-foreground/80 text-base leading-relaxed mb-6">{tip}</p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-colors"
                >
                  Got it!
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors z-20"
            >
              <X size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
