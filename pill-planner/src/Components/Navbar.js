import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar({ toggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white p-2"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl ml-2">
                Logo
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                About
              </Link>
              <Link to="/services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Services
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Contact
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md">
                About
              </Link>
              <Link to="/services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md">
                Services
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md">
                Contact
              </Link>
              <Link to="/store" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md">
                Store
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;