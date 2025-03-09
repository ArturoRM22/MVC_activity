import React, { useState, useEffect } from "react";
import { ListChecks, Calendar, Plus } from "lucide-react";
import AppointmentModal from "./AppointmentModal";

interface Appointment {
  id: string;
  patient: string;
  status: "Pendiente" | "Cancelada" | "Por aceptar" | "Aceptada" | "Terminada";
  date: string;
  time: string;
  reason: string;
  doctor: string;
}

interface AppointmentsProps {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  currentRole: string;
  id_user: string;
}

const Appointments: React.FC<AppointmentsProps> = ({ viewMode, setViewMode, currentRole, id_user }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAppointments = async () => {
    try {
      let response;
      if (currentRole === "medico") {
        response = await fetch(`http://localhost:8000/medicos/citas/${id_user}`);
      } else {
        response = await fetch(`http://localhost:8000/pacientes/citas/${id_user}`);
      }
      const data = await response.json();
      const transformedAppointments = await Promise.all(
        data.map(async (appointment: any) => {
          const doctorResponse = await fetch(`http://localhost:8000/users/${appointment.medico_id}`);
          const doctorData = await doctorResponse.json();
          return {
            id: appointment.id,
            patient: `Patient #${id_user}`,
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
      const requestBody = {
        ...appointmentData,
        paciente_id: id_user,
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

  const handleStatusChange = async (appointmentId: string, action: "aceptar" | "cancelar" | "terminar") => {
    try {
      console.log(`http://localhost:8000/medicos/citas/${appointmentId}/${action}`)
      const endpoint = `http://localhost:8000/medicos/citas/${appointmentId}/${action}`;
      const response = await fetch(endpoint, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} appointment`);
      }

      // Refresh the appointments list
      fetchAppointments();
    } catch (error) {
      console.error(`Error ${action} appointment:`, error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setViewMode("list")} className="p-2">
            <ListChecks size={20} />
          </button>
          <button onClick={() => setViewMode("calendar")} className="p-2">
            <Calendar size={20} />
          </button>
          {currentRole === "paciente" && (
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
            {currentRole === "medico" && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleStatusChange(appointment.id, "aceptar")}
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleStatusChange(appointment.id, "cancelar")}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleStatusChange(appointment.id, "terminar")}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Terminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAppointment}
      />
    </div>
  );
};

export default Appointments;