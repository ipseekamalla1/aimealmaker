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

  return (
    <>
      <Navbar />

      {/* 🥦 HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/mealmaker-hero.webp')" }}>
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
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl bg-emerald-900/40 backdrop-blur-sm border border-emerald-700 rounded-xl shadow-xl p-8 text-center"
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
              className="flex-1 px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                loading
                  ? "bg-emerald-700 text-gray-300 cursor-not-allowed"
                  : "bg-amber-400 text-emerald-950 hover:bg-amber-300 hover:scale-105"
              }`}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </motion.button>
          </form>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 mt-4 font-medium animate-pulse"
            >
              {error}
            </motion.p>
          )}

          {recipe && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-left bg-emerald-950 border border-emerald-700 rounded-lg p-6 shadow-inner"
            >
              <h2 className="text-2xl font-semibold text-amber-300 mb-3">
                Generated Recipe
              </h2>
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-emerald-100">
                {recipe}
              </pre>
            </motion.div>
          )}
        </motion.div>
      </main>
    </>
  )
}
