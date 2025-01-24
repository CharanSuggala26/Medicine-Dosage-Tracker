// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { FaBars, FaUserCircle } from 'react-icons/fa';

// function Navbar({ toggleSidebar }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <nav className="bg-gray-800 fixed w-full z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <button
//               onClick={toggleSidebar}
//               className="text-gray-300 hover:text-white p-2"
//             >
//               <FaBars className="h-6 w-6" />
//             </button>
//             <div className="flex-shrink-0">
//               <Link to="/" className="text-white font-bold text-xl ml-2">
//                 Pill-Planner
//               </Link>
//             </div>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
//                 Home
//               </Link>
//               <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
//                 About
//               </Link>
//               <Link to="/services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
//                 Services
//               </Link>
//               <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
//                 Contact
//               </Link>
//               <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
//                 Login
//               </Link>
//             </div>
//             {/* Profile Icon */}
//             <button
//               onClick={() => navigate('/profile')}
//               className="ml-4 text-gray-300 hover:text-white p-2"
//             >
//               <FaUserCircle className="h-8 w-8" />
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-300 hover:text-white"
//             >
//               <FaBars className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';

function Navbar({ toggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page on logout
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
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
              {!isLoggedIn ? (
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
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
            {/* Profile Icon */}
            {isLoggedIn && (
              <button
                onClick={() => navigate('/profile')}
                className="ml-4 text-gray-300 hover:text-white p-2"
              >
                <FaUserCircle className="h-8 w-8" />
              </button>
            )}
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
      </div>
    </nav>
  );
}

export default Navbar;
