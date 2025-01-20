import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaPills, FaFilePrescription } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to Pill-Planner
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Your health is in your hands. Let us help you keep it there.
          </p>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to="/appointment">
              <FaCalendarCheck className="text-blue-500 text-3xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
              <p className="text-gray-600">
                Book appointments with healthcare providers directly through the
                platform for convenient medical consultations.
              </p>
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to="/shceduling">
              <FaPills className="text-blue-500 text-3xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">
                Medicine Scheduling
              </h2>
              <p className="text-gray-600">
                Easily schedule and track your medication doses to ensure timely
                and consistent treatment.
              </p>
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to="/medicine-analysis">
              <FaFilePrescription className="text-blue-500 text-3xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">
                Prescription Analysis
              </h2>
              <p className="text-gray-600">
                Gain insights into your medication usage patterns and identify
                areas for improvement.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;




// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8">
//             Welcome to Pill-Planner
//           </h1>
//           <p className="text-xl text-gray-600 mb-12">
//             Your health is in your hands, Let us help you keep it there
//           </p>
//         </div>
       
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <Link to="/appointment">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
//             <p className="text-gray-600">
//               Book appointments with healthcare providers directly through the platform for convenient medical consultations.
//             </p>
//           </div>
//           </Link>
//           <Link to="/shceduling">
//             <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
//               <h2 className="text-xl font-semibold mb-4">Medicine Scheduling</h2>
//               <p className="text-gray-600">
//                 Easily schedule and track your medication doses to ensure timely and consistent treatment.
//               </p>
//             </div>
//           </Link>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Prescription Analysis</h2>
//             <p className="text-gray-600">
//               Gain insights into your medication usage patterns and identify areas for improvement.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
