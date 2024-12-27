import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from '../Components/ContactForm';
import FAQ from '../Components/FAQ';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Have questions? We're here to help and answer any question you might have.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-600">
            123 Healthcare Ave<br />
            Medical District<br />
            New York, NY 10001
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600">
            Mon-Fri from 8am to 5pm<br />
            <a href="tel:+1234567890" className="text-blue-600 hover:underline">
              +1 (234) 567-890
            </a>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600">
            Send us an email<br />
            <a href="mailto:support@healthcare.com" className="text-blue-600 hover:underline">
              support@healthcare.com
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactForm />
        <FAQ />
      </div>
    </div>
  );
}


// import React from 'react';
// import { MapPin, Phone, Mail } from 'lucide-react';
// import ContactForm from '../components/ContactForm';
// import FAQ from '../components/FAQ';

// export default function Contact() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//       <div className="text-center mb-12">
//         <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
//         <p className="mt-4 text-lg text-gray-600">
//           Have questions? We're here to help and answer any question you might have.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
//           <div className="bg-blue-100 p-3 rounded-full mb-4">
//             <MapPin className="w-6 h-6 text-blue-600" />
//           </div>
//           <h3 className="font-semibold mb-2">Visit Us</h3>
//           <p className="text-gray-600">
//             123 Healthcare Ave<br />
//             Medical District<br />
//             New York, NY 10001
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
//           <div className="bg-blue-100 p-3 rounded-full mb-4">
//             <Phone className="w-6 h-6 text-blue-600" />
//           </div>
//           <h3 className="font-semibold mb-2">Call Us</h3>
//           <p className="text-gray-600">
//             Mon-Fri from 8am to 5pm<br />
//             <a href="tel:+1234567890" className="text-blue-600 hover:underline">
//               +1 (234) 567-890
//             </a>
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
//           <div className="bg-blue-100 p-3 rounded-full mb-4">
//             <Mail className="w-6 h-6 text-blue-600" />
//           </div>
//           <h3 className="font-semibold mb-2">Email Us</h3>
//           <p className="text-gray-600">
//             Send us an email<br />
//             <a href="mailto:support@healthcare.com" className="text-blue-600 hover:underline">
//               support@healthcare.com
//             </a>
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <ContactForm />
//         <FAQ />
//       </div>
//     </div>
//   );
// }