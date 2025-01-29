import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

function Navbar({ toggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (window.localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
  };

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
                Pill-Planner
              </Link>
            </div>
          </div>

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

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
