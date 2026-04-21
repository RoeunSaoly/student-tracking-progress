export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">StudyTracker</div>
        <div className="flex gap-8 items-center">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">Subjects</a>
          <a href="#" className="hover:text-blue-400">Tracker</a>
          <a href="#" className="hover:text-blue-400">About</a>
          <button className="text-white hover:text-blue-400">Login</button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold">Sign Up</button>
        </div>
      </nav>
    </header>
  );
}
