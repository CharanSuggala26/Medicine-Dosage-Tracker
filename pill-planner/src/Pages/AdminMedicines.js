import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, Save } from "lucide-react";
import { use } from "react";

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
  }, []);

  const handleAdd = async () => {
    const newMedicine = {
      _id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
    };
    try {
      const res = await axios.post(
        "http://localhost:4700/store/add",
        newMedicine
      );
      // setMedicines([...medicines, res.data]);
      fetchData();
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

      // setMedicines(updatedMedicines);
      fetchData();
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

  const InputField = ({ placeholder, value, onChange, type = "text" }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-200 bg-white shadow-sm"
      required
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-2xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            Medicine Management Portal
          </h1>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            {editingId ? (
              <>
                <Pencil className="w-6 h-6 mr-2 text-yellow-500" />
                Edit Medicine
              </>
            ) : (
              <>
                <Plus className="w-6 h-6 mr-2 text-blue-500" />
                Add New Medicine
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
              placeholder="Medicine Name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
            <InputField
              placeholder="Description"
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
            />
            <InputField
              placeholder="Price"
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value })}
              type="number"
            />
            <InputField
              placeholder="Image URL"
              value={formData.image}
              onChange={(value) => setFormData({ ...formData, image: value })}
            />
            <InputField
              placeholder="Category"
              value={formData.category}
              onChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            />
            <button
              type="submit"
              className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              {editingId ? (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Update Medicine
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Medicine
                </>
              )}
            </button>
          </form>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Image",
                    "Name",
                    "Description",
                    "Price",
                    "Category",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {medicines.map((medicine) => (
                  <tr
                    key={medicine._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {medicine.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                      {medicine.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      ${medicine.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {medicine.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-3">
                      <button
                        onClick={() => handleEdit(medicine._id)}
                        className="inline-flex items-center px-3 py-2 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white transition-colors duration-200"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(medicine._id)}
                        className="inline-flex items-center px-3 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
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

export default AdminMedicines;
