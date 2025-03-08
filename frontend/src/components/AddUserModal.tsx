import { X } from 'lucide-react';

interface AddUserModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  activeTab: 'patient' | 'nurseAdmin' | 'doctor';
  setActiveTab: (tab: 'patient' | 'nurseAdmin' | 'doctor') => void;
  handleAddUser: (userData: any, endpoint: string) => void;
}

export const AddUserModal = ({ isModalOpen, setIsModalOpen, activeTab, setActiveTab, handleAddUser }: AddUserModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Add User</h2>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('patient')}
              className={`pb-2 px-4 ${
                activeTab === 'patient' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
            >
              Add Patient
            </button>
            <button
              onClick={() => setActiveTab('nurseAdmin')}
              className={`pb-2 px-4 ${
                activeTab === 'nurseAdmin' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
            >
              Add Nurse/Admin
            </button>
            <button
              onClick={() => setActiveTab('doctor')}
              className={`pb-2 px-4 ${
                activeTab === 'doctor' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
            >
              Add Doctor
            </button>
          </div>

          {/* Patient Form */}
          {activeTab === 'patient' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const userData = {
                  nombre: formData.get('nombre'),
                  username: formData.get('username'),
                  password: formData.get('password'),
                  rol: 'paciente',
                  edad: parseInt(formData.get('edad') as string),
                  enfermedad: formData.get('enfermedad'),
                };
                handleAddUser(userData, 'registrar-paciente');
              }}
              className="mt-6 space-y-4"
            >
              <input
                    type="text"
                    name="nombre"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    name="edad"
                    placeholder="Age"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="enfermedad"
                    placeholder="Disease"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    Add Patient
                  </button>
            </form>
          )}

          {/* Nurse/Admin Form */}
          {activeTab === 'nurseAdmin' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const userData = {
                  nombre: formData.get('nombre'),
                  username: formData.get('username'),
                  password: formData.get('password'),
                  rol: formData.get('rol'),
                };
                handleAddUser(userData, 'registrar-usuario');
              }}
              className="mt-6 space-y-4"
            >
              <input
                    type="text"
                    name="nombre"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <select
                    name="rol"
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="enfermera">Enfermera</option>
                    <option value="admin">Administrador</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    Add Nurse/Admin
                  </button>
            </form>
          )}

          {/* Doctor Form */}
          {activeTab === 'doctor' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const userData = {
                  nombre: formData.get('nombre'),
                  username: formData.get('username'),
                  password: formData.get('password'),
                  rol: 'medico',
                  especialidad: formData.get('especialidad'),
                  estado: formData.get('estado'),
                  horarios: formData.get('horarios'),
                };
                handleAddUser(userData, 'registrar-medico');
              }}
              className="mt-6 space-y-4"
            >
              <input
                    type="text"
                    name="nombre"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="especialidad"
                    placeholder="Specialty"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="estado"
                    placeholder="Status"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="horarios"
                    placeholder="Work Hours"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    Add Doctor
                  </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};