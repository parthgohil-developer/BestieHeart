import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

export default function Museum() {
  const navigate = useNavigate();
  const [visited, setVisited] = useState({ 1: false, 2: false, 3: false });

  useEffect(() => {
     // Retrieve completion status from local storage
     setVisited({
         1: localStorage.getItem('visited_1') === 'true',
         2: localStorage.getItem('visited_2') === 'true',
         3: localStorage.getItem('visited_3') === 'true',
     });
  }, []);

  const allVisited = visited[1] && visited[2] && visited[3];

  const handleExhibitClick = (exhibitNum, exhibitName, icon, path) => {
      // Fire and forget email notification
      try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          axios.post(`${API_URL}/api/form/personal-reply`, {
              message: `User just entered ${exhibitName} ${icon} !`,
              customTitle: '🏛️ Museum Tour Activity'
          });
      } catch (err) {
          console.error("Failed to notify", err);
      }
      navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#fed653] flex flex-col items-center relative font-sans overflow-hidden select-none">
      
      {/* Main Content */}
      <div className="w-full max-w-[400px] flex flex-col items-center relative z-10 px-6 mt-[4.5rem]">
        
        {/* Title Section */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center flex flex-col items-center"
        >
            <h2 className="text-[#393432] font-black text-[16.5px] font-sans tracking-wide leading-snug">
                Welcome to the extremely<br/>prestigious
            </h2>
            <h1 className="text-[#ee4343] font-black text-[22px] tracking-wider mt-1.5 underline decoration-wavy decoration-[#ee4343] decoration-2 underline-offset-4">
                Museum of Us.
            </h1>
            <p className="text-[#645c58] text-[13px] font-medium tracking-wide mt-6 opacity-90">
                Please don't touch anything.
            </p>
            <p className="text-[#e26720] mt-1 text-[13px] font-bold font-sans underline decoration-wavy decoration-[#e26720] decoration-[1.5px] underline-offset-4">
                ...obviously, touch everything.
            </p>
        </motion.div>

        {/* Museum Cards Row */}
        <div className="flex gap-4 mt-12 w-full justify-center">
            
            {/* Exhibit 001 */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => handleExhibitClick(1, 'EXHIBIT 001', '✨', '/exhibit-1')}
            >
                <div className="bg-[#fcbad8] w-20 h-[110px] rounded-xl border-[2.5px] border-[#29262b] shadow-[3px_4px_0px_#29262b] flex items-center justify-center group-hover:scale-105 transition-transform active:scale-95 group-active:translate-y-1 group-active:shadow-[1px_2px_0px_#29262b]">
                   <span className="text-[32px] drop-shadow-sm leading-none opacity-90">✨</span>
                </div>
                <div className="bg-white border-[2.5px] border-[#29262b] rounded-full px-2.5 py-1.5 shadow-[2px_2px_0px_#29262b]">
                   <p className="text-[7.5px] font-extrabold tracking-widest text-[#29262b]">EXHIBIT 001</p>
                </div>
                <p className="text-[#7d6537] text-xs transform -rotate-[12deg] font-script mt-[-2px]" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>{visited[1] ? '✓' : 'tap'}</p>
            </motion.div>

            {/* Exhibit 002 */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => handleExhibitClick(2, 'EXHIBIT 002', '🔒', '/exhibit-2')}
            >
                <div className="bg-[#bce6d6] w-20 h-[110px] rounded-xl border-[2.5px] border-[#29262b] shadow-[3px_4px_0px_#29262b] flex items-center justify-center group-hover:scale-105 transition-transform active:scale-95 group-active:translate-y-1 group-active:shadow-[1px_2px_0px_#29262b]">
                   <span className="text-[32px] drop-shadow-sm leading-none opacity-90">🔒</span>
                </div>
                <div className="bg-white border-[2.5px] border-[#29262b] rounded-full px-2.5 py-1.5 shadow-[2px_2px_0px_#29262b]">
                   <p className="text-[7.5px] font-extrabold tracking-widest text-[#29262b]">EXHIBIT 002</p>
                </div>
                <p className="text-[#7d6537] text-xs transform -rotate-[12deg] font-script mt-[-2px]" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>{visited[2] ? '✓' : 'tap'}</p>
            </motion.div>

            {/* Exhibit 003 */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => handleExhibitClick(3, 'EXHIBIT 003', '🎪', '/exhibit-3')}
            >
                <div className="bg-[#ded5f8] w-20 h-[110px] rounded-xl border-[2.5px] border-[#29262b] shadow-[3px_4px_0px_#29262b] flex items-center justify-center group-hover:scale-105 transition-transform active:scale-95 group-active:translate-y-1 group-active:shadow-[1px_2px_0px_#29262b]">
                   <span className="text-[35px] drop-shadow-sm leading-none opacity-90">🎪</span>
                </div>
                <div className="bg-white border-[2.5px] border-[#29262b] rounded-full px-2.5 py-1.5 shadow-[2px_2px_0px_#29262b]">
                   <p className="text-[7.5px] font-extrabold tracking-widest text-[#29262b]">EXHIBIT 003</p>
                </div>
                <p className="text-[#7d6537] text-xs transform -rotate-[12deg] font-script mt-[-2px]" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>{visited[3] ? '✓' : 'tap'}</p>
            </motion.div>
        
        </div>

        {/* Global Action Button */}
        {allVisited && (
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
               className="mt-10 z-20"
            >
                <button 
                   onClick={() => navigate('/final')}
                   className="bg-[#fbc02d] text-[#29262b] font-black text-[13px] px-8 py-3.5 rounded-xl border-[3px] border-[#29262b] shadow-[4px_5px_0px_#29262b] active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] transition-transform tracking-wider"
                >
                    CONTINUE THE TOUR ➔
                </button>
            </motion.div>
        )}

      </div>

      {/* Decorative Star */}
      <div className="absolute bottom-10 left-[12%] text-white text-[45px] rotate-[15deg]">
          <FaStar className="opacity-[0.85]" />
      </div>

    </div>
  );
}
