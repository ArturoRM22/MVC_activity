import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Calendar, User as UserIcon, Users as UsersIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Users from "./Users";
import Medics from "./Medics";
import { User } from "../types";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [viewMode, setViewMode] = useState("list");
  const [activeNavItem, setActiveNavItem] = useState("appointments");

  useEffect(() => {
    console.log("Rendering Dashboard. User:", user);
  }, [user]);

  const navItems = [
    {
      key: "profile",
      label: "Perfil",
      icon: <UserIcon size={20} />,
      validRoles: ["admin", "enfermera", "medico", "paciente"],
    },
    {
      key: "appointments",
      label: "Citas",
      icon: <Calendar size={20} />,
      validRoles: ["medico", "paciente"],
    },
    {
      key: "medics",
      label: "Medicos",
      icon: <UsersIcon size={20} />,
      validRoles: ["admin", "enfermera"],
    },
    {
      key: "patients",
      label: "Pacientes",
      icon: <UsersIcon size={20} />,
      validRoles: ["admin", "enfermera"],
    },
    {
      key: "users",
      label: "Usuarios",
      icon: <UsersIcon size={20} />,
      validRoles: ["admin"],
    },
  ];

  return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar
          currentRole={user.rol}
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
          navItems={navItems}
        />
        <div className="flex-grow p-6">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg">
              <Routes>
                <Route path="/profile" element={<Profile />} />
                {(user.rol == "medico" || user.rol == "paciente") && (
                  <Route
                    path="/appointments"
                    element={
                      <Appointments
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        currentRole={user.rol}
                        id_user={user.id}
                      />
                    }
                  />
                )}
                {(user.rol === "admin" || user.rol === "enfermera") && (
                  <Route path="/patients" element={<Patients />} />
                )}
                {(user.rol === "admin" || user.rol === "enfermera") && (
                  <Route
                    path="/medics"
                    element={<Medics currentRole={user.rol} />}
                  />
                )}
                {user.rol === "admin" && (
                  <Route path="/users" element={<Users />} />
                )}
              </Routes>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;