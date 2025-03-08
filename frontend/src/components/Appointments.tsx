import React, { useState, useEffect } from "react";
import { ListChecks, Calendar, Plus } from "lucide-react";
import AppointmentModal from "./AppointmentModal";

interface Appointment {
  id: string;
  patient: string;
  status: "Pendiente" | "Cancelada" | "Por aceptar";
  date: string;
  time: string;
  reason: string;
  doctor: string;
}

interface AppointmentsProps {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  currentRole: string;
}

const Appointments: React.FC<AppointmentsProps> = ({ viewMode, setViewMode, currentRole }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paciente_id = 8; 

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:8000/admins/citas");
      const data = await response.json();
      const transformedAppointments = await Promise.all(
        data.map(async (appointment: any) => {
          const doctorResponse = await fetch(`http://localhost:8000/users/${appointment.medico_id}`);
          const doctorData = await doctorResponse.json();
          return {
            id: appointment.paciente_id.toString(),
            patient: `Patient #${appointment.paciente_id}`,
            status: appointment.estado,
            date: appointment.fecha,
            time: appointment.hora,
            reason: appointment.motivo,
            doctor: doctorData.nombre || "Unknown Doctor",
          };
        })
      );
      setAppointments(transformedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddAppointment = async (appointmentData: {
    fecha: string;
    hora: string;
    motivo: string;
    medico_id: number;
  }) => {
    try {
      // Log the data being sent in the request body
      const requestBody = {
        ...appointmentData,
        paciente_id,
        estado: "Por aceptar", // Default status
      };
      console.log("Request Body:", requestBody);
  
      const response = await fetch("http://localhost:8000/pacientes/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        // Log the response error details
        const errorResponse = await response.json();
        console.error("Error Response:", errorResponse);
        throw new Error("Failed to schedule appointment");
      }
  
      // Refresh the appointments list
      fetchAppointments();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setViewMode("list")} className="p-2"> <ListChecks size={20} /> </button>
          <button onClick={() => setViewMode("calendar")} className="p-2"> <Calendar size={20} /> </button>
          {currentRole === "Paciente" && (
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600">
              <Plus size={20} /> <span>New Appointment</span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6 space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">{appointment.status}</h3>
            <p className="text-gray-600">{appointment.date} - {appointment.time} | {appointment.reason}</p>
            <p className="text-gray-600">Doctor: {appointment.doctor}</p>
          </div>
        ))}
      </div>
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAppointment}
        paciente_id={8} // Pass paciente_id to the modal
      />
    </div>
  );
};

export default Appointments;