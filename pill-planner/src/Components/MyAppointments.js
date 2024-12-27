import React from 'react';
import { Calendar, Clock, X } from 'lucide-react';

export default function MyAppointments({ appointments, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>
        
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No appointments booked yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                    <p className="text-gray-600">{appointment.specialty}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Reason for visit:</span> {appointment.symptoms}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}







// import React from 'react';
// import { Calendar, Clock, X } from 'lucide-react';
// import { Appointment } from '../types';

// interface MyAppointmentsProps {
//   appointments: Appointment[];
//   onClose: () => void;
// }

// export default function MyAppointments({ appointments, onClose }: MyAppointmentsProps) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//         >
//           <X className="w-6 h-6" />
//         </button>
        
//         <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>
        
//         {appointments.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">No appointments booked yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map((appointment, index) => (
//               <div
//                 key={index}
//                 className="border rounded-lg p-4 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
//                     <p className="text-gray-600">{appointment.specialty}</p>
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {new Date(appointment.date).toLocaleDateString()}
//                     </div>
//                     <div className="flex items-center mt-1">
//                       <Clock className="w-4 h-4 mr-1" />
//                       {appointment.time}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2 pt-2 border-t">
//                   <p className="text-sm text-gray-600">
//                     <span className="font-medium">Reason for visit:</span> {appointment.symptoms}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }