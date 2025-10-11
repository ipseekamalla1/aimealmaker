import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateRecipe } from "@/lib/ai"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { ingredients } = data

    if (!ingredients) {
      return NextResponse.json({ error: "Ingredients required" }, { status: 400 })
    }

    // Ensure ingredients is always an array
    const parsedIngredients = Array.isArray(ingredients)
      ? ingredients
      : JSON.parse(ingredients)

    // Generate recipe from AI
    const aiRecipe = await generateRecipe(parsedIngredients)

    // ✅ Save to Prisma (ingredients must be array)
    const newEntry = await prisma.ingredientList.create({
      data: {
        ingredients: parsedIngredients,
        recipes: aiRecipe,
      },
    })

    return NextResponse.json(newEntry)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
