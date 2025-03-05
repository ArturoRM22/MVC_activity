import  { useState } from 'react';
import { 
  Calendar, 
  User, 
  Stethoscope,
  FileText
} from 'lucide-react';

const Patients = () => {
  const [patients] = useState([
    {
      id: 1,
      name: 'Maria Garcia',
      age: 45,
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 36.6
      },
      disease: 'Hypertension',
      assignedMedic: 'Dr. Rodriguez',
      contactInfo: '555-1234',
      medicalHistory: 'Chronic condition management'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      age: 35,
      vitalSigns: {
        bloodPressure: '130/85',
        heartRate: 68,
        temperature: 37.2
      },
      disease: 'Diabetes Type 2',
      assignedMedic: 'Dr. Lee',
      contactInfo: '555-5678',
      medicalHistory: 'Insulin management'
    },
    {
      id: 3,
      name: 'Emily Chen',
      age: 28,
      vitalSigns: {
        bloodPressure: '110/70',
        heartRate: 75,
        temperature: 36.8
      },
      disease: 'Asthma',
      assignedMedic: 'Dr. Williams',
      contactInfo: '555-9012',
      medicalHistory: 'Respiratory condition monitoring'
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  interface Patient {
    id: number;
    name: string;
    age: number;
    vitalSigns: {
      bloodPressure: string;
      heartRate: number;
      temperature: number;
    };
    disease: string;
    assignedMedic: string;
    contactInfo: string;
    medicalHistory: string;
  }

  const ViewPatientModal = ({ patient, onClose }: { patient: Patient | null; onClose: () => void }) => {
    if (!patient) return null;

    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Patient Details</h2>
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
                <User size={32} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{patient.name}</h3>
                <p className="text-gray-600">Age: {patient.age}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-700">Vital Signs</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Blood Pressure</p>
                  <p className="font-medium">{patient.vitalSigns.bloodPressure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Heart Rate</p>
                  <p className="font-medium">{patient.vitalSigns.heartRate} bpm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="font-medium">{patient.vitalSigns.temperature}°C</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Assigned Medic</p>
                <p className="font-medium">{patient.assignedMedic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Primary Condition</p>
                <p className="font-medium">{patient.disease}</p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{patient.contactInfo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Medical History</p>
                <p className="font-medium">{patient.medicalHistory}</p>
              </div> */}
            </div>

            <div className="flex space-x-2">
              <button 
                className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
              >
                <Calendar size={18} />
                <span>View Appointments</span>
              </button>
              <button 
                className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 flex items-center justify-center space-x-2"
              >
                <FileText size={18} />
                <span>Medical Record</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50">
      {selectedPatient && (
        <ViewPatientModal 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )}
      
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600">
            <Plus size={20} />
            <span>Add Patient</span>
          </button> */}
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {patients.map((patient) => (
              <div 
                key={patient.id} 
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {patient.name}
                    </h3>
                    <p className="text-gray-600">
                      {patient.disease} | Assigned to {patient.assignedMedic}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedPatient(patient)}
                    className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <Stethoscope size={18} />
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

export default Patients;