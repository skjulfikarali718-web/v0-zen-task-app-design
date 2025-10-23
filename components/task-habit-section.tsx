"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Check, Sparkles, Loader } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
}

interface Habit {
  id: string
  name: string
  streak: number
}

export function TaskHabitSection() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete morning meditation", completed: false },
    { id: "2", title: "Review daily goals", completed: true },
  ])

  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Morning Routine", streak: 12 },
    { id: "2", name: "Exercise", streak: 8 },
    { id: "3", name: "Reading", streak: 5 },
  ])

  const [newTask, setNewTask] = useState("")
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [planError, setPlanError] = useState<string | null>(null)

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const generateAIPlan = async () => {
    if (tasks.length === 0) {
      setPlanError("Add some tasks first to generate a plan")
      return
    }

    setIsGenerating(true)
    setPlanError(null)
    setGeneratedPlan(null)

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: tasks.map((t) => t.title),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.type === "credit_card_required") {
          setPlanError("Add a payment method to your Vercel account to use AI features")
        } else {
          setPlanError(data.error || "Failed to generate plan")
        }
        return
      }

      setGeneratedPlan(data.plan)
    } catch (error) {
      setPlanError("Error generating plan. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Tasks */}
      <Card className="glass soft-glow border-0 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Today's Tasks</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateAIPlan}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-accent rounded-lg text-sm font-medium text-primary-foreground hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader size={16} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                AI Plan
              </>
            )}
          </motion.button>
        </div>

        <div className="space-y-3 mb-4">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                task.completed ? "bg-primary/20 shadow-lg shadow-primary/30" : "bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed ? "bg-primary border-primary" : "border-foreground/30 hover:border-primary"
                }`}
              >
                {task.completed && <Check size={16} className="text-primary-foreground" />}
              </motion.button>
              <span
                className={`flex-1 text-sm ${task.completed ? "line-through text-foreground/50" : "text-foreground"}`}
              >
                {task.title}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteTask(task.id)}
                className="text-foreground/40 hover:text-destructive transition-colors"
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {generatedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20"
          >
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              Your AI-Generated Plan
            </h3>
            <div className="text-sm text-foreground/80 whitespace-pre-wrap">{generatedPlan}</div>
          </motion.div>
        )}

        {planError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20 text-sm text-destructive"
          >
            {planError}
          </motion.div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 bg-foreground/10 border border-foreground/20 rounded-lg px-3 py-2 text-sm text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary"
          />
          <Button onClick={addTask} className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg">
            <Plus size={20} />
          </Button>
        </div>
      </Card>

      {/* Habits */}
      <Card className="glass soft-glow border-0 p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Habit Streaks</h2>
        <div className="space-y-3">
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 transition-transform"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{habit.name}</span>
                <span className="text-sm font-bold text-primary">{habit.streak} days</span>
              </div>
              <div className="w-full bg-foreground/10 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(habit.streak * 5, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
