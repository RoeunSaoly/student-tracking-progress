"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden flex">

          {/* Left: Form */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-800 mb-1">Sign Up</h1>
            <p className="text-sm text-gray-500 mb-6">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Login here
              </Link>
            </p>

            <div className="flex flex-col gap-3 mb-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <button className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold tracking-wide uppercase transition active:scale-95">
              Sign Up
            </button>
          </div>

          {/* Right: Promo panel */}
          <div className="hidden sm:flex w-56 flex-col justify-center p-8 bg-linear-to-br from-purple-500 via-blue-500 to-blue-400 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute bottom-6 right-4 w-24 h-24 rounded-lg bg-white/10 rotate-12" />
            <div className="absolute bottom-14 right-10 w-16 h-16 rounded-lg bg-white/10 rotate-45" />
            <div className="absolute top-6 left-4 w-12 h-12 rounded-lg bg-white/10 -rotate-12" />

            <h2 className="text-white text-2xl font-bold leading-tight mb-3 relative z-10">
              Welcome<br />Back.
            </h2>
            <p className="text-white/80 text-xs leading-relaxed relative z-10">
              Lorem factorul non egestur quis pro nam his eccurrit dictum nela dictuur. Track your progress and achieve your study goals with our comprehensive platform.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
