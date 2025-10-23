"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Volume } from "lucide-react"

const sounds = [
  {
    id: "rain",
    label: "Rain",
    emoji: "🌧️",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-heavy-rain-drops-2399-GvcnWKZ09VDaKrbKOoIrN9gukj1Rqr.wav",
  },
  {
    id: "wind",
    label: "Wind",
    emoji: "💨",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-winter-wind-loop-1175-I8zYaX7b0jNbieKRnUnvmahH7YbCSf.wav",
  },
  {
    id: "night",
    label: "Night",
    emoji: "🌙",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-summer-crickets-loop-1788-gliBz8BHoiGjPuoWyc0gDqc4UNFj25.wav",
  },
  {
    id: "morning",
    label: "Morning",
    emoji: "🌅",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-little-birds-singing-in-the-trees-17-oIgC0MtrHT6Tdfx7i299QXn14iGyCT.wav",
  },
  {
    id: "waterfall",
    label: "Waterfall",
    emoji: "💧",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-heavy-close-waterfall-3029-38NmPVPntrPvNVTKbbMKzBxM9Oudwi.wav",
  },
  {
    id: "waves",
    label: "Waves",
    emoji: "🌊",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-people-bathing-in-the-sea-ambience-348-Z28G5RBYxUErHg5U6s3e3H9yo78fG8.wav",
  },
]

export function AmbientSoundMixer() {
  const [volumes, setVolumes] = useState<Record<string, number>>({
    rain: 0,
    wind: 0,
    night: 0,
    morning: 0,
    waterfall: 0,
    waves: 0,
  })

  const [isMuted, setIsMuted] = useState(false)
  const [previousVolumes, setPreviousVolumes] = useState<Record<string, number>>({})
  const audioElementsRef = useRef<Record<string, HTMLAudioElement>>({})
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize audio elements
    sounds.forEach((sound) => {
      if (!audioElementsRef.current[sound.id]) {
        const audio = new Audio(sound.url)
        audio.crossOrigin = "anonymous"
        audio.loop = true
        audio.volume = 0
        audioElementsRef.current[sound.id] = audio
      }
    })

    return () => {
      // Cleanup: stop all sounds on unmount
      Object.values(audioElementsRef.current).forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }
  }, [])

  const handleVolumeChange = (id: string, value: number) => {
    setVolumes({ ...volumes, [id]: value })
    setIsMuted(false)

    const audio = audioElementsRef.current[id]
    if (!audio) return

    const normalizedVolume = value / 100
    audio.volume = normalizedVolume

    if (value > 0 && audio.paused) {
      audio.play().catch((err) => console.log("[v0] Audio play error:", err))
    } else if (value === 0 && !audio.paused) {
      audio.pause()
    }
  }

  const handleMuteAll = () => {
    if (isMuted) {
      // Unmute with fade-in
      setVolumes(previousVolumes)
      Object.entries(previousVolumes).forEach(([id, vol]) => {
        const audio = audioElementsRef.current[id]
        if (audio && vol > 0) {
          audio.play().catch((err) => console.log("[v0] Audio play error:", err))
        }
      })
    } else {
      // Mute with fade-out
      setPreviousVolumes(volumes)
      setVolumes({
        rain: 0,
        wind: 0,
        night: 0,
        morning: 0,
        waterfall: 0,
        waves: 0,
      })
      Object.values(audioElementsRef.current).forEach((audio) => {
        audio.pause()
      })
    }
    setIsMuted(!isMuted)
  }

  const totalVolume = Object.values(volumes).reduce((a, b) => a + b, 0)

  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Mix Your Sounds</h3>
          <div className="flex items-center gap-2">
            {totalVolume > 0 ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
              >
                <Volume2 size={20} className="text-primary" />
              </motion.div>
            ) : (
              <VolumeX size={20} className="text-foreground/40" />
            )}
          </div>
        </div>

        <div className="space-y-4">
          {sounds.map((sound) => {
            const isActive = volumes[sound.id] > 0
            return (
              <motion.div
                key={sound.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                  isActive ? "bg-primary/10 shadow-lg shadow-primary/20" : "bg-transparent"
                }`}
              >
                <motion.span
                  animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 0.6, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
                  className="text-2xl w-8"
                >
                  {sound.emoji}
                </motion.span>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">{sound.label}</label>
                    <span className="text-xs text-foreground/60">{volumes[sound.id]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumes[sound.id]}
                    onChange={(e) => handleVolumeChange(sound.id, Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-foreground/20 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMuteAll}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all ${
            isMuted
              ? "bg-secondary/30 text-secondary border border-secondary/50"
              : "bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30"
          }`}
        >
          <Volume size={18} />
          {isMuted ? "Unmute All" : "Mute All"}
        </motion.button>
      </div>

      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
        <p className="text-sm text-foreground/70">
          💡 Tip: Mix different sounds to create your perfect focus environment. Use Mute All for instant silence.
        </p>
      </div>
    </div>
  )
}
