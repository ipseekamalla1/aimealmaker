"use client"
import { useState } from "react"

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
      setError("Network error — check your server or Ollama")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>🍳 AI Meal Maker</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter ingredients (e.g. chicken, rice, spinach)"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {recipe && (
        <div style={styles.resultBox}>
          <h2>Generated Recipe</h2>
          <pre style={styles.pre}>{recipe}</pre>
        </div>
      )}
    </main>
  )
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  resultBox: {
    backgroundColor: "black",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "20px",
    textAlign: "left" as const,
    color:"white"
  },
  pre: {
    whiteSpace: "pre-wrap" as const,
    fontSize: "1rem",
  },
}
