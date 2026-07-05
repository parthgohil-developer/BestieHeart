import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define routes where the back button should NOT appear
  const hiddenRoutes = ['/', '/home'];

  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-24 left-6 z-50"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center px-4 py-2 bg-white/80 backdrop-blur-md text-pink-500 rounded-full shadow-lg border border-pink-100 hover:bg-pink-100 hover:text-pink-600 transition-all font-sans font-bold hover:shadow-xl group"
      >
        <span className="text-xl leading-none mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back</span>
      </button>
    </motion.div>
  );
}
