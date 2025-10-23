"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds])

  const handleReset = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  }

  const progress = ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100

  const getStrokeColor = () => {
    if (progress < 33) return "rgb(34, 197, 94)" // green
    if (progress < 66) return "rgb(234, 179, 8)" // yellow
    return "rgb(239, 68, 68)" // red
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: isActive ? 360 : 0 }}
        transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
        className="relative w-48 h-48 mb-8"
      >
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        )}

        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth="8"
            strokeDasharray={`${(progress / 100) * 565.48} 565.48`}
            animate={{ strokeDasharray: `${(progress / 100) * 565.48} 565.48` }}
            transition={{ duration: 0.5 }}
            style={{ filter: isActive ? "drop-shadow(0 0 8px currentColor)" : "none" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
              className="text-5xl font-bold text-primary"
            >
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </motion.div>
            <p className="text-sm text-foreground/60 mt-2">Focus Session</p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setIsActive(!isActive)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4"
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleReset}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full p-4"
          >
            <RotateCcw size={24} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
