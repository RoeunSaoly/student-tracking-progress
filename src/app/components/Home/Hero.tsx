import Image from 'next/image';
export default function Heros(){
     return (
    <section className="px-6 py-12 md:px-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Track your study progress daily
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
              Student Progress Tracker helps you monitor what you learn and where you stand. See your growth in real time and stay motivated to reach your goals.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg text-lg">
                Get Started
              </button>
              <button className="bg-white text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition border-2 border-blue-600 text-lg">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Right column - Illustration/image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl h-80 w-full shadow-xl">
                <Image
                  src="/images/hero.png"
                  alt="Student Progress Tracker"
                  width={500}
                  height={500}
                  className="rounded-2xl"
                />
              </div>
              <div className="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-lg w-64">
                <div className="text-sm text-gray-500">Daily Progress</div>
                <div className="text-2xl font-bold mt-2">85% Complete</div>
                <div className="mt-4 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg w-64">
                <div className="text-sm text-gray-500">Current Streak</div>
                <div className="text-2xl font-bold mt-2">14 Days</div>
                <div className="mt-4 flex space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-10 w-8 rounded-md bg-green-400"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}