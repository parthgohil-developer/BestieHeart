import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function FinalPage() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState(0); 
    const [diagStep, setDiagStep] = useState(0);
    const [showFateBtn, setShowFateBtn] = useState(false);

    useEffect(() => {
        if (phase === 1) {
            // Flash phase lasts 3.5s
            const timer = setTimeout(() => {
                setPhase(2);
            }, 3500); 
            return () => clearTimeout(timer);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 2) {
            const timeouts = [
                setTimeout(() => setDiagStep(1), 1000),
                setTimeout(() => setDiagStep(2), 2000),
                setTimeout(() => setDiagStep(3), 3000),
                setTimeout(() => setDiagStep(4), 4500), // Loading finishes
                setTimeout(() => setPhase(3), 5200), // Transition
            ];
            return () => timeouts.forEach(clearTimeout);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 3) {
            const timer = setTimeout(() => setShowFateBtn(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Subcomponents for cleaner code
    const Phase0 = () => (
        <motion.div 
            key="p0"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center h-full w-full mt-24 z-10"
        >
            <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-[#fbc02d] border-[3px] border-[#29262b] shadow-[3px_4px_0px_#29262b] rounded-md px-5 py-2.5 mb-14"
            >
                <p className="font-extrabold text-[12px] tracking-widest text-[#29262b] flex items-center gap-2">
                    <span className="text-[10px]">⚠️</span> DO NOT PRESS
                </p>
            </motion.div>

            <motion.button 
                onClick={() => setPhase(1)}
                whileHover={{ scale: 1.05 }}
                className="w-[160px] h-[160px] rounded-full bg-gradient-to-tr from-[#dc2626] to-[#f87171] border-[5px] border-[#29262b] shadow-[6px_8px_0px_#29262b] active:shadow-[1px_2px_0px_#29262b] active:translate-y-3 transition-all cursor-pointer outline-none relative overflow-hidden flex items-center justify-center"
            >
                {/* inner reflection/highlight */}
                <div className="absolute top-3 left-6 w-24 h-10 bg-white opacity-25 rounded-full blur-[3px] transform -rotate-[20deg] pointer-events-none"></div>
            </motion.button>
            <p className="mt-10 text-gray-500 text-sm font-sans tracking-wide">seriously. do not.</p>
        </motion.div>
    );

    const Phase1 = () => (
        <motion.div 
            key="p1"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-center"
            >
                <h1 className="text-[#ef4444] font-black text-[32px] uppercase tracking-widest leading-snug drop-shadow-md" style={{ WebkitTextStroke: "2.5px #29262b", textShadow: "4px 5px 0px #29262b" }}>
                    FRIENDSHIP<br/>EMERGENCY<br/>DETECTED
                </h1>
            </motion.div>
        </motion.div>
    );

    const Phase2 = () => {
        const diagnostics = [
            { label: "Checking loyalty...", result: "SUSPICIOUS", resColor: "text-gray-500" },
            { label: "Checking emotional damage...", result: "MUTUAL", resColor: "text-[#10b981]" },
            { label: "Checking stupid conversations...", result: "COUNT FAILED", resColor: "text-gray-500" },
            { label: "Checking embarrassing intel...", result: "CLASSIFIED", resColor: "text-gray-500" },
        ];

        return (
        <motion.div 
            key="p2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            className="flex flex-col items-center justify-center h-full w-full max-w-[340px] mx-auto mt-24 px-4 z-10"
        >
            <div className="bg-white border-[3px] border-[#29262b] rounded-full px-5 py-2 mb-10 text-center w-full shadow-sm">
                <p className="font-extrabold text-[10px] tracking-widest text-[#29262b]">RUNNING FRIENDSHIP DIAGNOSTIC</p>
            </div>

            <div className="w-full flex flex-col gap-4 font-mono text-[11px] text-gray-700 font-semibold tracking-tight mb-10 pr-2 pl-1">
                {diagnostics.map((item, index) => (
                    <div key={index} className="flex justify-between items-end border-b-[1.5px] border-dashed border-gray-300 pb-1 h-5 overflow-hidden">
                        <span className="whitespace-nowrap">{item.label}</span>
                        {diagStep > index ? (
                            <span className={"font-bold whitespace-nowrap ml-2 " + item.resColor}>
                                ✓ {item.result}
                            </span>
                        ) : (
                            <span className="opacity-0">.</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Loading Bar */}
            <div className="w-full h-3.5 border-[2.5px] border-[#29262b] bg-white rounded-full p-[2px] overflow-hidden mt-6">
                <motion.div 
                    className="h-full bg-[#10b981] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.8, ease: "linear" }}
                />
            </div>
        </motion.div>
    )};

    const Phase3 = () => (
        <motion.div 
            key="p3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center h-full w-full max-w-[320px] mx-auto mt-20 px-4 text-center z-20"
        >
            <p className="font-extrabold text-[11px] tracking-[0.25em] text-gray-500 mb-6">RESULT:</p>
            
            <h2 className="font-black text-[32px] text-[#29262b] leading-[1.1] mb-5 uppercase tracking-wide">
                You know way<br/>too much.
            </h2>
            
            <p className="text-gray-600 font-bold text-[15px] leading-relaxed px-4 opacity-90">
                Unfortunately, we are now<br/>friends for life.
            </p>

            <motion.div 
                initial={{ opacity: 0, rotate: 18, scale: 3 }}
                animate={{ opacity: 1, rotate: -5, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.6 }}
                className="mt-8 bg-white border-[2.5px] border-[#d32f2f] p-1 rounded filter drop-shadow-sm opacity-95"
            >
                <div className="border-[1.5px] border-[#d32f2f] rounded-[2px] px-6 py-2.5">
                    <p className="text-[#d32f2f] font-black text-[12px] tracking-widest leading-[1.8]">
                        NO CANCELLATIONS.<br/>NO REFUNDS.
                    </p>
                </div>
            </motion.div>

            <AnimatePresence>
                {showFateBtn && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mt-14 w-full"
                    >
                        <button 
                            onClick={() => navigate('/word-search')} 
                            className="bg-[#fbc02d] text-[#29262b] font-black text-[14px] px-8 py-4 rounded-xl border-[3px] border-[#29262b] shadow-[4px_6px_0px_#29262b] active:translate-y-1.5 active:shadow-[1px_2px_0px_#29262b] transition-transform tracking-wider"
                        >
                            ACCEPT MY FATE
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return (
        <motion.div 
           animate={{
               backgroundColor: phase === 1 
                   ? ["#ef4444", "#fca5a5", "#ef4444"] 
                   : (phase === 0 || phase === 2 || phase === 3) ? "#f1efe6" : "#f1efe6"
           }}
           transition={phase === 1 ? { repeat: Infinity, duration: 0.5 } : { duration: 0.4 }}
           className="min-h-screen flex flex-col relative font-sans overflow-hidden select-none"
        >
            {/* Top Hazard Border */}
            <div className={`absolute top-0 left-0 w-[50%] h-2.5 bg-gradient-to-r from-[#29262b] via-[#fbc02d] to-[#29262b] opacity-80 rounded-br-3xl -skew-x-12 z-40 ${phase === 1 ? 'hidden' : 'block'}`}></div>

            {/* Persistent do NOT text (Disappears in Phase 3) */}
            <AnimatePresence>
                {phase < 3 && (
                    <motion.p 
                        exit={{ opacity: 0 }}
                        className="absolute top-16 left-8 text-[#dc2626] text-[22px] rotate-[-5deg] z-40 opacity-90 font-semibold" 
                        style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive", filter: phase === 1 ? "brightness(0)" : "none" }}
                    >
                        do NOT.
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Content Transitions */}
            <div className="relative flex-grow flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {phase === 0 && <Phase0 />}
                    {phase === 2 && <Phase2 />}
                    {phase === 3 && <Phase3 />}
                </AnimatePresence>

                {/* Phase 1 covers everything */}
                <AnimatePresence>
                    {phase === 1 && <Phase1 />}
                </AnimatePresence>
            </div>
            
        </motion.div>
    );
}
