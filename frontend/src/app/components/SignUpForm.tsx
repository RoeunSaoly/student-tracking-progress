import Link from 'next/link';

export default function SignUpForm() {
  return (
    <div>
    <div className="fixed top-4 left-4 z-50">
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-700"
          viewBox="0 0 20 20"
          fill="currentColor"
          >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v4H7l3 3 3-3h-2V7z"
            clipRule="evenodd"
            />
        </svg>
        Home
      </Link>
      </div>
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Sign Up</h1>
        <p className="mt-2 text-gray-300">
          Aew you already have account?{''}
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium text-blue-600">
            Login Here
          </Link>
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-200 mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className="w-full px-4 py-3 border text-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-3 border text-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-3 border text-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="Create a password"
          />
        </div>
        <div>
          <label htmlFor="comfirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
            Comfirm password
          </label>
          <input
            id="comfirmPassword"
            type="comfirmPassword"
            className="w-full px-4 py-3 border text-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="Comfirm a password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 bg-blue-600 focus:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-700 transition duration-200"
        >
          SIGN UP
        </button>
      </form>
    </div>
    </div>
  );
}