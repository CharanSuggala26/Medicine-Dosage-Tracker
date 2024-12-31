import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contact');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [notificationPreference, setNotificationPreference] = useState(true);

  const user = {
    name: 'John Doe',
    bio: 'Passionate developer and tech enthusiast',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    social: {
      twitter: '@johndoe',
      facebook: 'facebook.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
    },
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);

  const handleSave = () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }
    alert('Profile updated successfully!');
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        <div className="flex items-center mb-6">
          <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p>{user.bio}</p>
          </div>
        </div>

        <div className="border-b mb-4">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 ${activeTab === 'contact' ? 'text-blue-600 font-bold' : ''}`}
          >
            Contact Info
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 ${activeTab === 'social' ? 'text-blue-600 font-bold' : ''}`}
          >
            Social Links
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 ${activeTab === 'settings' ? 'text-blue-600 font-bold' : ''}`}
          >
            Settings
          </button>
        </div>

        {activeTab === 'contact' && (
          <div>
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <label className="block my-2 font-bold">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            <p>
              <FaTwitter className="inline mr-2" /> {user.social.twitter}
            </p>
            <p>
              <FaFacebook className="inline mr-2" /> {user.social.facebook}
            </p>
            <p>
              <FaLinkedin className="inline mr-2" /> {user.social.linkedin}
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <label className="block mb-2 font-bold">Notifications</label>
            <input
              type="checkbox"
              checked={notificationPreference}
              onChange={() => setNotificationPreference(!notificationPreference)}
              className="mr-2"
            />
            Enable Notifications
          </div>
        )}

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;








// import React, { useState } from 'react';
// import { FaEnvelope, FaPhone, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
// import { IoMdSettings } from 'react-icons/io';

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('contact');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [notificationPreference, setNotificationPreference] = useState(false);

//   const user = {
//     name: 'John Doe',
//     bio: 'Passionate developer and tech enthusiast',
//     image: 'https://randomuser.me/api/portraits/men/1.jpg',
//   };

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };

//   const validatePhone = (phone) => {
//     const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
//     return re.test(phone);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" aria-modal="true" role="dialog">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md animate-fade-in-down">
//         <div className="flex items-start mb-6">
//           <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full border-4 border-blue-200 hover:border-blue-300 transition-all duration-300" />
//           <div className="ml-4">
//             <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//             <p className="text-gray-600 mt-1">{user.bio.length > 100 ? `${user.bio.substring(0, 97)}...` : user.bio}</p>
//           </div>
//         </div>

//         <div className="mb-6">
//           <div className="flex border-b border-gray-200">
//             <button
//               className={`py-2 px-4 ${activeTab === 'contact' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('contact')}
//             >
//               Contact Info
//             </button>
//             <button
//               className={`py-2 px-4 ${activeTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('settings')}
//             >
//               Settings
//             </button>
//           </div>
//         </div>

//         {activeTab === 'contact' && (
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 <FaEnvelope className="inline mr-2" />
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${!validateEmail(email) && email ? 'border-red-300' : ''}`}
//                 placeholder="Enter your email"
//               />
//               {!validateEmail(email) && email && (
//                 <p className="mt-1 text-sm text-red-600">Please enter a valid email address.</p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                 <FaPhone className="inline mr-2" />
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${!validatePhone(phone) && phone ? 'border-red-300' : ''}`}
//                 placeholder="Enter your phone number"
//               />
//               {!validatePhone(phone) && phone && (
//                 <p className="mt-1 text-sm text-red-600">Please enter a valid phone number.</p>
//               )}
//             </div>
//             <div className="flex space-x-4">
//               <a href="#" className="text-blue-500 hover:text-blue-600">
//                 <FaTwitter className="inline mr-1" /> Twitter
//               </a>
//               <a href="#" className="text-blue-500 hover:text-blue-600">
//                 <FaFacebook className="inline mr-1" /> Facebook
//               </a>
//               <a href="#" className="text-blue-500 hover:text-blue-600">
//                 <FaLinkedin className="inline mr-1" /> LinkedIn
//               </a>
//             </div>
//           </div>
//         )}

//         {activeTab === 'settings' && (
//           <div className="space-y-4">
//             <div className="border-b pb-4">
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Preferences</h3>
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={notificationPreference}
//                   onChange={() => setNotificationPreference(!notificationPreference)}
//                   className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                 />
//                 <span className="ml-2 text-gray-700">Receive email notifications</span>
//               </label>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Account Security</h3>
//               <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
//                 <IoMdSettings className="inline mr-2" />
//                 Change Password
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

