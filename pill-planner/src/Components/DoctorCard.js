
import React from 'react';
import { Calendar, Clock, Award } from 'lucide-react';

export default function DoctorCard({ doctor, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-2 text-gray-600">
            <Award className="w-4 h-4 mr-1" />
            <span>{doctor.experience} years experience</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Available: {doctor.availability.join(", ")}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>9:00 AM - 5:00 PM</span>
        </div>
      </div>
      
      <button
        onClick={() => onSelect(doctor.id)}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Book Appointment
      </button>
    </div>
  );
}


