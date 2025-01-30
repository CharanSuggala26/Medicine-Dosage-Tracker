import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

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








