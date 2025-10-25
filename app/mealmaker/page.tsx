"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecipe("");
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i !== ""),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecipe(data.recipes);

        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 200);
      } else {
        setError(data.error || "Failed to generate recipe");
      }
    } catch {
      setError("Network error — check your server or AI service");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Parse AI text response
  const parseRecipe = (text: string) => {
    if (!text) return { name: "", ingredientsArr: [], instructionsArr: [] };

    const nameMatch = text.match(/(?:Recipe Name|Title|Name)[:\-]?\s*(.*)/i);
    const name = nameMatch ? nameMatch[1].trim() : "Your AI-Crafted Recipe";

    const parts = text.split(/(?:Ingredients|Ingredient List)[:\-]?/i);
    let ingredientsText = "";
    let instructionsText = "";

    if (parts.length > 1) {
      const subParts = parts[1].split(/(?:Instructions|Directions|Steps)[:\-]?/i);
      ingredientsText = subParts[0] || "";
      instructionsText = subParts[1] || "";
    } else {
      const lines = text.split("\n");
      const mid = Math.floor(lines.length / 2);
      ingredientsText = lines.slice(0, mid).join("\n");
      instructionsText = lines.slice(mid).join("\n");
    }

    const ingredientsArr = ingredientsText
      .split(/\n|•|-/)
      .map((i) => i.replace(/^\d+\.?\s*/, "").trim())
      .filter((i) => i && i.length > 2);

    const instructionsArr = instructionsText
      .split(/\n|•|-/)
      .map((i) => i.replace(/^\d+\.?\s*/, "").trim())
      .filter((i) => i && i.length > 2);

    return { name, ingredientsArr, instructionsArr };
  };

  const parsed = recipe ? parseRecipe(recipe) : null;

  // 💾 Save Recipe (only for logged-in users)
  const handleSave = async () => {
    if (!parsed || !session) {
      setError("You must be logged in to save recipes.");
      return;
    }

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: parsed.name,
          ingredients: parsed.ingredientsArr,
          steps: parsed.instructionsArr,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Recipe saved successfully!");
        setError("");
      } else {
        setError(data.error || "Failed to save recipe");
      }
    } catch {
      setError("Network error while saving recipe");
    }
  };

  return (
    <>
      {/* 🌄 HERO SECTION */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center z-0"
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
      <main className="relative w-full min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white px-6 py-20 flex flex-col items-center z-10">
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

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="e.g. chicken, rice, spinach"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
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

          {error && <p className="text-red-400 mt-4">{error}</p>}
          {message && <p className="text-green-400 mt-4">{message}</p>}
        </motion.div>

        {/* 🍽️ Generated Recipe */}
        {parsed && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full mt-12 flex flex-col items-center bg-emerald-950/60 border-t border-emerald-700 py-16 px-6 md:px-20 text-center"
          >
            <h2 className="text-4xl font-bold text-amber-300 mb-10">{parsed.name}</h2>

            {/* 🧂 Ingredients */}
            <div className="max-w-5xl mx-auto mb-10">
              <h3 className="text-2xl font-semibold text-amber-300 mb-4">
                🧂 Ingredients
              </h3>
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
            <div className="max-w-5xl mx-auto mb-10">
              <h3 className="text-2xl font-semibold text-amber-300 mb-4">
                👨‍🍳 Instructions
              </h3>
              <div className="space-y-3 text-emerald-100 leading-relaxed">
                {parsed.instructionsArr.map((step, i) => (
                  <div
                    key={i}
                    className="bg-emerald-900/60 border border-emerald-700 rounded-lg px-4 py-3 text-sm text-left"
                  >
                    <span className="text-amber-300 font-semibold mr-2">
                      {i + 1}.
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* 💾 POST RECIPE SECTION (Separate container) */}
      {session && parsed && (
        <section className="w-full bg-emerald-950 py-20 text-center border-t border-emerald-700">
          <h2 className="text-3xl font-bold text-amber-300 mb-6">Want to share your recipe?</h2>
          <button
            onClick={handleSave}
            className="px-10 py-4 bg-amber-400 text-emerald-950 rounded-md font-semibold hover:bg-amber-300 transition-all shadow-lg"
          >
            Post Recipe
          </button>
          {message && <p className="mt-4 text-green-400">{message}</p>}
          {error && <p className="mt-4 text-red-400">{error}</p>}
        </section>
      )}
    </>
  );
}
