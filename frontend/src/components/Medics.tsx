import { useState } from "react";
import {
  Calendar,
  User,
  Stethoscope,
  UserCheck,
  UserX,
  Plus,
} from "lucide-react";

import useApi from "../../utils/useAPI";

interface medicsProps {
  currentRole: string;
}

const Medics: React.FC<medicsProps> = ({ currentRole }) => {
  const api = useApi("http://localhost:8000");

  const [medics] = useState([
    {
      id: 1,
      name: "Dr. Rodriguez",
      specialty: "Cardiology",
      status: "available",
      assignedNurse: "Elena Martinez",
      contactInfo: "555-CARD-01",
      workHours: "8:00 AM - 4:00 PM",
      email: "rodriguez.md@hospital.com",
      qualifications: "Board Certified Cardiologist",
      upcomingAppointments: 5,
    },
    {
      id: 2,
      name: "Dr. Lee",
      specialty: "Endocrinology",
      status: "not-available",
      assignedNurse: "Sarah Kim",
      contactInfo: "555-ENDO-02",
      workHours: "9:00 AM - 5:00 PM",
      email: "lee.md@hospital.com",
      qualifications: "Diabetes Management Specialist",
      upcomingAppointments: 3,
    },
    {
      id: 3,
      name: "Dr. Williams",
      specialty: "Pulmonology",
      status: "available",
      assignedNurse: "Michael Johnson",
      contactInfo: "555-LUNG-03",
      workHours: "7:30 AM - 3:30 PM",
      email: "williams.md@hospital.com",
      qualifications: "Respiratory Diseases Expert",
      upcomingAppointments: 4,
    },
  ]);

  const [selectedMedic, setSelectedMedic] = useState<(typeof medics)[0] | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const AddMedicModal = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: "",
      username: "",
      password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      api.createUser(
        formData.name,
        formData.username,
        formData.password,
        "Medico"
      );
      // Here you would typically make an API call to add the medic
      console.log("New medic data:", formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Add New Medic</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Add Medic
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ViewMedicModal = ({
    medic,
    onClose,
  }: {
    medic: (typeof medics)[0] | null;
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
                <h3 className="text-xl font-semibold">{medic.name}</h3>
                <p className="text-gray-600">{medic.specialty}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-700">
                Professional Status
              </h4>
              <div className="flex items-center space-x-2">
                {medic.status === "available" ? (
                  <UserCheck className="text-green-500" size={20} />
                ) : (
                  <UserX className="text-red-500" size={20} />
                )}
                <span
                  className={`
                  font-medium
                  ${
                    medic.status === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                `}
                >
                  {medic.status === "available" ? "Available" : "Not Available"}
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
                <p className="font-medium">{medic.specialty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Work Hours</p>
                <p className="font-medium">{medic.workHours}</p>
              </div>
              {/* <div>
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
              </div> */}
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
      {showAddModal && <AddMedicModal onClose={() => setShowAddModal(false)} />}

      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            Medical Staff
          </h1>
          {currentRole == "Administrador" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600"
            >
              <Plus size={20} />
              <span>Add Medic</span>
            </button>
          )}
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
                      {medic.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600">{medic.specialty}</p>
                      <span
                        className={`
                        px-2 py-0.5 rounded-full text-xs font-medium
                        ${
                          medic.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      `}
                      >
                        {medic.status === "available"
                          ? "Available"
                          : "Not Available"}
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
