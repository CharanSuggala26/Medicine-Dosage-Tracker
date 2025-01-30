import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaPills, FaFilePrescription } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Pill-Planner</h1>
        <p className="text-gray-700 mt-3 text-lg max-w-xl mx-auto">
          Your health is in your hands. Let us help you keep it there.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.05 }}
        ><Link to='/appointment'>
          <FaCalendarCheck className="text-blue-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Book Appointment</h2>
          <p className="text-gray-600 mt-2">
            Book appointments with healthcare providers directly through the
            platform for convenient medical consultations.
          </p>
        
        </Link>

        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.05 }}
        ><Link to='/scheduling'>
          <FaPills className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Medicine Scheduling</h2>
          <p className="text-gray-600 mt-2">
            Easily schedule and track your medication doses to ensure timely
            and consistent treatment.
          </p>

          </Link>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <Link to='/medicine-analysis'>
          <FaFilePrescription className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Prescription Analysis</h2>
          <p className="text-gray-600 mt-2">
            Gain insights into your medication usage patterns and identify
            areas for improvement.
          </p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;