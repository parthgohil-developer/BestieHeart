import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Exhibit1() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Wait slightly to ensure layout has rendered before sizing
    const timer = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        // Fill dusty color
        ctx.fillStyle = '#e4e1db';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some noise (dots) to look like gritty dust
        for (let i = 0; i < 3000; i++) {
           ctx.fillStyle = Math.random() > 0.5 ? '#cecac3' : '#f0ede7';
           ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 1.5);
        }

        // Add 'dust' text embedded inside
        ctx.fillStyle = '#a8a59d';
        ctx.font = '22px "Segoe Script", cursive';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('dust', canvas.width / 2, canvas.height / 2);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScratch = (e) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Support for both touch and mouse events seamlessly
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const handleMouseMove = (e) => {
     if (e.buttons !== 1) return; // Only scratch when mouse is held down
     handleScratch(e);
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let cleared = 0;
    
    // Alpha channel is the 4th element (index 3). Count thoroughly transparent pixels.
    for (let i = 3; i < data.length; i += 4) {
         if (data[i] < 10) cleared++;
    }
    const total = data.length / 4;
    const percentage = (cleared / total) * 100;
    
    if (percentage > 50) {
         setIsRevealed(true);
         localStorage.setItem('visited_1', 'true');
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
            <p className="font-extrabold text-[#29262b] tracking-wider text-[11px]">EXHIBIT #001</p>
        </motion.div>

        {/* Scratch Card Container */}
        <div className="relative w-full aspect-[4/5] max-w-[320px]">
            {/* The Hidden Message */}
            <div className="absolute inset-0 bg-[#fffdfa] border-[3px] border-[#29262b] rounded-2xl shadow-[5px_6px_0px_#29262b] p-6 flex flex-col justify-center items-center text-center overflow-auto">
                <p className="text-[#29262b] font-medium text-[13.5px] leading-relaxed tracking-wide">
                    I'm really grateful to have you in my life. <br />
                    Thank you for always being such a kind and amazing friend. <br />
                    Wishing our friendship stays this beautiful forever! 😊
                </p>
                <div className="w-12 h-[1px] bg-pink-300 my-4"></div>
                <p className="text-[#29262b] font-medium text-[13.5px] leading-relaxed tracking-wide">
                    You always make conversations more fun and brighten my day without even trying. <br />
                    I'm lucky that I found a friend like you. <br />
                    No matter where life takes us, I hope we'll always stay this close. <br />
                    <span className="font-bold text-[#e1476b]">Stay happy, keep smiling, and never change. ❤️</span>
                </p>
            </div>

            {/* The Scratchable Glass (Canvas) */}
            <AnimatePresence>
                {!isRevealed && (
                    <motion.canvas
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        ref={canvasRef}
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleScratch}
                        className="absolute inset-0 w-full h-full border-[3px] border-[#29262b] rounded-2xl cursor-pointer touch-none shadow-[5px_6px_0px_#29262b]"
                    />
                )}
            </AnimatePresence>
        </div>

        {/* Footer Area */}
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
                        <span className="text-xl">👇</span>
                        <p className="text-[#7d6537] text-[15px] font-script" style={{ fontFamily: "'Bradley Hand', 'Segoe Script', cursive" }}>
                            rub the dusty glass clean
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="btn"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
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
