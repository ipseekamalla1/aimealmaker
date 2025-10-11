export async function generateRecipe(ingredients: string[]) {
  try {
    const prompt = `Create a recipe using these ingredients: ${ingredients.join(", ")}.
Include:
- Recipe name
- Ingredient list
- Step-by-step cooking instructions.`

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt,
      }),
    })

    // 🧠 Ollama streams multiple JSON lines, so we read the text
    const text = await response.text()

    // Extract and join all "response" parts
    const lines = text
      .split("\n")
      .filter(line => line.trim().startsWith("{"))
      .map(line => JSON.parse(line).response)
      .join("")

    return lines || "No recipe generated."
  } catch (err) {
    console.error("AI Error:", err)
    return "AI generation failed."
  }
}
