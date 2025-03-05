import  { useState } from 'react';
import { 
  Plus, 
  Edit,
  UserCheck
} from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'Maria Garcia',
      role: 'Paciente',
      email: 'maria.garcia@example.com',
      registrationDate: '2024-02-15'
    },
    {
      id: 'USR-002',
      name: 'Elena Martinez',
      role: 'Enfermera',
      email: 'elena.martinez@hospital.com',
      registrationDate: '2023-11-20'
    },
    {
      id: 'USR-003',
      name: 'Dr. Rodriguez',
      role: 'Medico',
      email: 'rodriguez.md@hospital.com',
      registrationDate: '2023-09-05'
    },
    {
      id: 'USR-004',
      name: 'Juan Perez',
      role: 'Administrador',
      email: 'juan.perez@hospital.com',
      registrationDate: '2022-05-10'
    }
  ]);

  const [editingUser, setEditingUser] = useState<string | null>(null);

  const roleOptions = ['Administrador', 'Enfermera', 'Paciente', 'Medico'];

interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    registrationDate: string;
}

const handleRoleChange = (userId: string, newRole: string): void => {
    setUsers(users.map((user: User) => 
        user.id === userId ? { ...user, role: newRole } : user
    ));
    setEditingUser(null);
};

  return (
    <div className="p-6 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600">
            <Plus size={20} />
            <span>Add User</span>
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left">User ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Registration Date</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {users.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-left whitespace-nowrap">
                      <span className="font-medium">{user.id}</span>
                    </td>
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center">
                        <UserCheck className="w-6 h-6 mr-2 text-blue-500" />
                        {user.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-left">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 text-left">
                      {editingUser === user.id ? (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="w-full p-1 border rounded"
                        >
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${user.role === 'Administrador' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'Medico' ? 'bg-blue-100 text-blue-800' : 
                            user.role === 'Enfermera' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-left">
                      {user.registrationDate}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {editingUser === user.id ? (
                        <button 
                          onClick={() => setEditingUser(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button 
                          onClick={() => setEditingUser(user.id)}
                          className="text-blue-500 hover:text-blue-700 flex items-center justify-center w-full"
                        >
                          <Edit size={18} className="mr-1" />
                          Change Role
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;