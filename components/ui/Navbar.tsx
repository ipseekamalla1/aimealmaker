"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full shadow-lg z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Meal Maker Logo"
            className="w-10 h-10 rounded-full border-2 border-amber-200"
          />
          <h1 className="text-stone-100 text-xl font-semibold tracking-wide">
            Meal Maker
          </h1>
        </div>

        {/* Center - Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-stone-100 text-sm lg:text-base font-medium hover:text-amber-400 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-stone-100 text-sm lg:text-base font-medium hover:text-amber-400 transition-all duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/recipes"
              className="text-stone-100 text-sm lg:text-base font-medium hover:text-amber-400 transition-all duration-300"
            >
              Recipes
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-stone-100 text-sm lg:text-base font-medium hover:text-amber-400 transition-all duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right - Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md border border-lime-900 text-stone-100 hover:bg-lime-700 hover:border-lime-900 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-md bg-lime-900 text-stone-100 font-semibold hover:bg-lime-700 hover:text-stone-100 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
