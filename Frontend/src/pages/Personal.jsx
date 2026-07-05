import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function Personal() {
  const [personalReply, setPersonalReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const paragraphs = [
    `This website is a small gift that I created especially for you, with lots of love, care, and countless memories. My only wish was to make your birthday a little more special and to give you something that would always remind you of our friendship.`,
    
    `Unfortunately, we couldn't meet on your birthday. So, I decided to give you this gift on my birthday instead. Sometimes, the value of a gift isn't determined by the day it is given, but by the feelings and memories it carries.`,
    
    `I hope you'll accept this little surprise with the same smile that inspired me to create it.`,
    
    `And I have just one small request...`,
    
    `Please take a few moments for the friend you lovingly call "Cartoon." On my special day, it would mean a lot to me if you could open and complete the Special Forms created. Those forms are more than just questions—they're a collection of memories, emotions, and moments that I wanted to share with my best friend.`,
    
    `Thank you for being a beautiful part of my life. No matter how much time passes, our friendship will always remain one of the most precious chapters of my story.`
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personalReply.trim()) return;
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:5000/api/form/personal-reply', { message: personalReply });
      setShowPopup(true);
      setTimeout(() => window.location.reload(), 3200);
    } catch (error) {
       console.error(error);
       alert('Oops, failed to send the message.');
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/30 flex flex-col items-center pt-32 pb-24 font-sans px-4 sm:px-8 relative overflow-x-hidden">
        {/* Soft Background decorations */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl flex flex-col items-center relative z-10"
        >
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-serif font-bold text-rose-500 mb-14 text-center drop-shadow-sm tracking-wide"
            >
                A Special Note For You ❤️
            </motion.h1>

            <div className="w-full flex flex-col gap-8 mb-20">
                {paragraphs.map((text, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
                        className="p-6 md:p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-[6px] border-rose-300 text-gray-700 text-lg md:text-xl font-serif leading-relaxed text-justify"
                    >
                        {text}
                    </motion.div>
                ))}
            </div>

            {/* Optional Reply Section */}
            <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border border-pink-100 flex flex-col"
            >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">💌</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-rose-400">Leave a message for Cartoon?</h2>
                </div>
                <p className="text-gray-400 mb-8 font-sans italic ml-14">(This is completely optional! Feel free to vent or reply.)</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <textarea 
                        value={personalReply}
                        onChange={(e) => setPersonalReply(e.target.value)}
                        placeholder="Type anything you want to say..."
                        className="w-full min-h-[160px] px-6 py-5 rounded-3xl text-gray-800 bg-gray-50 border-2 border-pink-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-300 transition-all font-sans text-lg resize-y shadow-inner"
                    ></textarea>
                    
                    <motion.button 
                        whileHover={isSubmitting ? {} : { scale: 1.03 }}
                        whileTap={isSubmitting ? {} : { scale: 0.97 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`self-end px-10 py-4 rounded-full font-bold text-white shadow-xl transition-all text-lg tracking-wide ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600'}`}
                    >
                        {isSubmitting ? 'Sending... 💌' : 'Send to Cartoon ❤️'}
                    </motion.button>
                </form>
            </motion.div>

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
                    <div className="w-20 h-20 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center text-4xl mb-5 shadow-inner">
                      ❤️
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">Sent!</h2>
                    <p className="text-gray-500 text-lg mb-8">Your heartfelt message has been passed directly to Cartoon! 💌</p>
                    
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: "0%" }}
                         animate={{ width: "100%" }}
                         transition={{ duration: 3, ease: "linear" }}
                         className="h-full bg-gradient-to-r from-rose-300 to-pink-400"
                       />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

        </motion.div>
    </div>
  );
}
