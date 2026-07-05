import React from 'react';
import { FiMenu } from 'react-icons/fi';
import navImg from '../../assets/Pippo 1.jpg';

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#ffb6c1] shadow-md flex items-center justify-between px-6 z-40">
      {/* Left side: Profile Image */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm hover:scale-110 transition-transform">
        <img src={navImg} alt="Profile" className="w-full h-full object-cover" />
      </div>

      {/* Right side: Hamburger Menu */}
      <button 
        onClick={toggleSidebar}
        className="text-white text-3xl p-2 rounded-md hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Open Sidebar"
      >
        <FiMenu />
      </button>
    </nav>
  );
}
