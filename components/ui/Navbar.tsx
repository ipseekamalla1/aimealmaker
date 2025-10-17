"use client"
import Link from "next/link"
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-black text-yellow-400 tracking-wide uppercase">
      {/* Logo */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Meal<span className="text-white">Maker</span></h1>
        <p className="text-xs text-gray-400">Since 2025</p>
      </div>

      {/* Links */}
      <ul className="flex gap-8 text-sm font-medium">
        <li><Link href="/" className="hover:text-white transition">Home</Link></li>
        <li><Link href="/recipes" className="hover:text-white transition">Recipes</Link></li>
        <li><Link href="/ai-meal" className="hover:text-white transition">AI Meal Maker</Link></li>
        <li><Link href="/about" className="hover:text-white transition">About</Link></li>
        <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
      </ul>

      {/* Right section */}
     <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-5 py-2 rounded-md bg-emerald-900 text-white font-semibold hover:bg-emerald-600 hover:text-black transition-all duration-300"
        >
          Log In
        </Link>
        <User className="w-5 h-5 " />
    
      </div>
    </nav>
  )
}
