"use client"

import { useState } from "react"
import { GreetingHeader } from "@/components/greeting-header"
import { QuickAccessButtons } from "@/components/quick-access-buttons"
import { FocusRelaxSection } from "@/components/focus-relax-section"
import { TaskHabitSection } from "@/components/task-habit-section"
import { AIAssistant } from "@/components/ai-assistant"
import { MoodSelector } from "@/components/mood-selector"

export function Dashboard() {
  const [mode, setMode] = useState<"focus" | "calm">("calm")

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <GreetingHeader />

        <div className="mt-6 mb-8">
          <p className="text-sm text-foreground/60 mb-3">Choose your mood:</p>
          <MoodSelector />
        </div>

        {/* Quick Access Buttons */}
        <QuickAccessButtons mode={mode} setMode={setMode} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Focus & Relax */}
          <div className="lg:col-span-2">
            <FocusRelaxSection mode={mode} />
          </div>

          {/* Right Column - Tasks & Habits */}
          <div className="lg:col-span-1">
            <TaskHabitSection />
          </div>
        </div>
      </div>

      {/* AI Assistant Button */}
      <AIAssistant />
    </div>
  )
}
