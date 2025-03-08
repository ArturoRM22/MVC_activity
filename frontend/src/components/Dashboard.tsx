import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Calendar, User, Users as UsersIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Users from "./Users";
import Medics from "./Medics";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState("list");
  const [currentRole, setCurrentRole] = useState("Administrador");
  const [activeNavItem, setActiveNavItem] = useState("appointments");

  const roles = ["Administrador", "Enfermera", "Medico", "Paciente"];

  const navItems = [
    {
      key: "profile",
      label: "Perfil",
      icon: <User size={20} />,
      validRoles: ["Administrador", "Enfermera", "Medico", "Paciente"],
    },
    {
      key: "appointments",
      label: "Citas",
      icon: <Calendar size={20} />,
      validRoles: ["Medico", "Paciente"],
    },
    {
      key: "medics",
      label: "Medicos",
      icon: <UsersIcon size={20} />,
      validRoles: ["Administrador", "Enfermera"],
    },
    {
      key: "patients",
      label: "Pacientes",
      icon: <UsersIcon size={20} />,
      validRoles: ["Administrador", "Enfermera"],
    },
    {
      key: "users",
      label: "Usuarios",
      icon: <UsersIcon size={20} />,
      validRoles: ["Administrador"],
    },
  ];

  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          roles={roles}
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
          navItems={navItems}
        />
        <div className="flex-grow p-6">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg">
              <Routes>
                <Route path="/profile" element={<Profile />} />
                {(currentRole == "Paciente" || currentRole == "Medico") && (
                  <Route
                    path="/appointments"
                    element={
                      <Appointments
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        currentRole={currentRole}
                      />
                    }
                  />
                )}
                {(currentRole === "Administrador" ||
                  currentRole == "Enfermera") && (
                  <Route path="/patients" element={<Patients />} />
                )}
                {(currentRole === "Administrador" ||
                  currentRole == "Enfermera") && (
                  <Route
                    path="/medics"
                    element={<Medics currentRole={currentRole} />}
                  />
                )}
                {currentRole === "Administrador" && (
                  <Route path="/users" element={<Users />} />
                )}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;