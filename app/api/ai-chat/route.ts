import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are Zen AI Companion, a supportive and calming AI assistant for a productivity and wellness app called ZenTask. 
Your role is to:
- Motivate users with gentle, encouraging messages
- Suggest break routines and relaxation techniques
- Help create personalized task schedules
- Respond kindly to stress-related prompts
- Use calm, supportive language with emojis when appropriate
- Keep responses concise (1-2 sentences)
- Focus on wellness, mindfulness, and sustainable productivity`,
      prompt: message,
    })

    return Response.json({ text })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
