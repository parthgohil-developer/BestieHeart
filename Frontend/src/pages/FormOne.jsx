import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function FormOne() {
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pros.trim() || !cons.trim()) {
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3500);
      return;
    }
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/form/pros-cons`, { pros, cons });
        setShowPopup(true);
        setTimeout(() => window.location.reload(), 3200);
    } catch (err) {
        console.error(err);
        alert('Failed to send data to backend. Is it running?');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 font-sans px-6 pb-20 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl border border-pink-50 p-8 md:p-12 flex flex-col items-center relative"
      >
        {/* Decorative Background blob */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif font-bold text-[#ffb6c1] mb-4 text-center leading-tight relative z-10"
        >
          Write A Pros and Cons For The Birthday Boy <br/> <span className="text-gray-800">Mr. Parth Gohil</span>
        </motion.h1 >
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mb-10 w-full text-center relative z-10 font-medium tracking-wide"
        >
          Let's be honest today! What are his best traits and his funniest flaws?
        </motion.p>
        
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            className="flex flex-col"
          >
            <label className="text-xl font-serif font-bold text-green-400 mb-3 ml-2 tracking-widest">PROS</label>
            <textarea
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              placeholder="What makes him awesome?"
              className="w-full h-48 px-5 py-4 rounded-2xl text-gray-800 bg-white border-2 border-green-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-300 transition-all shadow-sm resize-none"
              required
            ></textarea>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            className="flex flex-col"
          >
            <label className="text-xl font-serif font-bold text-red-400 mb-3 ml-2 tracking-widest">CONS</label>
            <textarea
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              placeholder="What are his quirky flaws?"
              className="w-full h-48 px-5 py-4 rounded-2xl text-gray-800 bg-white border-2 border-red-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-300 transition-all shadow-sm resize-none"
              required
            ></textarea>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="md:col-span-2 flex justify-center mt-6"
          >
            <motion.button
              whileHover={isSubmitting ? {} : { scale: 1.05 }}
              whileTap={isSubmitting ? {} : { scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`px-14 py-4 rounded-full text-lg font-bold text-white shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-pink-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-300 to-rose-400 hover:from-pink-400 hover:to-rose-500'}`}
            >
              {isSubmitting ? 'Sending...' : 'Submit Honestly!'}
            </motion.button>
          </motion.div>
        
        </form>

        <AnimatePresence>
          {showPopup && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.7, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-pink-100 max-w-sm mx-4 text-center relative overflow-hidden"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mb-5 shadow-inner">
                  ✨
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">Delivered!</h2>
                <p className="text-gray-500 text-lg mb-8">Your honest feedback has been secretly sent to Cartoon. 💌</p>
                
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 3, ease: "linear" }}
                     className="h-full bg-gradient-to-r from-pink-300 to-rose-400"
                   />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showErrorPopup && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.7, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-red-100 max-w-sm mx-4 text-center relative overflow-hidden"
              >
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mb-5 shadow-inner">
                  ⚠️
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">Wait!</h2>
                <p className="text-gray-500 text-lg mb-8">Please be honest and fill out both the Pros and Cons fields first! 🥺</p>
                <button 
                  onClick={() => setShowErrorPopup(false)}
                  className="px-8 py-3 rounded-full text-white bg-red-400 hover:bg-red-500 transition-all font-bold"
                >
                  Okay
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
