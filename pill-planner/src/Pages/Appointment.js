import React, { useState, useMemo, useEffect } from "react";
import { Stethoscope } from "lucide-react";
import DoctorCard from "../Components/DoctorCard";
import AppointmentForm from "../Components/AppointmentForm";
import FilterBar from "../Components/FilterBar";
import MyAppointments from "../Components/MyAppointments";
import axios from "axios";

// const doctors = [
//   {
//     id: "1",
//     name: "Dr. Sarah Johnson",
//     specialty: "Cardiologist",
//     experience: 12,
//     image:
//       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
//     availability: ["Monday", "Wednesday", "Friday"],
//   },
//   {
//     id: "2",
//     name: "Dr. Michael Chen",
//     specialty: "Pediatrician",
//     experience: 8,
//     image:
//       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
//     availability: ["Tuesday", "Thursday", "Saturday"],
//   },
//   {
//     id: "3",
//     name: "Dr. Emily Williams",
//     specialty: "Dermatologist",
//     experience: 15,
//     image:
//       "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
//     availability: ["Monday", "Tuesday", "Thursday"],
//   },
// ];

function App() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4700/doctors/")
        .then((res) => {
          setDoctors(res.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Fetched", doctors);
    }
    fetchData();
    fetchData();
    fetchData();
    console.log(doctors);
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty = specialtyFilter
        ? doctor.specialty === specialtyFilter
        : true;
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecialty && matchesSearch;
    });
  }, [specialtyFilter, searchQuery, doctors]);

  const handleAppointmentSubmit = (data) => {
    const doctor = doctors.find((d) => d.id === data.doctorId);
    const appointment = {
      ...data,
      doctorName: doctor.name,
      specialty: doctor.specialty,
    };
    setAppointments((prev) => [...prev, appointment]);
    setSelectedDoctorId(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Book Healthcare Appointments
              </h1>
            </div>
            <button
              onClick={() => setShowAppointments(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              My Appointments ({appointments.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Doctors</h2>
          <p className="mt-2 text-gray-600">
            Choose from our experienced medical professionals and book your
            appointment today
          </p>
        </div>

        <FilterBar
          specialtyFilter={specialtyFilter}
          searchQuery={searchQuery}
          onSpecialtyChange={setSpecialtyFilter}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onSelect={setSelectedDoctorId}
            />
          ))}
        </div>

        {selectedDoctorId && (
          <AppointmentForm
            selectedDoctorId={selectedDoctorId}
            onSubmit={handleAppointmentSubmit}
            onClose={() => setSelectedDoctorId(null)}
          />
        )}

        {showAppointments && (
          <MyAppointments
            appointments={appointments}
            onClose={() => setShowAppointments(false)}
          />
        )}

        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
            Appointment booked successfully!
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

// import React, { useState, useMemo } from 'react';
// import { Stethoscope } from 'lucide-react';
// import DoctorCard from './components/DoctorCard';
// import AppointmentForm from './components/AppointmentForm';
// import FilterBar from './components/FilterBar';
// import MyAppointments from './components/MyAppointments';
// import { Doctor, AppointmentForm as AppointmentFormType, Appointment } from './types';

// // Mock data - This would come from MongoDB in a real application
// const doctors: Doctor[] = [
//   {
//     id: '1',
//     name: 'Dr. Sarah Johnson',
//     specialty: 'Cardiologist',
//     experience: 12,
//     image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
//     availability: ['Monday', 'Wednesday', 'Friday']
//   },
//   {
//     id: '2',
//     name: 'Dr. Michael Chen',
//     specialty: 'Pediatrician',
//     experience: 8,
//     image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
//     availability: ['Tuesday', 'Thursday', 'Saturday']
//   },
//   {
//     id: '3',
//     name: 'Dr. Emily Williams',
//     specialty: 'Dermatologist',
//     experience: 15,
//     image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
//     availability: ['Monday', 'Tuesday', 'Thursday']
//   }
// ];

// function App() {
//   const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [specialtyFilter, setSpecialtyFilter] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [showAppointments, setShowAppointments] = useState(false);

//   const filteredDoctors = useMemo(() => {
//     return doctors.filter((doctor) => {
//       const matchesSpecialty = specialtyFilter ? doctor.specialty === specialtyFilter : true;
//       const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesSpecialty && matchesSearch;
//     });
//   }, [specialtyFilter, searchQuery]);

//   const handleAppointmentSubmit = (data: AppointmentFormType) => {
//     const doctor = doctors.find(d => d.id === data.doctorId)!;
//     const appointment: Appointment = {
//       ...data,
//       doctorName: doctor.name,
//       specialty: doctor.specialty
//     };
//     setAppointments(prev => [...prev, appointment]);
//     setSelectedDoctorId(null);
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Stethoscope className="h-8 w-8 text-blue-600" />
//               <h1 className="ml-3 text-2xl font-bold text-gray-900">
//                 HealthCare Appointments
//               </h1>
//             </div>
//             <button
//               onClick={() => setShowAppointments(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//             >
//               My Appointments ({appointments.length})
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Our Doctors</h2>
//           <p className="mt-2 text-gray-600">
//             Choose from our experienced medical professionals and book your appointment today
//           </p>
//         </div>

//         <FilterBar
//           specialtyFilter={specialtyFilter}
//           searchQuery={searchQuery}
//           onSpecialtyChange={setSpecialtyFilter}
//           onSearchChange={setSearchQuery}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredDoctors.map((doctor) => (
//             <DoctorCard
//               key={doctor.id}
//               doctor={doctor}
//               onSelect={setSelectedDoctorId}
//             />
//           ))}
//         </div>

//         {selectedDoctorId && (
//           <AppointmentForm
//             selectedDoctorId={selectedDoctorId}
//             onSubmit={handleAppointmentSubmit}
//             onClose={() => setSelectedDoctorId(null)}
//           />
//         )}

//         {showAppointments && (
//           <MyAppointments
//             appointments={appointments}
//             onClose={() => setShowAppointments(false)}
//           />
//         )}

//         {showSuccess && (
//           <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
//             Appointment booked successfully!
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;
