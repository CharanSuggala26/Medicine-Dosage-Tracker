import React from 'react';
import { X } from 'lucide-react';

export default function AppointmentForm({ onSubmit, onClose, selectedDoctorId }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      doctorId: selectedDoctorId,
      symptoms: formData.get('symptoms'),
    };
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Preferred Time
            </label>
            <select
              id="time"
              name="time"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
              Symptoms/Reason for Visit
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}






// import React from 'react';
// import { X } from 'lucide-react';
// import { AppointmentForm as AppointmentFormType } from '../types';

// interface AppointmentFormProps {
//   onSubmit: (data: AppointmentFormType) => void;
//   onClose: () => void;
//   selectedDoctorId: string;
// }

// export default function AppointmentForm({ onSubmit, onClose, selectedDoctorId }: AppointmentFormProps) {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const data: AppointmentFormType = {
//       name: formData.get('name') as string,
//       email: formData.get('email') as string,
//       phone: formData.get('phone') as string,
//       date: formData.get('date') as string,
//       time: formData.get('time') as string,
//       doctorId: selectedDoctorId,
//       symptoms: formData.get('symptoms') as string,
//     };
//     onSubmit(data);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//         >
//           <X className="w-6 h-6" />
//         </button>
        
//         <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="date" className="block text-sm font-medium text-gray-700">
//               Preferred Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="time" className="block text-sm font-medium text-gray-700">
//               Preferred Time
//             </label>
//             <select
//               id="time"
//               name="time"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             >
//               <option value="">Select a time</option>
//               <option value="09:00">9:00 AM</option>
//               <option value="10:00">10:00 AM</option>
//               <option value="11:00">11:00 AM</option>
//               <option value="14:00">2:00 PM</option>
//               <option value="15:00">3:00 PM</option>
//               <option value="16:00">4:00 PM</option>
//             </select>
//           </div>
          
//           <div>
//             <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
//               Symptoms/Reason for Visit
//             </label>
//             <textarea
//               id="symptoms"
//               name="symptoms"
//               required
//               rows={3}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             ></textarea>
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Confirm Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

