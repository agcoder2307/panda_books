import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to={"/"}>
          <h1 className="text-xl font-bold text-blue-700">E-ReadBook</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#about" className="text-gray-800 hover:text-blue-600">
            About
          </a>
          <a href="#books" className="text-gray-800 hover:text-blue-600">
            Books
          </a>
          <a href="#slideshow" className="text-gray-800 hover:text-blue-600">
            Slideshow
          </a>
          <a href="#video" className="text-gray-800 hover:text-blue-600">
            Video
          </a>
          <a href="#contact" className="text-gray-800 hover:text-blue-600">
            Contact
          </a>
          <Link to={"/login"}>
            <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-50 px-4 pb-4 space-y-2">
          <a href="#about" className="block text-gray-800 hover:text-blue-600">
            About
          </a>
          <a href="#books" className="block text-gray-800 hover:text-blue-600">
            Books
          </a>
          <a
            href="#slideshow"
            className="block text-gray-800 hover:text-blue-600"
          >
            Slideshow
          </a>
          <a href="#video" className="block text-gray-800 hover:text-blue-600">
            Video
          </a>
          <a
            href="#contact"
            className="block text-gray-800 hover:text-blue-600"
          >
            Contact
          </a>
          <Link to={"/login"}>
            <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
