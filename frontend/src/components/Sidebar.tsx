import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  currentRole: string;
  setCurrentRole: (role: string) => void;
  roles: string[];
  activeNavItem: string;
  setActiveNavItem: (key: string) => void;
  navItems: { key: string; icon: React.ReactNode; label: string, validRoles: string[] }[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, setCurrentRole, roles, activeNavItem, setActiveNavItem, navItems }) => {
  return (
    <div className="w-64 bg-white border-r shadow-md flex flex-col">
      <div className="p-4 border-b">
        <select 
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
      <nav className="flex-grow p-4">
        {navItems.map((item) =>{
          if (!item.validRoles.includes(currentRole)) return 
          return  (
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
          )
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
