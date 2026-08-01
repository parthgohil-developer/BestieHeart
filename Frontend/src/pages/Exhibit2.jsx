import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Exhibit2() {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const thumbWidth = 48; // Estimate size of the slide thumb with padding

  // Calculate the sliding constraints based on the parent component's width
  useEffect(() => {
    if (containerRef.current) {
        // padding inside track is ~6px each side, so 12px total.
        const RightEnd = containerRef.current.offsetWidth - thumbWidth - 6;
        setDragConstraints({
            left: 0,
            right: RightEnd
        });
    }
  }, []);

  const handleDrag = (event, info) => {
    // If the drag crosses 90% of the slider, count it as unlocked
    if (info.point.x > 0 && info.offset.x >= (dragConstraints.right * 0.85)) {
        setIsUnlocked(true);
        localStorage.setItem('visited_2', 'true');
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
            <p className="font-extrabold text-[#29262b] tracking-wider text-[11px]">EXHIBIT #002</p>
        </motion.div>

        {/* The Card Container */}
        <motion.div 
            layout
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`w-full aspect-square max-w-[320px] rounded-2xl border-[3px] border-[#29262b] shadow-[5px_6px_0px_#29262b] flex flex-col justify-center items-center p-6 ${isUnlocked ? 'bg-[#fffdfa]' : 'bg-[#9ea8f0]'}`}
            style={{ transition: "background-color 0.4s ease-out" }}
        >
            <AnimatePresence mode="wait">
                {!isUnlocked ? (
                    <motion.div
                        key="locked"
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col items-center justify-center gap-12"
                    >
                        {/* Lock Icon */}
                        <motion.div
                           animate={{ scale: [1, 1.05, 1] }}
                           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            <span className="text-[40px] drop-shadow-md">🔒</span>
                        </motion.div>

                        {/* Slider Controls Container */}
                        <div className="w-full flex flex-col gap-5 items-center">
                            {/* Slider Track */}
                            <div 
                                ref={containerRef}
                                className="w-[90%] h-14 bg-white rounded-full border-[3px] border-[#29262b] flex items-center px-[4px] shadow-[3px_4px_0px_#29262b] relative overflow-hidden"
                            >
                                <motion.div
                                    drag="x"
                                    dragConstraints={dragConstraints}
                                    dragElastic={0.05}
                                    dragMomentum={false}
                                    onDrag={handleDrag}
                                    className="h-[44px] w-[44px] bg-[#fbc02d] rounded-full border-[3px] border-[#29262b] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[1px_2px_0px_rgba(0,0,0,0.3)] z-10"
                                >
                                    <span className="text-[20px] select-none pointer-events-none mt-[2px] leading-none">🔒</span>
                                </motion.div>
                            </div>
                            
                            <p className="text-[#3c416e] text-[15px] font-script" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>
                                slide the latch to unlock ⟶
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="unlocked"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-full h-full flex flex-col justify-center items-center"
                    >
                        <p className="text-[#201d22] font-bold text-[15.5px] leading-8 tracking-wide font-sans text-left w-full pl-3 pr-2 opacity-90">
                           Hamari bakwaas chats 😂, random<br/>calls 📞 aur endless laughs 🤭 ...<br/>
                           this is the best part and reason of<br/>my happiness . 💛
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        {/* Footer Area with Back Button */}
        <div className="mt-6 flex items-center justify-center h-14 w-full">
            <AnimatePresence>
                {isUnlocked && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.8 }}
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
