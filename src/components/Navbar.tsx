import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Books", path: "/all-books" },
    { name: "Borrow Summary", path: "/borrow-summary" },
  ];

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-500"
    }`;

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isSticky
          ? "bg-white/90 backdrop-blur-md shadow-md "
          : "bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand / Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            Library System
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 ${linkClass(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
