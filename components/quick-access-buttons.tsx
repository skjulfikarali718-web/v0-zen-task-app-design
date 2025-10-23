"use client"

import { motion } from "framer-motion"
import { Zap, Wind, ListTodo } from "lucide-react"

interface QuickAccessButtonsProps {
  mode: "focus" | "calm"
  setMode: (mode: "focus" | "calm") => void
}

export function QuickAccessButtons({ mode, setMode }: QuickAccessButtonsProps) {
  const buttons = [
    { id: "focus", label: "Focus Mode", icon: Zap, color: "from-purple-500 to-pink-500" },
    { id: "calm", label: "Calm Mode", icon: Wind, color: "from-blue-500 to-cyan-500" },
    { id: "tasks", label: "Task Mode", icon: ListTodo, color: "from-green-500 to-emerald-500" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex flex-wrap gap-4"
    >
      {buttons.map((btn) => {
        const Icon = btn.icon
        const isActive = mode === btn.id
        return (
          <motion.button
            key={btn.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode(btn.id as "focus" | "calm")}
            className={`glass soft-glow px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 ${
              isActive
                ? "bg-primary/30 text-primary border-primary/50"
                : "text-foreground/70 hover:text-foreground border-foreground/20"
            }`}
          >
            <Icon size={20} />
            {btn.label}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
