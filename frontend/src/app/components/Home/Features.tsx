// app/components/WhatWeOffer.js
export default function Feature() {
     const features = [
    {
      title: "Track",
      heading: "Monitor your daily progress",
      description: "Log your study sessions and watch your advancement grow",
      pattern: "pattern-grid",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "Goal",
      heading: "Set targets and stay accountable",
      description: "Define what matters and measure yourself against it",
      pattern: "pattern-dots",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "Analytics",
      heading: "Understand your study patterns",
      description: "See where your time goes and optimize your effort",
      pattern: "pattern-lines",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everythings you need to track your progress and stay accountable
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              {/* Card with pattern */}
              <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
                {/* Pattern background */}
                <div className={`absolute inset-0 ${feature.color} opacity-10`}></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full bg-white/95 backdrop-blur-sm">
                  {/* Decorative number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors">
                    0{index + 1}
                  </div>
                  
                  {/* Title badge */}
                  <div className="inline-block mb-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg font-semibold">
                      {feature.title}
                    </span>
                  </div>
                  
                  {/* Heading */}
                  <h3 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {feature.heading}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  {/* Explore button */}
                  <div className="mt-auto">
                    <button className="inline-flex items-center text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">
                      <span>Explore Feature</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </div>
              
              {/* Floating elements on hover */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-100 opacity-0 group-hover:opacity-100 shadow-lg transform rotate-12 transition-all duration-300 pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 opacity-0 group-hover:opacity-100 shadow-lg transform -rotate-12 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}