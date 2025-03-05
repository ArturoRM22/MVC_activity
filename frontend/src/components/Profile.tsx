import { useState } from 'react';
import { 
  User, 
  Edit, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  Lock,
  Save
} from 'lucide-react';

const Profile = () => {
  interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
  }

  interface UserProfile {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
    registrationDate: string;
    lastLogin: string;
    emergencyContact: EmergencyContact;
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'USR-004',
    name: 'Juan Perez',
    role: 'Administrador',
    email: 'juan.perez@hospital.com',
    phone: '(555) 123-4567',
    birthDate: '1985-03-15',
    address: '123 Medical Street, Health City, HC 12345',
    registrationDate: '2022-05-10',
    lastLogin: '2025-03-05 14:30',
    emergencyContact: {
      name: 'Maria Perez',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    }
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>({ ...userProfile });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">User Profile</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`
              px-4 py-2 rounded-md flex items-center space-x-2
              ${isEditing 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'}
            `}
          >
            {isEditing ? (
              <>
                <Save size={18} />
                <span onClick={handleSave}>Save Changes</span>
              </>
            ) : (
              <>
                <Edit size={18} />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="md:col-span-1 bg-gray-50 rounded-lg p-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={64} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {userProfile.name}
            </h2>
            <span className={`
              inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
              ${userProfile.role === 'Administrador' ? 'bg-purple-100 text-purple-800' : 
                userProfile.role === 'Medico' ? 'bg-blue-100 text-blue-800' : 
                userProfile.role === 'Enfermera' ? 'bg-green-100 text-green-800' : 
                'bg-gray-100 text-gray-800'}
            `}>
              {userProfile.role}
            </span>
          </div>

          {/* Detailed Information */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">User ID</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="id"
                      value={editedProfile.id}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{userProfile.id}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{userProfile.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800 flex items-center">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      {userProfile.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800 flex items-center">
                      <Phone size={16} className="mr-2 text-gray-500" />
                      {userProfile.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Additional Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Birth Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="birthDate"
                      value={editedProfile.birthDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800 flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      {userProfile.birthDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editedProfile.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800 flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      {userProfile.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Registration Date</label>
                  <p className="font-medium text-gray-800 flex items-center">
                    <Lock size={16} className="mr-2 text-gray-500" />
                    {userProfile.registrationDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Last Login</label>
                  <p className="font-medium text-gray-800 flex items-center">
                    <Lock size={16} className="mr-2 text-gray-500" />
                    {userProfile.lastLogin}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Emergency Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Contact Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContact.name"
                      value={editedProfile.emergencyContact.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">
                      {userProfile.emergencyContact.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Relationship</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      value={editedProfile.emergencyContact.relationship}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">
                      {userProfile.emergencyContact.relationship}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-500">Contact Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      value={editedProfile.emergencyContact.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <p className="font-medium text-gray-800 flex items-center">
                      <Phone size={16} className="mr-2 text-gray-500" />
                      {userProfile.emergencyContact.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;