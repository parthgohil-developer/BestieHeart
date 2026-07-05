import React from 'react';

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button 
              onClick={closeSidebar}
              className="text-gray-400 hover:text-gray-700 text-3xl font-light focus:outline-none transition-colors"
              aria-label="Close Sidebar"
            >
              &times;
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="flex flex-col gap-6 font-serif text-xl text-gray-600">
            <a href="/home" className="hover:text-[#ffb6c1] transition-colors">Home</a>
            <div className="flex-grow"></div>
            <a href="/" className="hover:text-red-400 transition-colors mt-auto text-red-300 border-t pt-4">Logout</a>
          </nav>
        </div>
      </div>
    </>
  );
}
