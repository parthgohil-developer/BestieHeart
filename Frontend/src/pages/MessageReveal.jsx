import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { IoStop } from 'react-icons/io5';
import { BsStars } from 'react-icons/bs';

export default function MessageReveal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0A9CF] flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      
      {/* Top Icons */}
      <div className="absolute top-10 left-10 text-white text-5xl opacity-90 rotate-12">
        <BsStars />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6 relative z-10 px-6 mt-10">
        
        {/* Card 1 */}
        <div className="relative">
          <motion.div 
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
            className="bg-[#fcfaf7] rounded-[1.2rem] p-4 px-5 flex items-center gap-4 border-[3px] border-[#29262b] shadow-[4px_6px_0px_#29262b]"
          >
            <div className="bg-[#fcca3f] p-3 rounded-xl border-[2.5px] border-[#29262b]">
              <FaHeart className="text-white/90 text-xl drop-shadow-sm drop" />
            </div>
            <div>
              <p className="text-[10.5px] font-bold text-gray-400 tracking-widest font-mono uppercase">For You - Now</p>
              <p className="text-[#29262b] font-extrabold text-[15px] font-sans mt-0.5 tracking-wide">1 unopened message</p>
            </div>
          </motion.div>
          {/* Tape 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 10 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#ffe77a] opacity-95 -rotate-3 z-10 shadow-sm mix-blend-multiply"
          />
        </div>

        {/* Card 2 */}
        <div className="relative mt-2">
          <motion.div 
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1.5 }}
            className="bg-[#fcfaf7] rounded-[1.2rem] p-4 px-5 flex items-center gap-4 border-[3px] border-[#29262b] shadow-[4px_6px_0px_#29262b]"
          >
            <div className="bg-[#fcca3f] p-3 rounded-xl border-[2.5px] border-[#29262b]">
              <IoStop className="text-white/90 text-xl drop-shadow-sm" />
            </div>
            <div>
              <p className="text-[10.5px] font-bold text-gray-400 tracking-widest font-mono uppercase">For You - Now</p>
              <p className="text-[#29262b] font-extrabold text-[15px] leading-tight font-sans mt-0.5 tracking-wide">Actually... it's more than a message.</p>
            </div>
          </motion.div>
          {/* Tape 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1, type: "spring", stiffness: 200, damping: 10 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#ffe77a] opacity-95 rotate-2 z-10 shadow-sm mix-blend-multiply"
          />
        </div>

        {/* OPEN IT Button */}
        <div className="flex justify-center mt-4">
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.8, type: "spring", stiffness: 200, damping: 12 }}
            onClick={() => navigate('/door-reveal')}
            className="bg-[#fcca3f] hover:bg-[#ffb429] text-[#29262b] font-extrabold text-xl px-10 py-3.5 rounded-[1.2rem] border-[3px] border-[#29262b] shadow-[5px_7px_0px_#29262b] transition-transform active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] tracking-wider"
          >
            OPEN IT
          </motion.button>
        </div>

        {/* Footer text */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="mt-4 text-center"
        >
            <p className="text-[#b16290] font-sans text-[13px] italic tracking-wide lowercase">
                made with a lot of love just for you <span className="not-italic text-base">✨</span>
            </p>
        </motion.div>

      </div>

      {/* Smiley Face */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 1 }}
        className="absolute bottom-16 right-16 text-[#4a3f47] text-5xl transform -rotate-12 z-0 font-light opacity-80"
        style={{ fontFamily: "'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive" }}
      >
        :)
      </motion.div>
    </div>
  );
}
