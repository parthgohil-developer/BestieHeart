import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import zootoxImg from '../assets/zootox.jpg';

export default function Exhibit3() {
  const navigate = useNavigate();
  const [isRevealed, setIsRevealed] = useState(false);

  const handleDragEnd = (event, info) => {
    // If dragged more than 90px to the right, snap it completely open
    if (info.offset.x > 90) {
      setIsRevealed(true);
      localStorage.setItem('visited_3', 'true');
    }
  };

  return (
    <div className="min-h-screen bg-[#f1efe6] flex flex-col items-center relative font-sans overflow-hidden select-none">
      
      {/* Top Border Hazard */}
      <div className="absolute top-0 left-0 w-[50%] h-2.5 bg-gradient-to-r from-[#29262b] via-[#fbc02d] to-[#29262b] opacity-80 rounded-br-3xl -skew-x-12"></div>

      <div className="w-full max-w-md flex flex-col items-center relative z-10 px-6 mt-20">
        
        {/* Exhibit Label */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#fbc02d] border-[3px] border-[#29262b] rounded-full px-6 py-2 shadow-[2px_3px_0px_#29262b] z-20 mb-[-15px]"
        >
            <p className="font-extrabold text-[#29262b] tracking-wider text-[11px]">EXHIBIT #003</p>
        </motion.div>

        {/* The Card Container */}
        <div className="relative w-full aspect-[4/5] max-w-[320px]">
            
            {/* The Hidden Message & Image */}
            <div className="absolute inset-0 bg-[#fffdfa] border-[3px] border-[#29262b] rounded-2xl shadow-[5px_6px_0px_#29262b] p-5 flex flex-col justify-start items-center overflow-hidden z-0">
                <p className="text-[#201d22] font-semibold text-[13.5px] leading-snug tracking-wide mb-4 mt-2">
                    Proof that friendship is mostly just finding one person whose weirdness is compatible with yours.
                </p>
                <div className="flex-grow w-full border-[2.5px] border-[#29262b] rounded-xl overflow-hidden shadow-sm bg-[#eedcc8]">
                    <img 
                        src={zootoxImg} 
                        alt="Weirdness Compatible" 
                        className="w-full h-full object-cover object-center pointer-events-none" 
                    />
                </div>
            </div>

            {/* The Draggable Red Striped Curtain */}
            <AnimatePresence>
                {!isRevealed && (
                    <motion.div
                        key="curtain"
                        drag="x"
                        dragConstraints={{ left: 0, right: 350 }}
                        dragElastic={0.05}
                        dragMomentum={false}
                        onDragEnd={handleDragEnd}
                        exit={{ x: "120%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full rounded-2xl border-[3px] border-[#29262b] cursor-grab active:cursor-grabbing shadow-[5px_6px_0px_#29262b] overflow-hidden flex flex-col z-10"
                        style={{
                            backgroundImage: "repeating-linear-gradient(90deg, #e73636, #e73636 22px, #c32424 22px, #c32424 44px)"
                        }}
                    >
                        {/* Yellow curtain rod/header */}
                        <div className="w-full h-[5%] min-h-[14px] max-h-[18px] bg-[#fbc02d] border-b-[3px] border-[#29262b]"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Footer Area with Back Button */}
        <div className="mt-8 flex items-center justify-center h-14 w-full">
            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div 
                        key="instruction"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex gap-2 items-center"
                    >
                        <span className="text-[20px]">🎭</span>
                        <p className="text-[#3c416e] text-[15px] font-script" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>
                            pull the curtain aside
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="btn"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                    >
                        <button
                            onClick={() => navigate('/museum')}
                            className="bg-[#fcfaf7] text-[#4a474c] font-extrabold text-[12px] px-8 py-3.5 rounded-[0.7rem] border-[3px] border-[#29262b] shadow-[3px_4px_0px_#29262b] transition-transform active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] tracking-wider whitespace-nowrap"
                        >
                            BACK TO THE HALLWAY
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
