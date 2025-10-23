"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Welcome to ZenTask",
      description: "Your peaceful sanctuary to boost productivity, find calm, and build lasting habits.",
      features: [
        "Focus Timer - Pomodoro sessions to maximize productivity",
        "Relax - Breathing exercises and meditation",
        "Tasks & Habits - Track your goals and build streaks",
      ],
      icon: "🌙",
    },
    {
      title: "Stay Focused",
      description: "Use the Pomodoro timer to work in focused intervals with built-in breaks.",
      features: ["Customizable work sessions", "Color-changing progress ring", "Automatic break reminders"],
      icon: "⏱️",
    },
    {
      title: "Find Your Calm",
      description: "Choose from ambient sounds and breathing exercises to relax and recharge.",
      features: [
        "6 ambient sounds - Rain, Wind, Forest, Waves, Thunder, Morning",
        "Guided breathing exercises",
        "Adjustable volume mixing",
      ],
      icon: "🧘",
    },
    {
      title: "Track Your Progress",
      description: "Manage tasks and build habits with visual progress tracking.",
      features: ["Add and complete tasks", "Build habit streaks", "See your daily achievements"],
      icon: "✅",
    },
  ]

  const currentStep = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative glass soft-glow rounded-3xl p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,300 Q250,200 500,300 T1000,300"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              animate={{
                d: [
                  "M0,300 Q250,200 500,300 T1000,300",
                  "M0,300 Q250,400 500,300 T1000,300",
                  "M0,300 Q250,200 500,300 T1000,300",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.path
              d="M0,350 Q250,250 500,350 T1000,350"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  "M0,350 Q250,250 500,350 T1000,350",
                  "M0,350 Q250,450 500,350 T1000,350",
                  "M0,350 Q250,250 500,350 T1000,350",
                ],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />
          </svg>
        </div>

        {/* Close Button */}
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors z-10"
        >
          ✕
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-2 mb-2">
              {steps.map((_, index) => (
                <motion.div key={index} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: index < step ? "100%" : index === step ? `${progress % 100}%` : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-foreground/60">
              Step {step + 1} of {steps.length}
            </p>
          </div>

          {/* Icon */}
          <motion.div
            key={`icon-${step}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-6xl mb-6 text-center"
          >
            {currentStep.icon}
          </motion.div>

          {/* Title */}
          <motion.h2
            key={`title-${step}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center"
          >
            {currentStep.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            key={`desc-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-foreground/80 text-center mb-8 leading-relaxed"
          >
            {currentStep.description}
          </motion.p>

          {/* Features List */}
          <motion.div
            key={`features-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-3 mb-8"
          >
            {currentStep.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 text-foreground/80"
              >
                <span className="text-accent mt-1">✓</span>
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3 justify-between"
          >
            <Button
              onClick={() => setStep(Math.max(0, step - 1))}
              variant="outline"
              disabled={step === 0}
              className="flex-1"
            >
              Previous
            </Button>

            <Button
              onClick={() => {
                if (step === steps.length - 1) {
                  onComplete()
                } else {
                  setStep(step + 1)
                }
              }}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {step === steps.length - 1 ? "Start Journey" : "Next"}
            </Button>
          </motion.div>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={onComplete}
            className="w-full mt-3 text-foreground/60 hover:text-foreground transition-colors text-sm"
          >
            Skip
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
