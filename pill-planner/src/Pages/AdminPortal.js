import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaPills, FaFilePrescription, FaUserFriends } from "react-icons/fa";

function AdminPortal() {
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
            Welcome Admin!
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            You have the access to manage the data.
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
            <Link to="/doctor">
              <FaCalendarCheck className="text-blue-500 text-3xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Manage Doctors</h2>
              <p className="text-gray-600">
                You Can Add,Delete,Edit the data.
              </p>
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to="/medicines">
              <FaPills className="text-blue-500 text-3xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">
                Manage Medicine
              </h2>
              <p className="text-gray-600">
              You Can Add,Delete,Edit the data.
              </p>
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to="/prescription-analysis">
              <FaUserFriends className="text-blue-500 text-3xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">
                Manage users
              </h2>
              <p className="text-gray-600">
              You Can Add,Delete,Edit the data.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AdminPortal;




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



// import React, { useState } from 'react';

// const AdminPortal = () => {
//   const [activeTab, setActiveTab] = useState('medicine');
//   const [medicineData, setMedicineData] = useState([]);
//   const [doctorsData, setDoctorsData] = useState([]);
//   const [userData, setUserData] = useState([]);
//   const [formData, setFormData] = useState({});

//   const handleAdd = (data, setData) => {
//     setData([...data, { ...formData, id: Date.now() }]);
//     setFormData({});
//   };

//   const handleDelete = (id, data, setData) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const handleUpdate = (id, data, setData) => {
//     const updatedData = data.map((item) =>
//       item.id === id ? { ...item, ...formData } : item
//     );
//     setData(updatedData);
//     setFormData({});
//   };

//   const renderTable = (data, setData) => (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white rounded-md shadow-md">
//         <thead>
//           <tr className="bg-gray-200 text-gray-700">
//             {Object.keys(data[0] || {}).map((key) => (
//               <th key={key} className="py-2 px-4 text-left">
//                 {key}
//               </th>
//             ))}
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id} className="border-t">
//               {Object.values(item).map((value, index) => (
//                 <td key={index} className="py-2 px-4">
//                   {value}
//                 </td>
//               ))}
//               <td className="py-2 px-4 flex space-x-2">
//                 <button
//                   onClick={() => handleDelete(item.id, data, setData)}
//                   className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() =>
//                     handleUpdate(item.id, data, setData)
//                   }
//                   className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Update
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Admin Portal</h1>
//       <div className="flex justify-center space-x-4 mb-6">
//         {['medicine', 'doctors', 'users'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-lg ${
//               activeTab === tab
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-4">
//           Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data
//         </h2>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             if (activeTab === 'medicine') {
//               handleAdd(medicineData, setMedicineData);
//             } else if (activeTab === 'doctors') {
//               handleAdd(doctorsData, setDoctorsData);
//             } else {
//               handleAdd(userData, setUserData);
//             }
//           }}
//           className="flex space-x-4 mb-4"
//         >
//           <input
//             type="text"
//             placeholder="Enter details"
//             value={formData.name || ''}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//             className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <button
//             type="submit"
//             className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//           >
//             Add
//           </button>
//         </form>

//         {activeTab === 'medicine' &&
//           renderTable(medicineData, setMedicineData)}
//         {activeTab === 'doctors' &&
//           renderTable(doctorsData, setDoctorsData)}
//         {activeTab === 'users' && renderTable(userData, setUserData)}
//       </div>
//     </div>
//   );
// };

// export default AdminPortal;
