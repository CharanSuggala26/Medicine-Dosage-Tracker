import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:4700/store/");
      setMedicines(res.data.payload);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  }

  useEffect(() => {
    fetchData();
    fetchData();
  }, []);

  const handleAdd = async () => {
    const newMedicine = {
      _id: Date.now().toString(),
      id: (medicines.length + 1).toString(),
      ...formData,
      price: parseFloat(formData.price),
    };
    try {
      const res = await axios.post(
        "http://localhost:4700/store/add",
        newMedicine
      );
      setMedicines([...medicines, res.data]);
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
    } catch (err) {
      console.error("Error adding Medicine:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4700/store/${id}`);
      if (response.status === 200) {
        fetchData();
        fetchData();
      } else {
        console.error("Failed to delete medicine:", response.data.message);
      }
    } catch (err) {
      console.error("Error deleting Medicine:", err);
    }
  };

  const handleEdit = (id) => {
    const medicine = medicines.find((m) => m._id === id);
    setFormData({
      name: medicine.name,
      description: medicine.description,
      price: medicine.price.toString(),
      image: medicine.image,
      category: medicine.category,
    });
    setEditingId(id);
  };

  // const handleUpdate = async () => {
  //   const updatedMedicine = {
  //     ...formData,
  //     price: parseFloat(formData.price),
  //   };

  //   try {
  //       await axios.put(`http://localhost:4700/store/${editingId}`, updatedMedicine);
  //       const updatedMedicines = medicines.map((medicine) =>
  //       medicine._id === editingId ? { ...medicine, ...updatedMedicine } : medicine
  //     );

  //     setMedicines(updatedMedicines);
  //     setEditingId(null);
  //     setFormData({ name: '', description: '', price: '', image: '', category: '' });
  //   } catch (err) {
  //     console.error('Error updating medicine:', err.response?.data || err.message);
  //   }
  // };
  const handleUpdate = async () => {
    const updatedMedicine = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      await axios.put(
        `http://localhost:4700/store/${editingId}`,
        updatedMedicine,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedMedicines = medicines.map((medicine) =>
        medicine._id === editingId
          ? { ...medicine, ...updatedMedicine }
          : medicine
      );

      setMedicines(updatedMedicines);
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
    } catch (err) {
      console.error(
        "Error updating medicine:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Admin Portal - Medicines
      </h1>

      {/* Form Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Medicine" : "Add Medicine"}
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
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingId ? "Update" : "Add"}
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
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id} className="border-t">
                <td className="py-2 px-4">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="py-2 px-4">{medicine.name}</td>
                <td className="py-2 px-4">{medicine.description}</td>
                <td className="py-2 px-4">${medicine.price}</td>
                <td className="py-2 px-4">{medicine.category}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(medicine._id)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(medicine._id)}
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

export default AdminMedicines;
