import axios from "axios";
import React, { useState, useEffect } from "react";
import { Trash2, Edit2, PlusCircle, User, Stethoscope, Calendar, Clock, ImageIcon } from 'lucide-react';

const AdminDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    image: "",
    availability: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:4700/doctors/");
        setDoctors(res.data.payload);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    }
    fetchData();
  }, []);

  const handleAdd = async () => {
    const newDoctor = {
      ...formData,
      experience: parseInt(formData.experience, 10),
      availability: formData.availability.split(",").map((day) => day.trim()),
    };

    try {
      const res = await axios.post("http://localhost:4700/doctors/add", newDoctor);
      setDoctors([...doctors, { ...newDoctor, _id: res.data.payload.insertedId }]);
      setFormData({ name: "", specialty: "", experience: "", image: "", availability: "" });
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4700/doctors/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  const handleEdit = (id) => {
    const doctorToEdit = doctors.find((doctor) => doctor._id === id);
    if (doctorToEdit) {
      setFormData({
        name: doctorToEdit.name,
        specialty: doctorToEdit.specialty,
        experience: doctorToEdit.experience.toString(),
        image: doctorToEdit.image,
        availability: doctorToEdit.availability.join(", "),
      });
      setEditingId(id);
    }
  };

  const handleUpdate = async () => {
    const updatedDoctor = {
      ...formData,
      experience: parseInt(formData.experience, 10),
      availability: formData.availability.split(",").map((day) => day.trim()),
    };

    try {
      await axios.put(`http://localhost:4700/doctors/${editingId}`, updatedDoctor);
      setDoctors(
        doctors.map((doctor) =>
          doctor._id === editingId ? { ...doctor, ...updatedDoctor } : doctor
        )
      );
      setEditingId(null);
      setFormData({ name: "", specialty: "", experience: "", image: "", availability: "" });
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        {...props}
        className="pl-10 w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <h1 className="text-4xl font-bold text-white text-center tracking-wide">
            Healthcare Professional Management
          </h1>
        </div>

        <div className="p-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              {editingId ? (
                <>
                  <Edit2 className="mr-3 text-yellow-500" /> Edit Doctor Profile
                </>
              ) : (
                <>
                  <PlusCircle className="mr-3 text-blue-500" /> Add New Doctor
                </>
              )}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingId ? handleUpdate() : handleAdd();
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <InputField
                icon={User}
                type="text"
                placeholder="Doctor's Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <InputField
                icon={Stethoscope}
                type="text"
                placeholder="Specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
              <InputField
                icon={Clock}
                type="number"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              />
              <InputField
                icon={ImageIcon}
                type="text"
                placeholder="Profile Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <InputField
                icon={Calendar}
                type="text"
                placeholder="Available Days (e.g., Monday, Tuesday)"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                required
              />
              <button
                type="submit"
                className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center font-semibold shadow-md"
              >
                {editingId ? (
                  <>
                    <Edit2 className="mr-2 h-5 w-5" /> Update Profile
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-5 w-5" /> Add Doctor
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Profile</th>
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Name</th>
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Specialty</th>
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Experience</th>
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Availability</th>
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <div className="relative">
                          <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
                          />
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{doctor.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          {doctor.specialty}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700">
                          {doctor.experience} years
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {doctor.availability.map((day, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-sm">
                              {day}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(doctor._id)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
                          >
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(doctor._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctor;
