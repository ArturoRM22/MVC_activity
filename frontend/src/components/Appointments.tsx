import React, { useState } from "react";
import {ListChecks, Calendar, Plus } from "lucide-react";
import AppointmentModal from "./AppointmentModal";

interface Appointment {
  id: string;
  patient: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  date: string;
  time: string;
  reason: string;
}

interface appointmentsProps {
  Appointments: Appointment[];
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  currentRole: string;
}

const Appointments: React.FC<appointmentsProps> = ({ Appointments, viewMode, setViewMode, currentRole }) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    const appointmentIndex = Appointments.findIndex(appointment => appointment.id === appointmentId);
    if (appointmentIndex !== -1) {
      Appointments[appointmentIndex].status = newStatus;
    }
    setOpenDropdownId(null);
  };


    
  const handleAppointmentSubmit = (appointmentData: {
    date: string;
    time: string;
    doctor: string;
    reason: string;
  }) => {
    // Handle the appointment creation here
    console.log("New appointment:", appointmentData);
    // Add logic to create new appointment
  };


  return (
    <div>
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-md">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'} rounded-l-md`}
            >
              <ListChecks size={20} />
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`p-2 ${viewMode === 'calendar' ? 'bg-blue-500 text-white' : 'text-gray-600'} rounded-r-md`}
            >
              <Calendar size={20} />
            </button>
          </div>
          {currentRole === "Paciente" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600"
            >
              <Plus size={20} />
              <span>New Appointment</span>
            </button>
            )}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {Appointments.map((Appointment) => (
            <div 
              key={Appointment.id} 
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {Appointment.patient}
                  </h3>
                    <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${Appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : Appointment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'}
                    `}>
                    {Appointment.status === 'confirmed' 
                      ? 'Confirmed' 
                      : Appointment.status === 'pending'
                      ? 'Pending'
                      : 'Cancelled'}
                    </span>
                </div>
                <p className="text-gray-600">
                  {Appointment.date} - {Appointment.time} | {Appointment.reason}
                </p>
              </div>

              {(currentRole == "Medico"|| currentRole =="Enfermera" || currentRole=="Administrador") && <div className="relative">
                <button
                  onClick={() => setOpenDropdownId(openDropdownId === Appointment.id ? null : Appointment.id)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 border border-gray-300 rounded"
                >
                  Change Meeting Status
                </button>
                {openDropdownId === Appointment.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu">
                      <button
                        onClick={() => handleStatusChange(Appointment.id, 'confirmed')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(Appointment.id, 'pending')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(Appointment.id, 'cancelled')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>}
            </div>
          ))}
        </div>
      </div>
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAppointmentSubmit}
      />
    </div>
  );
};

export default Appointments;
