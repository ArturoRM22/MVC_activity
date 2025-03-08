// UserTable.tsx
import { User, Role } from '../types';
import { UserCheck, Edit } from 'lucide-react';

interface UserTableProps {
  users: User[];
  editingUser: string | null;
  roleOptions: Role[];
  handleRoleChange: (userId: string, newRole: string) => void;
  setEditingUser: (userId: string | null) => void;
}

export const UserTable = ({ users, editingUser, roleOptions, handleRoleChange, setEditingUser }: UserTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-4 text-left">User ID</th>
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Username</th>
          <th className="py-3 px-4 text-left">Role</th>
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {users.map((user) => (
          <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-4 text-left whitespace-nowrap">
              <span className="font-medium">{user.id}</span>
            </td>
            <td className="py-3 px-4 text-left">
              <div className="flex items-center">
                <UserCheck className="w-6 h-6 mr-2 text-blue-500" />
                {user.nombre}
              </div>
            </td>
            <td className="py-3 px-4 text-left">{user.username}</td>
            <td className="py-3 px-4 text-left">
              {editingUser === user.id ? (
                <select
                  value={user.rol}
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
                  ${user.rol === 'admin' ? 'bg-purple-100 text-purple-800' : 
                    user.rol === 'medico' ? 'bg-blue-100 text-blue-800' : 
                    user.rol === 'enfermera' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'}
                `}>
                  {user.rol}
                </span>
              )}
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
  );
};