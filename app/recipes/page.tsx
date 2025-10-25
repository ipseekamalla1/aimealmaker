'use client';
import { useEffect, useState } from 'react';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((r: any) => ({
          ...r,
          ingredients: JSON.parse(r.ingredients || '[]'),
          steps: JSON.parse(r.steps || '[]'),
        }));
        setRecipes(formatted);
      })
      .catch((err) => console.error('Error fetching recipes:', err));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-950 text-white">
      {/* 🌟 Hero Section */}
      <div className="relative h-72 w-full mb-12">
        <img
          src="/images/hero-recipes.jpg"
          alt="Delicious dishes background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-emerald-900/70 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-amber-300 mb-3">
            🍽 Explore Recipes
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Discover tasty dishes shared by our amazing community
          </p>
        </div>
      </div>

      {/* 🧁 Recipes Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-400">No recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((r) => (
              <div
                key={r.id}
                className="flex flex-col justify-between bg-emerald-900/70 border border-emerald-700 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                {/* 🍲 Image placeholder (you can replace with recipe.image later) */}
                <div className="h-48 bg-emerald-800 flex items-center justify-center text-amber-200 text-lg">
                  🍲 Recipe Image
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-amber-300 mb-3">
                      {r.title}
                    </h2>

                    {/* Ingredient Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {r.ingredients.slice(0, 3).map((ing: string, i: number) => (
                        <span
                          key={i}
                          className="bg-amber-400/20 border border-amber-400/30 text-amber-200 text-xs px-3 py-1 rounded-full"
                        >
                          {ing}
                        </span>
                      ))}
                      {r.ingredients.length > 3 && (
                        <span className="text-emerald-300 text-sm">
                          +{r.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ✅ View More Button (always visible) */}
                  <div className="mt-auto pt-4">
                    <button
                      className="w-full bg-amber-400 text-emerald-900 font-semibold py-2 rounded-lg hover:bg-amber-300 transition"
                      onClick={() => alert(`Viewing details for ${r.title}`)}
                    >
                      View More
                    </button>

                    <small className="block mt-3 text-sm text-emerald-400 text-center">
                      Posted by{' '}
                      <span className="font-medium">
                        {r.user?.username || 'Anonymous'}
                      </span>
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
