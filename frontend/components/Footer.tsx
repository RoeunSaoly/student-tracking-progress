export default function Footer() {
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
