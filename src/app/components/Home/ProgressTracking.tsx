'use client';

import { useEffect, useState } from 'react';

const stats = [
  {
    value: 50000,
    suffix: '+',
    label: 'Active Learners',
    color: 'bg-blue-100 text-blue-700',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    )
  },
  {
    value: 1500,
    suffix: '+',
    label: 'Online Classes',
    color: 'bg-green-100 text-green-700',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    )
  },
  {
    value: 500,
    suffix: '+',
    label: 'Expert Instructors',
    color: 'bg-purple-100 text-purple-700',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    )
  },
  {
    value: 100,
    suffix: '+',
    label: 'Countries Reached',
    color: 'bg-orange-100 text-orange-700',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
];


export default function ProgressTrackings() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    () => stats.map(() => 0)
  );
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timers = stats.map((stat, index) => {
      let step = 0;

      return setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedValues(prev => {
          const updated = [...prev];
          updated[index] = Math.min(
            Math.floor(stat.value * progress),
            stat.value
          );
          return updated;
        });

        if (step === steps) clearInterval(timers[index]);
      }, interval);
    });

    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Global Impact
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of learners worldwide who are transforming their
            education with our platform
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`inline-flex items-center justify-center h-20 w-20 rounded-full ${stat.color} mb-4`}
              >
                {stat.icon}
              </div>

              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {animatedValues[index].toLocaleString()}
                {stat.suffix}
              </div>

              <p className="text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
