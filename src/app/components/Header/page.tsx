// components/Header.tsx
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, User, Home, BookOpen, Users } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { 
      name: "Home", 
      href: "/", 
      icon: Home 
    },
    { 
      name: "Student", 
      href: "/student", 
      icon: User 
    },
    { 
      name: "Teacher", 
      href: "/teacher", 
      icon: Users 
    },
    { 
      name: "About", 
      href: "/about", 
      icon: BookOpen 
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ST</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              ST-Progress
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-100' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className={`w-4 h-4 ${active ? 'text-blue-500' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Login/Signup Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <button className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${active 
                        ? 'bg-blue-50 text-blue-600 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${active ? 'text-blue-500' : 'text-gray-400'}`} />
                    {item.name}
                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </Link>
                );
              })}
              
              {/* Mobile Login/Signup Buttons */}
              <div className="pt-4 px-4 space-y-3 border-t">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full text-gray-700 font-medium px-4 py-3 rounded-lg border hover:bg-gray-50 transition">
                    Login
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-blue-600 text-white font-medium px-4 py-3 rounded-lg hover:bg-blue-700 transition">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}