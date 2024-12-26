import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaCog, FaEnvelope, FaShoppingBasket, FaShoppingCart, FaCalendar } from 'react-icons/fa';

function Sidebar({ isOpen }) {
  return (
    <div
      className={`fixed left-0 top-16 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaHome className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaInfoCircle className="h-5 w-5" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to="/shceduling"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaCalendar className="h-5 w-5" />
              <span>Shceduling</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaEnvelope className="h-5 w-5" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link
              to="/store"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span>Store</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;