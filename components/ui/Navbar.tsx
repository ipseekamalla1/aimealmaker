"use client";
import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar({ user }: { user: any }) {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-black text-yellow-400 tracking-wide uppercase">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Meal<span className="text-white">Maker</span>
        </h1>
        <p className="text-xs text-gray-400">Since 2025</p>
      </div>

      <ul className="flex gap-8 text-sm font-medium">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/recipes">Recipes</Link></li>
        <li><Link href="/mealmaker">AI Meal Maker</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-white">{user.email}</span>
            <Link
              href="/logout"
              className="px-4 py-2 bg-red-700 rounded-md hover:bg-red-500 text-white"
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2 rounded-md bg-emerald-900 text-white font-semibold hover:bg-emerald-600 hover:text-black transition-all duration-300"
          >
            Log In
          </Link>
        )}
        <User className="w-5 h-5" />
      </div>
    </nav>
  );
}
