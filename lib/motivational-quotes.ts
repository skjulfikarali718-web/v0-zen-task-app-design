export const motivationalQuotes = [
  "Take a deep breath and embrace the moment 🌿",
  "Progress over perfection, always 🌱",
  "Your calm mind is your superpower ✨",
  "Focus on what matters most 🎯",
  "Every moment is a fresh start 🌅",
  "Small steps lead to big changes 🚀",
  "You are capable of amazing things 💪",
  "Breathe in peace, breathe out stress 🧘",
  "Today is a perfect day to begin 🌟",
  "Your potential is limitless 🌈",
  "Embrace the journey, not just the destination 🛤️",
  "Mindfulness is the key to happiness 🔑",
  "You've got this, one task at a time ✅",
  "Calm waters run deep 💧",
  "Growth happens outside your comfort zone 🌳",
]

export function getRandomQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
}
