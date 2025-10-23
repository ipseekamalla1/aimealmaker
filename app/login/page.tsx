"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/"); // redirect to home
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-10 py-12">
        <h1 className="text-3xl font-bold mb-6 text-amber-400">
          Welcome Back 
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md space-y-4 bg-emerald-950/50 border border-emerald-700 rounded-lg p-8 shadow-lg"
        >
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded font-semibold transition-all duration-300 ${
              loading
                ? "bg-emerald-700 text-gray-300 cursor-not-allowed"
                : "bg-amber-400 text-black hover:bg-amber-300"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-400 animate-pulse">{error}</p>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-amber-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>

      {/* Right side - Image & Caption */}
      <div className="relative w-1/2 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1600&q=80
"
          alt="Meal inspiration"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-emerald-950/60 flex flex-col items-center justify-center text-center px-8">
          <h2 className="text-4xl font-bold text-amber-300 mb-4">
            Discover Delicious Simplicity 🍴
          </h2>
          <p className="text-lg text-emerald-100 max-w-md">
            Plan your perfect meal effortlessly with MealMaker — log in to continue your culinary journey.
          </p>
        </div>
      </div>
    </div>
  );
}
