import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function WordSearch() {
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const [isRevealed, setIsRevealed] = useState(false);

    const grid = [
        ['F', 'B', 'C', 'U', 'Y', 'N', 'J', 'A', 'P', 'X'],
        ['Z', 'R', 'Z', 'H', 'A', 'P', 'P', 'Y', 'J', 'C'],
        ['J', 'R', 'I', 'E', 'Q', 'X', 'Z', 'H', 'D', 'R'],
        ['W', 'N', 'G', 'E', 'V', 'M', 'O', 'J', 'A', 'M'],
        ['U', 'Z', 'G', 'T', 'N', 'P', 'U', 'F', 'Y', 'T'],
        ['F', 'R', 'T', 'I', 'R', 'D', 'T', 'G', 'N', 'W'],
        ['M', 'Y', 'O', 'U', 'U', 'M', 'S', 'Z', 'E', 'O'],
        ['T', 'U', 'E', 'N', 'Z', 'C', 'O', 'H', 'P', 'Y'],
        ['C', 'R', 'P', 'I', 'P', 'O', 'S', 'K', 'I', 'Q'],
        ['C', 'I', 'X', 'A', 'M', 'Q', 'L', 'B', 'K', 'P']
    ];

    const getHighlighted = (r, c) => {
        if (!isRevealed) return false;
        if (r===c) return true; // FRIENDSHIP
        if (r===1 && c>=3 && c<=7) return true; // HAPPY
        if (c===8 && r>=2 && r<=4) return true; // DAY
        if (r===6 && c>=1 && c<=3) return true; // YOU
        if (r===8 && c>=2 && c<=5) return true; // PIPO
        return false;
    }

    return (
        <div className="min-h-screen bg-[#f1efe6] flex flex-col items-center relative font-sans overflow-hidden select-none pb-10">
            {isRevealed && (
                <div className="absolute inset-0 pointer-events-none z-50">
                    <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.15} />
                </div>
            )}

            {/* Top Hazard Border */}
            <div className="absolute top-0 left-0 w-[50%] h-2.5 bg-gradient-to-r from-[#29262b] via-[#fbc02d] to-[#29262b] opacity-80 rounded-br-3xl -skew-x-12 z-40"></div>

            <div className="w-full max-w-md flex flex-col items-center relative z-10 px-4 mt-20">
                
                {/* The Grid Container */}
                <div className="relative w-full aspect-square bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100 to-[#fffdfa] border-[3px] border-[#29262b] rounded-2xl shadow-[5px_6px_0px_#29262b] p-3 flex flex-col overflow-hidden">
                    
                    {/* Render Highlight Pills Absolutely behind the text grid */}
                    <AnimatePresence>
                    {isRevealed && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-x-3 inset-y-3 pointer-events-none z-0"
                        >
                            {/* FRIENDSHIP (Diagonal) */}
                            <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "135%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="absolute bg-[#ef4444] h-[10%] rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                                style={{ top: "5%", left: "5%", transformOrigin: "left center", transform: "translateY(-50%) rotate(45deg)" }}
                            />

                            {/* HAPPY */}
                            <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "50%" }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                                className="absolute bg-[#4f46e5] h-[10%] rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                                style={{ top: "10%", left: "30%" }}
                            />

                            {/* DAY */}
                            <motion.div 
                                initial={{ height: "0%" }}
                                animate={{ height: "30%" }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
                                className="absolute bg-[#10b981] w-[10%] rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                                style={{ top: "20%", left: "80%" }}
                            />

                            {/* YOU */}
                            <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "30%" }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 1.0 }}
                                className="absolute bg-[#f97316] h-[10%] rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                                style={{ top: "60%", left: "10%" }}
                            />

                            {/* PIPO */}
                            <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "40%" }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 1.2 }}
                                className="absolute bg-[#ec4899] h-[10%] rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                                style={{ top: "80%", left: "20%" }}
                            />
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {/* Text Grid */}
                    <div className="relative z-10 w-full h-full flex flex-col font-script" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>
                        {grid.map((row, r) => (
                            <div key={r} className="flex-1 flex w-full">
                                {row.map((letter, c) => (
                                    <div key={c} className="flex-1 flex items-center justify-center">
                                        <motion.span 
                                            animate={{ 
                                                color: getHighlighted(r, c) ? "#ffffff" : "#29262b",
                                                scale: getHighlighted(r, c) ? 1.05 : 1
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="text-[17px] font-bold"
                                        >
                                            {letter}
                                        </motion.span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Content Actions */}
                <div className="mt-10 flex items-center justify-center min-h-[140px] w-full text-center relative z-40">
                    <AnimatePresence mode="wait">
                        {!isRevealed ? (
                            <motion.div 
                                key="prompt"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col gap-6 items-center"
                            >
                                <h3 className="text-[#29262b] text-[16px] font-black tracking-tight" style={{ fontFamily: "sans-serif" }}>spot the hidden words? 👀</h3>
                                <button
                                    onClick={() => setIsRevealed(true)}
                                    className="bg-[#fcfaf7] text-[#4a474c] font-black uppercase text-[12px] px-8 py-3.5 rounded-[0.7rem] border-[3px] border-[#29262b] shadow-[3px_4px_0px_#29262b] transition-transform active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] tracking-wider"
                                >
                                    REVEAL IT, GENIUS 🙄
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.8 }}
                                className="flex flex-col gap-7 items-center w-full"
                            >
                                <h2 
                                   className="text-[#29262b] font-black text-[22px] leading-tight drop-shadow-md"
                                   style={{ textShadow: "2px 2px 0px #fbc02d" }}
                                >
                                    HAPPY FRIENDSHIP <br/> DAY,<br/> YOU PIPO 💛
                                </h2>
                                <button
                                    onClick={() => navigate('/agreement')}
                                    className="bg-[#fbc02d] text-[#29262b] font-extrabold text-[12px] px-10 py-3.5 rounded-xl border-[3px] border-[#29262b] shadow-[4px_5px_0px_#29262b] transition-transform active:translate-y-1 active:shadow-[1px_2px_0px_#29262b] tracking-wider"
                                >
                                    CONTINUE ➔
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
