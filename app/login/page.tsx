'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => router.push('/'), 1500);
    } else {
      setMessage(data.error || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-[#0f0f0f] text-white px-10">
        <h1 className="text-4xl font-bold mb-6">Welcome Back to Meal Maker!</h1>
        <p className="text-gray-400 mb-6">
          Sign in and continue planning delicious meals
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded font-semibold transition"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}

        <p className="mt-6 text-gray-400 text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-orange-400 hover:underline">
            Register here
          </a>
        </p>
      </div>

      {/* Right side - Food Photo & Caption */}
      <div className="relative w-1/2 hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
          alt="Meal Maker Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-10">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Plan, Cook, and Savor Every Bite 🍲
          </h2>
          <p className="text-gray-200 text-lg max-w-md">
            Log in to create meal plans, explore recipes, and make every meal meaningful.
          </p>
        </div>
      </div>
    </div>
  );
}
