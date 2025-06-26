import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#fdf9f8] border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Left: Logo and nav links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center text-xl font-bold text-[#231815]">
              {/* Placeholder logo icon */}
              <span className="mr-2 text-2xl">o</span>
              Spots
            </Link>
            <Link to="/Dashboard" className="text-[#231815] font-medium hover:underline">Explore</Link>
            <Link to="/create" className="text-[#231815] font-medium hover:underline">Create</Link>
          </div>
          {/* Right: Bell and avatar */}
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f7cbbd] flex items-center justify-center cursor-pointer">
                {/* Placeholder avatar image */}
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 