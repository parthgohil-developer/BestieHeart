import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import BackButton from '../components/common/BackButton';

export default function Agreement() {
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const [checks, setChecks] = useState([false, false, false, false, false, false]);
    const [isAgreed, setIsAgreed] = useState(false);

    const items = [
        "Continue sending unnecessary memes",
        "Provide emotional support when required",
        "Pretend to listen to repeated stories",
        "Participate in questionable plans",
        "Remain available for random \"bro listen\" messages",
        "Maintain confidentiality regarding embarrassing information"
    ];

    const handleCheck = (index) => {
        if (isAgreed) return;
        const newChecks = [...checks];
        newChecks[index] = !newChecks[index];
        setChecks(newChecks);
    };

    const allChecked = checks.every(c => c === true);

    const handleAccept = () => {
        if (allChecked && !isAgreed) {
            setIsAgreed(true);
            
            // Fire email notification that Mittal accepted
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                axios.post(`${API_URL}/api/form/personal-reply`, {
                    message: `Mittal has accepted the Friendship Renewal Agreement! ✅🎉`,
                    customTitle: '📜 Agreement Accepted'
                });
            } catch (err) {
                console.error("Failed to notify", err);
            }

            setTimeout(() => navigate('/message-form'), 3500); 
        }
    };

    return (
        <div className="min-h-screen bg-[#a88bee] flex items-center justify-center relative font-sans overflow-hidden select-none p-6">
            
            <BackButton />

            {/* Confetti Explosion */}
            {isAgreed && (
                <div className="absolute inset-0 pointer-events-none z-50">
                    <Confetti width={width} height={height} recycle={false} numberOfPieces={800} gravity={0.25} />
                </div>
            )}

            {/* Main Agreement Contract Container */}
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ type: "spring", stiffness: 150, damping: 20 }}
               className="bg-[#f1efe6] w-full max-w-[340px] border-[3.5px] border-[#29262b] shadow-[6px_8px_0px_#29262b] rounded flex flex-col pt-12 pb-6 px-6 relative z-10"
            >
                {/* Yellow Tape */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-[#fde047] rotate-[-2deg] opacity-95 shadow-[1px_2px_0px_rgba(0,0,0,0.1)] z-20"></div>

                <h1 className="text-center font-black text-[17px] tracking-[0.1em] text-[#29262b] leading-[1.3] mb-4">
                    FRIENDSHIP RENEWAL<br/>AGREEMENT
                </h1>
                
                <div className="w-full border-t-[2px] border-[#29262b] mb-5 opacity-90"></div>
                
                <p className="text-[13px] text-gray-700 font-semibold mb-6">
                    By continuing, <span className="font-bold text-black border-b border-black">Mittal ❤️😘</span> agrees to:
                </p>

                {/* Checklist */}
                <div className="flex flex-col gap-4 mb-2 relative">
                    
                    {/* Items */}
                    {items.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => handleCheck(i)}
                                className={`flex-shrink-0 w-[22px] h-[22px] mt-0.5 rounded-[4px] border-[2.5px] border-[#29262b] flex items-center justify-center transition-colors shadow-[2px_2px_0px_#29262b] ${checks[i] ? 'bg-[#10b981]' : 'bg-white'}`}
                            >
                                <AnimatePresence>
                                    {checks[i] && (
                                        <motion.svg 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="w-4 h-4 text-white" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor" 
                                            strokeWidth={4.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                            <p className="text-[13px] leading-[1.25] text-gray-800 font-bold pt-[1px] opacity-90">
                                {item}
                            </p>
                        </div>
                    ))}

                    {/* Stamp Overlay */}
                    <AnimatePresence>
                        {isAgreed && (
                            <motion.div 
                               initial={{ opacity: 0, scale: 3, rotate: -35 }}
                               animate={{ opacity: 1, scale: 1, rotate: -12 }}
                               transition={{ type: "spring", stiffness: 250, damping: 15 }}
                               className="absolute top-[40%] left-1/2 w-[270px] bg-white/70 backdrop-blur-[2px] p-2 rounded-sm border-[3px] border-[#dc2626] shadow-md pointer-events-none z-30"
                               style={{ x: "-50%", y: "-50%" }}
                            >
                               <div className="border-[2px] border-[#dc2626] border-solid rounded-sm px-2 py-3 text-center">
                                   <p className="text-[#dc2626] font-black text-[26px] tracking-[0.1em] leading-[1.2] opacity-95">
                                       FRIENDSHIP<br/>RENEWED <span className="text-[26px]">✓</span>
                                   </p>
                               </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                <div className="w-full mt-4 mb-4 border-t-[2.5px] border-dashed border-gray-400"></div>

                <p className="text-[12px] text-gray-500 font-medium mb-6">
                    Term: <span className="font-bold text-[#29262b]">Lifetime</span>
                </p>

                {/* Final Accept Button */}
                <button 
                   disabled={!allChecked || isAgreed}
                   onClick={handleAccept}
                   className={`w-full py-3.5 rounded-xl font-black text-[14px] border-[3px] border-[#29262b] transition-all tracking-wider
                       ${allChecked && !isAgreed 
                           ? 'bg-[#fbc02d] text-[#29262b] shadow-[4px_5px_0px_#29262b] active:translate-y-1 active:shadow-[1px_2px_0px_#29262b]' 
                           : isAgreed 
                                ? 'bg-gray-200 text-gray-400 shadow-[1px_1px_0px_#29262b] opacity-60' 
                                : 'bg-[#fde047]/60 text-gray-500 shadow-[2px_3px_0px_#29262b] opacity-80 cursor-not-allowed'}`}
                >
                   {isAgreed ? (
                        <span className="flex items-center justify-center gap-2">
                             ACCEPTED ✓
                        </span>
                   ) : (
                       "I ACCEPT"
                   )}
                </button>

            </motion.div>

        </div>
    );
}
