import { useState, useEffect } from "react";
import { Calendar, User, Stethoscope, UserCheck, UserX } from "lucide-react";
import {Medic} from "../types"

const Medics: React.FC<{ currentRole: string }> = ({ currentRole }) => {
  const [medics, setMedics] = useState<Medic []>([]);
  const [selectedMedic, setSelectedMedic] = useState<Medic | null>(null);

  // Fetch medics data from the API
  useEffect(() => {
    const fetchMedics = async () => {
      try {
        const response = await fetch('http://localhost:8000/admins/medicos');
        if (!response.ok) {
          throw new Error('Failed to fetch medics');
        }
        const data = await response.json();
        if (data) {
          // Merge API data with hardcoded fields
          const medicsWithAdditionalData = data.map((medic: Medic) => ({
            ...medic,
            assignedNurse: "Nurse Name", // Hardcoded value
            contactInfo: "555-123-4567", // Hardcoded value
            email: `${medic.username}@hospital.com`, // Generated from username
            qualifications: "Board Certified Specialist", // Hardcoded value
            upcomingAppointments: 0, // Placeholder for now
          }));
          setMedics(medicsWithAdditionalData);
        }
      } catch (error) {
        console.error("Error fetching medics:", error);
      }
    };

    fetchMedics();
  }, []);

  const ViewMedicModal = ({
    medic,
    onClose,
  }: {
    medic: Medic | null;
    onClose: () => void;
  }) => {
    if (!medic) return null;

    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Medic Details</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope size={32} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{medic.nombre}</h3>
                <p className="text-gray-600">{medic.especialidad}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-700">
                Professional Status
              </h4>
              <div className="flex items-center space-x-2">
                {medic.estado === "Active" ? (
                  <UserCheck className="text-green-500" size={20} />
                ) : (
                  <UserX className="text-red-500" size={20} />
                )}
                <span
                  className={`
                  font-medium
                  ${
                    medic.estado === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                `}
                >
                  {medic.estado === "Active" ? "Available" : "Not Available"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Assigned Nurse</p>
                <p className="font-medium">{medic.assignedNurse}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialty</p>
                <p className="font-medium">{medic.especialidad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Work Hours</p>
                <p className="font-medium">{medic.horarios}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{medic.contactInfo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{medic.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Qualifications</p>
                <p className="font-medium">{medic.qualifications}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2">
                <Calendar size={18} />
                <span>Upcoming Appointments</span>
                <span className="bg-white text-blue-500 rounded-full px-2 ml-2">
                  {medic.upcomingAppointments}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50">
      {selectedMedic && (
        <ViewMedicModal
          medic={selectedMedic}
          onClose={() => setSelectedMedic(null)}
        />
      )}
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            Medical Staff
          </h1>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {medics.map((medic) => (
              <div
                key={medic.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {medic.nombre}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600">{medic.especialidad}</p>
                      <span
                        className={`
                        px-2 py-0.5 rounded-full text-xs font-medium
                        ${
                          medic.estado === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      `}
                      >
                        {medic.estado === "Active" ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedMedic(medic)}
                    className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <User size={18} />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medics;