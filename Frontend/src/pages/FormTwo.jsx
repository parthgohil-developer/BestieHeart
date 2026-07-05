import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const qnaSections = [
  {
    icon: "😂",
    title: "Fun Questions",
    questions: [
      "If you had to describe me using only 3 emojis, which ones would you choose?",
      "What's the funniest memory you have with me?",
      "What's the weirdest thing I do that you've never told me?",
      "If I were a movie character, who would I be?",
      "If you had to roast me on my birthday, what would you say?",
      "What's one habit of mine that annoys you the most?",
      "If you could change one thing about me, what would it be?"
    ]
  },
  {
    icon: "❤️",
    title: "Emotional Questions",
    questions: [
      "What was your first impression of me, and how has it changed?",
      "What's one moment with me you'll never forget?",
      "What's something you've always wanted to tell me but never did?",
      "Have I ever helped you in a way I probably don't even know?",
      "What's one quality of mine you genuinely admire?",
      "If one day we stopped talking, what would you miss the most?",
      "What's one thing you hope never changes between us?"
    ]
  },
  {
    icon: "🎭",
    title: "Drama Questions",
    questions: [
      "Have you ever been angry with me but acted like everything was okay?",
      "Have you ever cried because of something I did or said?",
      "Have you ever been jealous because of me?",
      "What's the biggest misunderstanding we've ever had?",
      "Have you ever hidden something from me to protect me?",
      "If someone asked you to stop talking to me, what would you do?"
    ]
  },
  {
    icon: "😏",
    title: "Deep Questions",
    questions: [
      "What's your favorite thing about our friendship?",
      "If we had met earlier in life, do you think we'd still be this close?",
      "Have you ever felt I was ignoring you?",
      "If I moved to another country tomorrow, what would you do?",
      "What's one thing you wish I understood about you?"
    ]
  },
  {
    icon: "🌟",
    title: `"If I Were..."`,
    questions: [
      "If I were a flower, which one would I be?",
      "If I were a movie, what genre or which movie would I be?",
      "If I were an animal, which one would I be?",
      "If I were an actor, who would I be?",
      "If I were a place, where would I be?",
      "If I were a food, what dish would I be?",
      "If I were a song, which track would I be?",
      "If I were a cartoon character, who would I be?"
    ]
  },
  {
    icon: "🤣",
    title: "Birthday Specials",
    questions: [
      "Be honest—did you remember my birthday on your own or did Instagram remind you?",
      "What's the best birthday gift you could give me that isn't money?",
      "Rate me as a best friend from 1 to 10, and explain the missing points.",
      "What's one birthday wish you'd make for me?",
      "If you had to write one sentence about me that I'd remember forever, what would it be?"
    ]
  },
  {
    icon: "💛",
    title: "Heart-Touching Finale",
    questions: [
      "If years pass and life gets busy, do you think we'll still be friends?",
      "What's one promise you want us to keep as friends?",
      "What role do you think I play in your life?",
      "If you could relive one memory with me, which one would it be?",
      "On my birthday, what's the one thing you genuinely want me to know?"
    ]
  }
];

export default function FormTwo() {
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleInputChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${activeTab}-${questionIndex}`]: value
    }));
  };

  const currentSection = qnaSections[activeTab];

  const handleNext = () => {
    if (activeTab < qnaSections.length - 1) setActiveTab(prev => prev + 1);
  };

  const handleBack = () => {
    if (activeTab > 0) setActiveTab(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate EVERY question is answered
    for (let secIdx = 0; secIdx < qnaSections.length; secIdx++) {
      for (let qIdx = 0; qIdx < qnaSections[secIdx].questions.length; qIdx++) {
         const key = `${secIdx}-${qIdx}`;
         if (!answers[key] || !answers[key].trim()) {
             // Jump back to the section with the missing answer so they instantly see it
             setActiveTab(secIdx);
             setShowErrorPopup(true);
             setTimeout(() => setShowErrorPopup(false), 4000);
             return;
         }
      }
    }

    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/form/deep-qa`, { answers });
      setShowPopup(true);
      setTimeout(() => window.location.reload(), 3200);
    } catch (error) {
       console.error(error);
       alert('Uh oh! Failed to reach the server.');
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 font-sans px-4 pb-20 overflow-x-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-[2.5rem] border border-pink-50 p-6 md:p-10 flex flex-col items-center relative"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-serif font-bold text-[#ffb6c1] mb-2 text-center"
        >
          THE DEEP Q&A
        </motion.h1>
        <p className="text-gray-500 mb-8 text-center max-w-lg">
          Take your time and answer honestly. We'll go through 7 sections together.
        </p>

        {/* Status / Tabs Indicator */}
        <div className="w-full flex justify-between items-center mb-10 overflow-x-auto pb-4 custom-scrollbar gap-2 px-2">
          {qnaSections.map((sec, i) => (
            <motion.button 
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-3 sm:w-20 rounded-2xl transition-all duration-300 ${
                activeTab === i 
                  ? 'bg-pink-100 text-pink-600 shadow-md transform scale-110' 
                  : 'bg-gray-50 text-gray-400 hover:bg-pink-50'
              }`}
            >
              <span className="text-2xl mb-1">{sec.icon}</span>
            </motion.button>
          ))}
        </div>

        {/* Interactive Form Content wrapper */}
        <div className="w-full relative min-h-[300px]">
          <motion.div 
            key={activeTab} // Using key smoothly forces Framer Motion to re-animate when the tab changes
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="w-full flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-pink-100 pb-4">
              <span className="text-4xl">{currentSection.icon}</span>
              <h2 className="text-2xl font-serif font-bold text-gray-800">{currentSection.title}</h2>
            </div>

            {currentSection.questions.map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col group">
                <label className="text-lg font-medium text-gray-700 mb-2 group-hover:text-pink-400 transition-colors">
                  {q}
                </label>
                <textarea
                  value={answers[`${activeTab}-${qIndex}`] || ''}
                  onChange={(e) => handleInputChange(qIndex, e.target.value)}
                  placeholder="Type your pure honesty here..."
                  className="w-full min-h-[100px] px-5 py-3 rounded-2xl text-gray-800 bg-gray-50 border-2 border-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all shadow-sm resize-y"
                ></textarea>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wizard Navigation */}
        <div className="w-full flex justify-between mt-12 pt-6 border-t border-gray-100">
          <button 
            onClick={handleBack}
            disabled={activeTab === 0}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeTab === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
            }`}
          >
            Back
          </button>
          
          {activeTab < qnaSections.length - 1 ? (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="px-8 py-3 rounded-full font-bold text-white shadow-lg bg-gradient-to-r from-pink-300 to-rose-400 hover:from-pink-400 hover:to-rose-500 transition-all"
            >
              Next Section
            </motion.button>
          ) : (
            <motion.button 
              whileHover={isSubmitting || showPopup ? {} : { scale: 1.05 }}
              whileTap={isSubmitting || showPopup ? {} : { scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isSubmitting || showPopup}
              className={`px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all ${isSubmitting || showPopup ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600'}`}
            >
              {isSubmitting || showPopup ? 'Transmitting... 💛' : 'Finish & Submit 💛'}
            </motion.button>
          )}
        </div>

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
                  🎉
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">All Done!</h2>
                <p className="text-gray-500 text-lg mb-8">Thank you for answering so honestly! Your massive payload was sent securely. 💛</p>
                
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 3, ease: "linear" }}
                     className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
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
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">Incomplete</h2>
                <p className="text-gray-500 text-lg mb-8">You missed a question! Please answer all questions before submitting. I brought you back to the empty one! 😉</p>
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
