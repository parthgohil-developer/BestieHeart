import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DoorReveal() {
  const navigate = useNavigate();
  const [showRule, setShowRule] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const handleFineClick = () => {
    setIsZooming(true);
    setTimeout(() => {
      navigate('/museum');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#aabde8] flex flex-col items-center justify-center relative font-sans overflow-hidden select-none">
      
      {/* Header Icons */}
      <motion.div 
         animate={{ opacity: isZooming ? 0 : 1 }}
         className="absolute top-6 z-20"
      >
          {/* Top space for potential future icons if needed */}
      </motion.div>

      <div className="w-full max-w-sm flex flex-col items-center relative z-10 px-6 mt-4">
        
        {/* knock knock text */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isZooming ? 0 : 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="self-end mr-6 mb-6"
        >
            <p className="text-[#414b5c] text-xl transform -rotate-[10deg]" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>
                knock knock...
            </p>
        </motion.div>

        {/* DOOR SVG */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isZooming ? { scale: 50, y: 200, opacity: 0 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: isZooming ? 1.5 : 0.6, ease: isZooming ? "easeIn" : "easeOut" }}
            className="flex flex-col items-center cursor-pointer hover:scale-[1.02] transition-transform active:scale-95 z-50 origin-center"
        >
            <svg width="200" height="240" viewBox="0 0 160 220" className="z-10 overflow-visible drop-shadow-sm">
                {/* Yellow Depth Edge Frame */}
                {/* Draws a slightly offset larger arched rectangle sitting behind */}
                <path d="M25,200 L25,80 Q75,10 135,80 L135,200 Z" fill="#eec253" />
                <path d="M25,200 L25,80 Q75,10 135,80 L135,200 Z" fill="none" stroke="#29262b" strokeWidth="5" />
                
                {/* Main Door Front panel */}
                <path d="M20,200 L20,85 Q70,25 120,85 L120,200 Z" fill="#fa4a4a" />
                <path d="M20,200 L20,85 Q70,25 120,85 L120,200 Z" fill="none" stroke="#29262b" strokeWidth="5" />
                
                {/* Top inset panel */}
                <path d="M40,120 L40,95 Q70,55 100,95 L100,120 Z" fill="#e03e3e" />
                <path d="M40,120 L40,95 Q70,55 100,95 L100,120 Z" fill="none" stroke="#29262b" strokeWidth="3" />

                {/* Bottom inset panel */}
                <rect x="40" y="135" width="60" height="50" rx="6" fill="#e03e3e" stroke="#29262b" strokeWidth="3" />
                
                {/* Doorknob */}
                <circle cx="108" cy="125" r="4.5" fill="#f8cd5b" stroke="#29262b" strokeWidth="2" />
                <circle cx="108" cy="125" r="1.5" fill="#e1b142" />

                {/* Bold Bottom Floor Line */}
                <line x1="17" y1="200" x2="138" y2="200" stroke="#29262b" strokeWidth="6" strokeLinecap="round" />
            </svg>
            
            {/* Soft Shadow Underneath */}
            <div className="w-36 h-5 bg-black/15 rounded-[100%] mt-[-5px] z-0 blur-[3px]"></div>
        </motion.div>

        {/* Dynamic State UI */}
        <motion.div animate={{ opacity: isZooming ? 0 : 1 }} className="w-full">
            {!showRule ? (
              <>
            {/* HEY MITTAL Text */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-center"
            >
                <h1 className="text-[25px] font-black text-[#29262b] tracking-wider mb-2.5 font-sans">
                    HEY MITTAL ❤️😘.
                </h1>
                <p className="text-[#59657a] text-[13px] font-medium tracking-wide">
                    I made a tiny place on the internet for you.
                </p>
            </motion.div>

            {/* Rule text with wavy underline */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="mt-5"
            >
                <p className="text-[#ee4343] font-bold text-[17px] font-sans underline decoration-wavy decoration-[#29262b] decoration-2 underline-offset-[5px]">
                    There is only one rule.
                </p>
            </motion.div>

            {/* What's the rule button */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.4, type: "spring", stiffness: 200, damping: 10 }}
                className="mt-6 flex justify-center w-full"
            >
                <button 
                    onClick={() => setShowRule(true)}
                    className="bg-[#fcfaf7] text-[#29262b] font-extrabold text-[13px] px-8 py-3 rounded-[0.9rem] border-[3px] border-[#29262b] shadow-[4px_6px_0px_#29262b] transition-transform active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] tracking-wider"
                >
                    WHAT'S THE RULE?
                </button>
            </motion.div>
          </>
        ) : (
          <>
            {/* Displaying the actual rule */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
            >
                <p className="text-[#1a233b] font-bold text-[17px] leading-relaxed tracking-wide font-sans">
                   You have to keep going<br/>until the end.
                </p>
            </motion.div>

            {/* Response Buttons */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                className="mt-6 flex gap-3 justify-center w-full"
            >
                <button 
                    onClick={handleFineClick} 
                    className="bg-[#ffcb2d] text-[#29262b] font-extrabold text-[12px] px-5 py-3 rounded-[0.7rem] border-[3px] border-[#29262b] shadow-[4px_5px_0px_#29262b] transition-transform active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] tracking-wider whitespace-nowrap"
                >
                    FINE 🙄
                </button>
                <button 
                    onClick={() => {}} // Can add logic later if needed
                    className="bg-[#fcfaf7] text-[#29262b] font-extrabold text-[12px] px-5 py-3 rounded-[0.7rem] border-[3px] border-[#29262b] shadow-[4px_5px_0px_#29262b] transition-transform active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] tracking-wider whitespace-nowrap"
                >
                    ABSOLUTELY NOT
                </button>
            </motion.div>
          </>
        )}
        </motion.div>

      </div>
    </div>
  );
}
