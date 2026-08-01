import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Friendship() {
  const canvasRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Set internal resolution strictly to physical size
    // to keep the drawn lines crisp and properly centered
    const size = Math.min(window.innerWidth - 40, 800);
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Background already black via CSS, but we can fill just in case
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);

    const colors = ["red", "blue", "lime", "yellow", "cyan", "magenta", "orange", "pink"];
    let step = 0;

    const drawStep = () => {
      if (step >= 120) {
        setIsComplete(true);
        return;
      }

      // Center and starting point
      const startX = size / 2;
      const startY = size / 2 - (40 * (size / 800)); // slightly above center, scaled

      const angle = step * (Math.PI * 2) / 120;
      
      // Heart formula, x and y scaled relative to canvas size
      // original multiplier was 15 for a fixed window. We scale it up.
      const scaleFactor = 15 * (size / 600); 
      
      const px = 16 * Math.pow(Math.sin(angle), 3) * scaleFactor;
      const py = (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * scaleFactor;

      const targetX = startX + px;
      const targetY = startY - py;

      // Ensure color is randomly distributed as per Python exactly
      const c = colors[Math.floor(Math.random() * colors.length)];
      ctx.strokeStyle = c;
      ctx.lineWidth = 1;

      // Draw the main ray
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      // Draw the sparkle / star point at the end of the ray
      for (let r = 0; r < 8; r++) {
        const sparkleAngle = (r * 45) * (Math.PI / 180);
        // length of sparkle is 6 in python
        const slen = 6 * (size / 600); 
        const sx = targetX + slen * Math.cos(sparkleAngle);
        const sy = targetY + slen * Math.sin(sparkleAngle);
        
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      step++;
      // A small timeout to physically show the drawing animation process
      setTimeout(() => {
        requestAnimationFrame(drawStep);
      }, 50);
    };

    // Start drawing
    requestAnimationFrame(drawStep);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans overflow-hidden relative">
        <AnimatePresence>
            {isComplete && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 90, delay: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4"
                >
                    <div className="bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-pink-500/40 shadow-[0_0_80px_rgba(255,105,180,0.6)] flex flex-col items-center text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] tracking-wider">
                            Happy Friendship Day!
                        </h1>
                        <p className="text-pink-300 font-mono text-2xl md:text-3xl tracking-widest uppercase font-bold drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
                            Pippooooo!! ❤️
                        </p>
                    </div>
                </motion.div>
            )}

            {isComplete && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-40"
                >
                    <button 
                        onClick={() => navigate('/message-reveal')}
                        className="px-6 py-2 md:px-8 md:py-3 bg-pink-600/80 hover:bg-pink-500 backdrop-blur-sm text-white font-mono font-bold rounded-full border border-pink-400/30 shadow-[0_0_20px_rgba(255,105,180,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        Next ➔
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-full flex items-center justify-center p-4 relative z-10"
        >
            <canvas 
                ref={canvasRef} 
                className="rounded-3xl shadow-[0_0_80px_rgba(255,105,180,0.2)] border border-white/10"
                style={{ width: '100%', maxWidth: '800px', aspectRatio: '1/1' }}
            />
        </motion.div>
    </div>
  );
}
