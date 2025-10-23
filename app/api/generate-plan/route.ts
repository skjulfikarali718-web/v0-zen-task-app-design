import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { tasks } = await request.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are a productivity coach helping users create focused daily plans. 
Generate a structured daily plan that includes:
1. Specific time blocks for focus sessions (25-50 min)
2. Short breaks with relaxation suggestions
3. Task prioritization
4. Realistic goals

Keep the plan concise and motivating. Format as a numbered list.`,
      prompt: `Create a focused daily plan for these tasks: ${tasks.join(", ")}. Include timing and break suggestions.`,
    })

    return Response.json({ plan: text })
  } catch (error: any) {
    console.error("Plan Generation Error:", error)

    if (error?.message?.includes("customer_verification_required") || error?.message?.includes("credit card")) {
      return Response.json(
        {
          error:
            "AI features require a valid credit card on your Vercel account. Please add a card to enable AI-powered planning.",
          type: "credit_card_required",
        },
        { status: 402 },
      )
    }

    return Response.json({ error: "Failed to generate plan" }, { status: 500 })
  }
}
