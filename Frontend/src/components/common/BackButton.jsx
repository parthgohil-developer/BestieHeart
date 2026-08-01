import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

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
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-md text-pink-500 rounded-full shadow-sm border border-pink-100 hover:bg-pink-100 hover:text-pink-600 transition-all hover:shadow-md group"
      >
        <FiArrowLeft className="text-xl" />
      </button>
    </motion.div>
  );
}
