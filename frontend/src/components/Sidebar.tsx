import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentRole: string;
  activeNavItem: string;
  setActiveNavItem: (key: string) => void;
  navItems: { key: string; icon: React.ReactNode; label: string, validRoles: string[] }[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, activeNavItem, setActiveNavItem, navItems }) => {
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user from local storage
    window.location.reload();// Redirect to login page
  };

  return (
    <div className="w-64 bg-white border-r shadow-md flex flex-col">
      <div className="p-4 border-b">
        <div className="w-full p-2 border rounded-md text-gray-700">
          {currentRole}
        </div>
      </div>
      <nav className="flex-grow p-4">
        {navItems.map((item) => {
          if (!item.validRoles.includes(currentRole)) return null;
          return (
            <Link
              key={item.key}
              to={`/${item.key}`}
              onClick={() => setActiveNavItem(item.key)}
              className={`
                w-full flex items-center space-x-3 p-3 rounded-md mb-2
                ${activeNavItem === item.key 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-3 p-3 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <span>Logout</span>
        </button>
      </div>
      </nav>
    </div>
  );
};

export default Sidebar;