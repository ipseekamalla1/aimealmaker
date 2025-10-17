"use client"

import { useState } from "react"
import Navbar from "@/components/ui/Navbar"
import { motion } from "framer-motion"

export default function HomePage() {
  const [ingredients, setIngredients] = useState("")
  const [recipe, setRecipe] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setRecipe("")
    setError("")

    try {
      const res = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients
            .split(",")
            .map(i => i.trim())
            .filter(i => i !== ""),
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setRecipe(data.recipes)
      } else {
        setError(data.error || "Failed to generate recipe")
      }
    } catch (err) {
      setError("Network error — check your server or AI service")
    } finally {
      setLoading(false)
    }
  }

  // 🧩 Parse recipe sections
  const parseRecipe = (recipeText: string) => {
    const sections = {
      name: "",
      ingredients: [] as string[],
      instructions: [] as string[],
    }

    const nameMatch = recipeText.match(/\*\*Recipe Name:\*\*\s*(.+)/)
    if (nameMatch) sections.name = nameMatch[1].trim()

    const ingredientsMatch = recipeText.match(/\*\*Ingredients List:\*\*([\s\S]*?)\*\*Cooking Instructions:/)
    if (ingredientsMatch) {
      sections.ingredients = ingredientsMatch[1]
        .split(/\n/)
        .map(i => i.replace(/^\d+\.\s*/, "").trim())
        .filter(i => i)
    }

    const instructionsMatch = recipeText.match(/\*\*Cooking Instructions:\*\*([\s\S]*)/)
    if (instructionsMatch) {
      sections.instructions = instructionsMatch[1]
        .split(/\n\d+\.\s*/)
        .map(i => i.trim())
        .filter(i => i)
    }

    return sections
  }

  const parsed = recipe ? parseRecipe(recipe) : null

  return (
    <>
      <Navbar />

      {/* 🌄 HERO SECTION */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/mealmaker-hero.webp')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-amber-300 mb-4">
            Discover Delicious Meals with AI 🍽️
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Enter your ingredients and let our smart chef whip up creative
            recipes just for you!
          </p>
        </motion.div>
      </section>

      {/* 🧠 MEAL MAKER SECTION */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-10 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-amber-300"
          >
            🍳 AI Meal Maker
          </motion.h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <motion.input
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              type="text"
              placeholder="e.g. chicken, rice, spinach"
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-emerald-900 text-white hover:bg-emerald-300 hover:scale-105"
              }`}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </motion.button>
          </form>

          {/* 🔄 Loading Spinner */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mt-8"
            >
              <div className="w-10 h-10 border-4 border-amber-300 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-amber-200 animate-pulse">Cooking up ideas...</p>
            </motion.div>
          )}

          {/* ⚠️ Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 mt-4 font-medium animate-pulse"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* 🍽️ Full-Width Recipe Display */}
        {parsed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full mt-16 px-6 md:px-20"
          >
            <div className="max-w-6xl mx-auto space-y-10">
              {/* Recipe Name */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-4xl font-bold text-amber-300 mb-4 text-center">
                  {parsed.name}
                </h2>
              </div>

              {/* Ingredients */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-amber-300 mb-4">
                  🥕 Ingredients
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-200">
                  {parsed.ingredients.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-700 transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-amber-300 mb-4">
                  👩‍🍳 Cooking Instructions
                </h3>
                <ol className="space-y-3 text-gray-200">
                  {parsed.instructions.map((step, idx) => (
                    <li
                      key={idx}
                      className="bg-neutral-800 px-4 py-3 rounded-md hover:bg-neutral-700 transition"
                    >
                      <span className="text-amber-300 font-semibold mr-2">
                        Step {idx + 1}:
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </>
  )
}
