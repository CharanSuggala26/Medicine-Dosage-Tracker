import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaCalendar,
  FaCashRegister,
  FaStopwatch,
} from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";

function Sidebar({ isOpen }) {
  return (
    <div
      className={`fixed left-0 top-16 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
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
              to="/workout"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <GiWeightLiftingUp className="h-5 w-5" />
              <span>Workout</span>
            </Link>
          </li>
          <li>
            <Link
              to="/scheduling"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaCalendar className="h-5 w-5" />
              <span>Scheduling</span>
            </Link>
          </li>
          <li>
            <Link
              to="/appointment"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaCashRegister className="h-5 w-5" />
              <span>Book Appointment</span>
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
          <li>
            <Link
              to="/stats"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaStopwatch className="h-5 w-5" />
              <span>Stats dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
