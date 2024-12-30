import React, { useState } from 'react';

const initialData = [
  {
    _id: "6772cc84c0b2ab184650a20f",
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 12,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    _id: "6772cf46c0b2ab184650a210",
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    experience: 8,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    _id: "6772cf46c0b2ab184650a211",
    id: "3",
    name: "Dr. Emily Williams",
    specialty: "Dermatologist",
    experience: 15,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    availability: ["Monday", "Tuesday", "Thursday"],
  },
];

const AdminDoctor = () => {
  const [doctors, setDoctors] = useState(initialData);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    image: '',
    availability: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    const newDoctor = {
      _id: Date.now().toString(),
      id: (doctors.length + 1).toString(),
      ...formData,
      experience: parseInt(formData.experience, 10),
      availability: formData.availability.split(',').map((day) => day.trim()),
    };
    setDoctors([...doctors, newDoctor]);
    setFormData({ name: '', specialty: '', experience: '', image: '', availability: '' });
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter((doctor) => doctor._id !== id));
  };

  const handleEdit = (id) => {
    const doctor = doctors.find((d) => d._id === id);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      experience: doctor.experience.toString(),
      image: doctor.image,
      availability: doctor.availability.join(', '),
    });
    setEditingId(id);
  };

  const handleUpdate = () => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor._id === editingId
        ? {
            ...doctor,
            ...formData,
            experience: parseInt(formData.experience, 10),
            availability: formData.availability.split(',').map((day) => day.trim()),
          }
        : doctor
    );
    setDoctors(updatedDoctors);
    setEditingId(null);
    setFormData({ name: '', specialty: '', experience: '', image: '', availability: '' });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Portal</h1>

      {/* Form Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? 'Edit Doctor' : 'Add Doctor'}
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
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Specialty"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Availability (e.g., Monday, Tuesday)"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      {/* Data Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Specialty</th>
              <th className="py-2 px-4">Experience</th>
              <th className="py-2 px-4">Availability</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="border-t">
                <td className="py-2 px-4">
                  <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full" />
                </td>
                <td className="py-2 px-4">{doctor.name}</td>
                <td className="py-2 px-4">{doctor.specialty}</td>
                <td className="py-2 px-4">{doctor.experience} years</td>
                <td className="py-2 px-4">{doctor.availability.join(', ')}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(doctor._id)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doctor._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDoctor;


