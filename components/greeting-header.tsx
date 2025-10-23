"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { getRandomQuote } from "@/lib/motivational-quotes"

export function GreetingHeader() {
  const [quote, setQuote] = useState("")
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    setQuote(getRandomQuote())

    // Update time
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Image src="/zen-task-logo.png" alt="ZenTask Logo" width={48} height={48} className="rounded-lg" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
          ZenTask
        </h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Welcome back, breathe and plan your day
          </h1>
          <p className="text-lg text-foreground/70">{quote}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-accent">{time}</div>
          <p className="text-sm text-foreground/60">Current time</p>
        </div>
      </div>
    </motion.div>
  )
}
