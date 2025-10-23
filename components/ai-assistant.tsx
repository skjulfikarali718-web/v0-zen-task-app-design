"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Loader, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Zen AI Companion. How can I help you today?",
      sender: "ai",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
      }
      setMessages([...messages, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        const response = await fetch("/api/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        })

        const data = await response.json()
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text || "I'm here to help. What's on your mind?",
          sender: "ai",
        }
        setMessages((prev) => [...prev, aiMessage])
      } catch (error) {
        console.error("Error:", error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble connecting. Please try again.",
          sender: "ai",
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <motion.div className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-3">
        {/* Pulsing glow effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-xl"
          style={{ width: "80px", height: "80px", left: "-8px", top: "-8px" }}
        />

        {/* Main button with gradient and larger size */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white shadow-2xl flex items-center justify-center font-bold text-sm hover:shadow-cyan-500/50 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-1">
            <Sparkles size={24} className="animate-pulse" />
            <span className="text-xs font-bold">AI</span>
          </div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 right-0 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-lg pointer-events-none"
        >
          Chat with Zen AI
        </motion.div>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-8 w-96 max-w-[calc(100vw-2rem)] glass soft-glow rounded-2xl overflow-hidden z-50 flex flex-col max-h-96 border-2 border-cyan-400/30"
          >
            <div className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 p-4 flex items-center justify-between border-b border-cyan-400/20">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-cyan-400 animate-pulse" />
                <h3 className="font-bold text-foreground">Zen AI Companion</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user" ? "bg-primary/30 text-foreground" : "bg-foreground/10 text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-foreground/10 text-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-foreground/10 p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-foreground/10 border border-foreground/20 rounded-lg px-3 py-2 text-sm text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary disabled:opacity-50"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg disabled:opacity-50"
              >
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
