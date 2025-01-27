import axios from "axios";
import React, { useState, useEffect } from "react";
import { Trash2, Edit2, PlusCircle } from 'lucide-react';

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

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-4xl font-extrabold text-white text-center tracking-wide">
            Doctor Management Portal
          </h1>
        </div>

        <div className="p-8">
          <div className="bg-gray-100 rounded-xl p-6 mb-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              {editingId ? (
                <>
                  <Edit2 className="mr-3 text-yellow-600" /> Edit Doctor
                </>
              ) : (
                <>
                  <PlusCircle className="mr-3 text-green-600" /> Add New Doctor
                </>
              )}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingId ? handleUpdate() : handleAdd();
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="text"
                placeholder="Specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="number"
                placeholder="Experience (years)"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="text"
                placeholder="Availability (e.g., Monday, Tuesday)"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                {editingId ? "Update Doctor" : "Add Doctor"}
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left">Image</th>
                  <th className="py-4 px-6 text-left">Name</th>
                  <th className="py-4 px-6 text-left">Specialty</th>
                  <th className="py-4 px-6 text-left">Experience</th>
                  <th className="py-4 px-6 text-left">Availability</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id} className="border-b hover:bg-gray-100 transition duration-200">
                    <td className="py-4 px-6">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300" 
                      />
                    </td>
                    <td className="py-4 px-6 font-medium">{doctor.name}</td>
                    <td className="py-4 px-6 text-gray-600">{doctor.specialty}</td>
                    <td className="py-4 px-6">{doctor.experience} years</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{doctor.availability.join(", ")}</td>
                    <td className="py-4 px-6 space-x-2">
                      <button
                        onClick={() => handleEdit(doctor._id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center"
                      >
                        <Edit2 className="mr-2" size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                      >
                        <Trash2 className="mr-2" size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctor;