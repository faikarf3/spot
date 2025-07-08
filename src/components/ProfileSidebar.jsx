import React from 'react';
import { Link } from 'react-router-dom';

const sidebarLinks = [
  
  { label: 'Explore', icon: '🔍', to: '/dashboard' },
  { label: 'Create', icon: '➕', to: '/create' },
  { label: 'Profile', icon: '👤', to: '/profile', active: true },
];

const ProfileSidebar = ({ user }) => (
  <aside className="w-64 bg-[#f9f6f5] border-r border-gray-100 flex flex-col items-center py-8 h-screen fixed top-0 left-0 z-30">
    <div className="flex flex-col items-center mb-10">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Avatar"
        className="w-16 h-16 rounded-full mb-2 object-cover"
      />
      <div className="font-semibold text-lg">{user ? user.username : 'User Name'}</div>
    </div>
    <nav className="w-full flex-1">
      {sidebarLinks.map(link => (
        <Link
          to={link.to}
          key={link.label}
          className={`flex items-center gap-3 px-8 py-3 cursor-pointer text-base rounded-lg mb-1 transition ${link.active ? 'bg-[#f3e9e6] text-black font-semibold' : 'text-gray-700 hover:bg-[#f3e9e6]'}`}
        >
          <span className="text-xl">{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  </aside>
);

export default ProfileSidebar; 