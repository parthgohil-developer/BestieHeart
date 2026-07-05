import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, closeSidebar }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

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
            <button 
                onClick={handleLogout} 
                className="text-left hover:text-red-400 transition-colors mt-auto text-red-300 border-t pt-4 focus:outline-none"
            >
                Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Logout Modal Overlay */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl flex flex-col items-center border border-pink-50 max-w-sm mx-4 text-center relative overflow-hidden"
            >
                <motion.div 
                    initial={{ rotate: -20, scale: 0.5 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                    className="text-6xl md:text-7xl mb-6 shadow-sm"
                >
                  🫡
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 tracking-wide leading-snug">
                    This is Parth <br/> <span className="text-pink-400">Signing OFF</span>
                </h2>
                
                <div className="w-full bg-gray-50 h-1 rounded-full overflow-hidden mt-8">
                   <motion.div 
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 3, ease: "linear" }}
                     className="h-full bg-gradient-to-r from-red-300 to-pink-400"
                   />
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
