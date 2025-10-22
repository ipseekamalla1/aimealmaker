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
    } catch {
      setError("Network error — check your server or AI service")
    } finally {
      setLoading(false)
    }
  }

  // --- Helper: parse the recipe into sections ---
  const parseRecipe = (text) => {
  if (!text) return { name: "", ingredientsArr: [], instructionsArr: [] }

  // Try to find recipe name
  const nameMatch = text.match(/(?:Recipe Name|Title|Name)[:\-]?\s*(.*)/i)
  const name = nameMatch ? nameMatch[1].trim() : "Your AI-Crafted Recipe"

  // Split text by sections — ingredients vs instructions
  const parts = text.split(/(?:Ingredients|Ingredient List)[:\-]?/i)
  let ingredientsText = ""
  let instructionsText = ""

  if (parts.length > 1) {
    const subParts = parts[1].split(/(?:Instructions|Directions|Steps)[:\-]?/i)
    ingredientsText = subParts[0] || ""
    instructionsText = subParts[1] || ""
  } else {
    // fallback: just split by newlines if no keywords found
    const lines = text.split("\n")
    const mid = Math.floor(lines.length / 2)
    ingredientsText = lines.slice(0, mid).join("\n")
    instructionsText = lines.slice(mid).join("\n")
  }

  // Turn both sections into arrays
  const ingredientsArr = ingredientsText
    .split(/\n|•|-/)
    .map(i => i.replace(/^\d+\.?\s*/, "").trim())
    .filter(i => i && i.length > 2)

  const instructionsArr = instructionsText
    .split(/\n|•|-/)
    .map(i => i.replace(/^\d+\.?\s*/, "").trim())
    .filter(i => i && i.length > 2)

  return { name, ingredientsArr, instructionsArr }
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
        <div className="absolute inset-0 bg-emerald-950/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-amber-300 mb-4">
            Discover Delicious Meals with AI 🍽️
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
            Enter your ingredients and let our smart chef whip up creative recipes just for you!
          </p>
        </motion.div>
      </section>

      {/* 🧠 MEAL MAKER SECTION */}
      <main className="w-full min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white px-6 py-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl bg-emerald-900/40 backdrop-blur-sm border border-emerald-700 rounded-xl shadow-xl p-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-amber-300">
            🍳 AI Meal Maker
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <input
              type="text"
              placeholder="e.g. chicken, rice, spinach"
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                loading
                  ? "bg-emerald-700 text-gray-300 cursor-not-allowed"
                  : "bg-amber-400 text-emerald-950 hover:bg-amber-300 hover:scale-105"
              }`}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
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

        {/* 🍽️ Generated Recipe */}
        {parsed && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full mt-12 bg-emerald-950/60 border-t border-emerald-700 py-16 px-6 md:px-20"
          >
            <h2 className="text-4xl font-bold text-amber-300 text-center mb-10 underline decoration-amber-400/70">
              {parsed.name || "Your AI-Crafted Recipe"}
            </h2>

            {/* 🧂 Ingredients */}
            <div className="max-w-5xl mx-auto mb-10">
              <h3 className="text-2xl font-semibold text-amber-300 mb-4">🧂 Ingredients</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-emerald-100">
                {parsed.ingredientsArr.map((item, i) => (
                  <div
                    key={i}
                    className="bg-emerald-900/60 rounded-lg px-4 py-2 border border-emerald-700 text-sm text-left"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 👨‍🍳 Instructions */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-amber-300 mb-4">👨‍🍳 Instructions</h3>
              <div className="space-y-3 text-emerald-100 leading-relaxed">
                {parsed.instructionsArr.map((step, i) => (
                  <div
                    key={i}
                    className="bg-emerald-900/60 border border-emerald-700 rounded-lg px-4 py-3 text-sm"
                  >
                    <span className="text-amber-300 font-semibold mr-2">{i + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </>
  )
}
