import React, { useState, useEffect } from "react";
import { PlusCircle, Calendar } from "lucide-react";
import MedicationCard from "../Components/MedicationCard.js";
import AddMedicationModel from "../Components/AddMedicationModel.js";
import ProgressTracker from "../Components/ProgressTracker.js";
import useStreak from "../hooks/UseStreak.js";
import axios from "axios";

function App() {
  const [medications, setMedications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { streak, updateStreak } = useStreak();

  async function fetchMedicines() {
    await axios
      .get("http://localhost:4700/medicines", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          Curr_User_Name: `${window.localStorage.getItem("user")}`,
        },
      })
      .then((res) => {
        if (res) {
          setMedications(res.data.payload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchMedicines();
    fetchMedicines();
  }, []);

  const handleAddMedication = async (newMed) => {
    setMedications((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newMed,
        taken: false,
      },
    ]);

    const medicine = {
      ...newMed,
      uname: `${window.localStorage.getItem("user")}`,
    };

    await axios
      .post(
        "http://localhost:4700/medicines/add",
        { medicine },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchMedicines();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMarkTaken = (id) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med))
    );
  };

  useEffect(() => {
    if (medications.length > 0) {
      const allTaken = medications.every((med) => med.taken);
      updateStreak(allTaken);
    }
  }, [medications, updateStreak]);

  const takenCount = medications.filter((med) => med.taken).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Medication Schedule
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Medication</span>
          </button>
        </div>

        <ProgressTracker
          totalMedications={medications.length}
          takenCount={takenCount}
          streak={streak}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="transform transition-all duration-300 hover:translate-y-[-4px]"
            >
              <MedicationCard
                name={medication.name}
                time={medication.time}
                dosage={medication.dosage}
                taken={medication.taken}
                onMarkTaken={() => handleMarkTaken(medication.id)}
              />
            </div>
          ))}
        </div>

        {medications.length === 0 && (
          <div className="text-center py-16">
            <div className="animate-bounce mb-4">
              <PlusCircle className="w-16 h-16 text-blue-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No medications scheduled
            </h2>
            <p className="text-gray-500">
              Click the "Add Medication" button to get started
            </p>
          </div>
        )}

        <AddMedicationModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddMedication}
        />
      </div>
    </div>
  );
}

export default App;
