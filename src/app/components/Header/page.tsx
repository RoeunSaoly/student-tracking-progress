import Link  from "next/link";
export default function Header(){
    return(
        <header className="px-6 py-4 md:px-12 md:py-6 bg-gray-50">
            {/* Logo placeholder */}
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                 <div className="flex items-center">    
                <div className="h-10 w-10 bg-blue-600 rounded-lg mr-3"></div>
                <span className="text-xl font-bold text-gray-800">ST-Progress</span>
                 </div>
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 font-medium hover:text-blue-600 transition">Home</Link>
                <Link href="/student" className="text-gray-700 font-medium hover:text-blue-600 transition">Student</Link>
                <Link href="/teacher" className="text-gray-700 font-medium hover:text-blue-600 transition">Teacher</Link>
                <Link href="/about" className="text-gray-700 font-medium hover:text-blue-600 transition">About</Link>

            </nav>
            {/* Login or Signup bottom */}
            <div className="flex items-center gap-2">
                 <Link href="/login"><button className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition">Login</button></Link>
                <Link href="/singup"> <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">SignUP</button>
                </Link> 
            </div>
            </div>
        </header>
    ); 
}