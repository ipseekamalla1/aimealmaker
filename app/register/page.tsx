"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500); // redirect to login page
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side - Photo & Caption */}
      <div className="relative w-1/2 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
          alt="Healthy meal"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-emerald-950/60 flex flex-col items-center justify-center text-center px-8">
          <h2 className="text-4xl font-bold text-amber-300 mb-4">
            Start Your Flavor Journey 🍲
          </h2>
          <p className="text-lg text-emerald-100 max-w-md">
            Join MealMaker today and explore recipes crafted from your favorite
            ingredients.
          </p>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-10 py-12">
        <h1 className="text-3xl font-bold mb-6 text-amber-400">
          Create an Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md space-y-4 bg-emerald-950/50 border border-emerald-700 rounded-lg p-8 shadow-lg"
        >
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type={key === "password" ? "password" : "text"}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="p-3 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              value={(form as any)[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              required
            />
          ))}
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded font-semibold transition-all duration-300 ${
              loading
                ? "bg-emerald-700 text-gray-300 cursor-not-allowed"
                : "bg-amber-400 text-black hover:bg-amber-300"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-amber-300 animate-pulse">{message}</p>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-amber-400 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
