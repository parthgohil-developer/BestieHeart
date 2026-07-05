import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ActionCard({ title, imageSrc, route }) {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(route)}
      className="bg-white rounded-2xl shadow-lg border border-pink-50 p-6 flex flex-col items-center justify-center cursor-pointer group hover:shadow-xl"
    >
      <div className="w-37 h-40 mb-6 rounded-full bg-pink-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" 
          />
        ) : (
          <span className="text-pink-300/50 text-sm font-sans tracking-widest text-center px-2">Image Placeholder</span>
        )}
      </div>
      <h3 className="text-2xl font-serif font-bold text-[#ffb6c1] tracking-wide text-center uppercase">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-400 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Click to open
      </p>
    </motion.div>
  );
}
