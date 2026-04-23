"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Student", href: "/student" },
  { label: "Teacher", href: "/teacher" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative px-4 py-1.5 rounded-md text-sm font-medium transition-colors no-underline
                ${pathname === link.href
                  ? "text-blue-600 bg-blue-50 font-semibold"
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors no-underline"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-1.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-px active:translate-y-0 no-underline"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => { setMenuOpen(false); }}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline
                ${pathname === link.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-3 mt-1 border-t border-gray-100">
            <Link href="/login" className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors no-underline">
              Login
            </Link>
            <Link href="/signup" className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors no-underline">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
