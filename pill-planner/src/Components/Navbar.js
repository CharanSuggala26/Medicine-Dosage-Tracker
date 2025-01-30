import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar({ toggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const checkLogin = () => {
    setIsLoggedIn(!!window.localStorage.getItem("token"));
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("cart");
    navigate("/login");
    setIsMenuOpen(false); // Close menu on logout
  };

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 fixed w-full z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white p-2"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl ml-2">
                Pill-Planner
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/home"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
              >
                Contact
              </Link>
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-16 left-0 w-full bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-2 py-4 px-6">
          <Link to="/home" className="hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/services" className="hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <Link to="/contact" className="hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          {!isLoggedIn ? (
            <Link to="/login" className="hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="hover:bg-gray-700 px-4 py-2 rounded">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
