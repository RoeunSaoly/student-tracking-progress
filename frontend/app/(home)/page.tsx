'use client';

import { Star, Users, BookOpen, Award, Globe } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-slate-50 to-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Track your study progress daily
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Student Progress Tracker helps you monitor your learning and stay motivated to reach your goals.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold">
                  Get Started
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded font-semibold">
                  Learn
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <p className="text-2xl font-bold text-gray-900">50K+</p>
                  <p className="text-gray-600">Active Learners</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">1,500+</p>
                  <p className="text-gray-600">Online Classes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.85</p>
                  <p className="text-gray-600">Rating</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/Home/heroimg.svg" 
                alt="Study" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-600">Active Learners</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">1,500+</div>
              <p className="text-gray-600">Online Classes</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
              <p className="text-gray-600">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - What we offer */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What we offer</h2>
            <p className="text-lg text-gray-600">Everything you need to succeed in your studies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Track</h3>
                <p className="text-gray-600 mb-4">Monitor your daily progress and watch yourself grow</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Explore →</a>
                <div className="mt-6 rounded-lg overflow-hidden h-32 bg-gray-200">
                  <img 
                    src="/Home/feature1.svg" 
                    alt="Track" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Feature 2 */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Goal</h3>
                <p className="text-gray-600 mb-4">Set targets and measure your performance against goals</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Explore →</a>
                <div className="mt-6 rounded-lg overflow-hidden h-32 bg-gray-200">
                  <img 
                    src="/Home/feature2.svg" 
                    alt="Goal" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Feature 3 */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h3>
                <p className="text-gray-600 mb-4">Understand your study patterns with detailed insights</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Explore →</a>
                <div className="mt-6 rounded-lg overflow-hidden h-32 bg-gray-200">
                  <img 
                    src="/Home/feature3.svg" 
                    alt="Analytics" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold mb-2">Simple</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works for you</h2>
            <p className="text-lg text-gray-600">Getting started takes minutes. No long or straightforward steps so you can focus on what matters most, your studies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-lg">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create account</h3>
              <p className="text-gray-600">Sign up and set up your profile in under two minutes.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-lg">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Log sessions</h3>
              <p className="text-gray-600">Record your study time and subjects as you work through them.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-lg">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Review results</h3>
              <p className="text-gray-600">Check your progress charts and adjust your approach as needed.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <img 
              src="/Home/TabPane.svg" 
              alt="How it works" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stories/Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories</h2>
            <p className="text-lg text-gray-600">Real students, real results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4 gap-1">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "This tool changed how I study. I can see exactly where I spend my time and what I need to focus on. My grades have improved significantly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                    alt="Student" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Chen</p>
                  <p className="text-gray-600 text-sm">College student</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4 gap-1">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "I went from scattered notes to a clear picture of my progress. My grades improved and I feel more organized than ever before."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                    alt="Student" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Marcus Rodriguez</p>
                  <p className="text-gray-600 text-sm">High school junior</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4 gap-1">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Finally, something that makes studying feel less overwhelming and more rewarding. The analytics helped me optimize my study sessions."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" 
                    alt="Student" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emma Williams</p>
                  <p className="text-gray-600 text-sm">Graduate student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
