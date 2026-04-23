"use client";

import Link from "next/link";

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

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm pt-10 pb-6 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-gray-300 leading-relaxed text-xs">
              Empowering learners worldwide with quality education and expert-led courses.
            </p>
            <div className="flex gap-3 mt-4">
              {["f", "𝕏", "in", "in", "▶"].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xs text-gray-300 transition">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Product", links: ["Courses", "Pricing", "For Business", "Mobile App"] },
            { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
            { title: "Support", links: ["Help Center", "Contact Us", "FAQ", "System Status"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-gray-200 font-semibold mb-3">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-gray-200 transition text-xs">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2025 LearnHub. All rights reserved.</span>
          <div className="flex gap-4">
            <span>English</span>
            <span>USD $</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
