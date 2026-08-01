import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MessageForm() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) return;
        setIsSubmitting(true);
        
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}/api/form/personal-reply`, { 
                message,
                customTitle: 'Message for Cartoon on friendship day' 
            });
            
            setShowPopup(true);
            
            setTimeout(() => {
                setShowPopup(false);
                navigate('/home'); 
            }, 3000); // Will show success popup, then navigate home automatically
            
        } catch (error) {
            console.error("Failed to send message", error);
            alert("Failed to send! Is the backend running?");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#a88bee] flex flex-col items-center justify-center p-6 relative select-none font-sans overflow-hidden">

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="bg-[#f1efe6] w-full max-w-[340px] rounded-2xl border-[3.5px] border-[#29262b] shadow-[6px_8px_0px_#29262b] p-6 relative z-10 flex flex-col"
            >
                {/* Decorative Tape */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-[#fde047] rotate-[-2deg] opacity-95 shadow-[1px_2px_0px_rgba(0,0,0,0.1)] z-20"></div>
                
                <h1 className="text-center font-black text-[18px] text-[#29262b] leading-[1.3] mt-5 mb-5 tracking-wide px-2">
                    Want to Tell anything To Your Sweet Little Cartoonn!!
                </h1>

                <div className="relative">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={1500}
                        placeholder="Write your sweet message here..."
                        className="w-full h-44 bg-white border-[3px] border-[#29262b] rounded-xl p-3 resize-none outline-none font-medium text-[14px] text-gray-800 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.04)] focus:border-[#ff6b81] transition-colors"
                    />
                    <div className="absolute bottom-2 right-2 px-1 text-[11px] font-black text-gray-400 bg-white">
                        {message.length} / 1500
                    </div>
                </div>

                <div className="h-4"></div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !message.trim()}
                    className={`w-full py-4 rounded-xl font-black text-[15px] border-[3px] border-[#29262b] transition-all tracking-wider ${
                        isSubmitting || !message.trim() 
                            ? 'bg-gray-300 text-gray-400 shadow-[2px_3px_0px_#29262b] opacity-70 cursor-not-allowed'
                            : 'bg-[#ff6b81] text-white shadow-[4px_5px_0px_#29262b] active:translate-y-1 active:shadow-[1px_2px_0px_#29262b]'
                    }`}
                >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
            </motion.div>

            {/* Success Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]"
                    >
                        <div className="bg-white p-7 rounded-2xl border-[3.5px] border-[#29262b] shadow-[6px_8px_0px_#29262b] max-w-[280px] text-center w-full relative overflow-hidden">
                            
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="text-[40px] mb-2 leading-none">🥰</div>
                                <h2 className="text-[22px] font-black text-[#ff6b81] mb-2 leading-tight tracking-wide">
                                    Thanyou Pippo!
                                </h2>
                                <p className="text-[14px] font-bold text-gray-700">
                                    For you sweet respoce 💛
                                </p>
                            </motion.div>
                            
                            {/* Small highlight decoration */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#fde047]"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
