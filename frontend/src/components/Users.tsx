// Users.tsx
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { UserTable } from './UserTable';
import { AddUserModal } from './AddUserModal';
import { User, Role } from '../types';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'patient' | 'nurseAdmin' | 'doctor'>('patient');

  const roleOptions: Role[] = ['admin', 'medico', 'enfermera', 'paciente'];

  const handleRoleChange = (userId: string, newRole: string): void => {
    setUsers(users.map((user: User) => 
      user.id === userId ? { ...user, rol: newRole } : user
    ));
    setEditingUser(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/admins/usuarios');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleAddUser = async (userData: any, endpoint: string) => {
    try {
      const response = await fetch(`http://localhost:8000/admins/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
  
      // Refetch users after successful POST
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:8000/admins/usuarios');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
  
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <AddUserModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleAddUser={handleAddUser} 
      />

      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600"
          >
            <Plus size={20} />
            <span>Add User</span>
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <UserTable 
              users={users} 
              editingUser={editingUser} 
              roleOptions={roleOptions} 
              handleRoleChange={handleRoleChange} 
              setEditingUser={setEditingUser} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;