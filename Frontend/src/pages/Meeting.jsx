import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import parthImg from '../assets/parth 2.jpeg';

export default function Meeting() {
  const [wantToMeet, setWantToMeet] = useState('');
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState(null);
  const [purpose, setPurpose] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSadPopup, setShowSadPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!wantToMeet || (wantToMeet === 'Yes' && (!meetingDate || !meetingTime || !purpose.trim()))) {
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3500);
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/form/meeting', {
        wantToMeet,
        meetingDate: meetingDate ? meetingDate.toLocaleDateString() : 'N/A',
        meetingTime: meetingTime ? meetingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
        purpose: wantToMeet === 'Yes' ? purpose : 'Decided not to meet.'
      });

      if (wantToMeet === 'No') {
        setShowSadPopup(true);
        setTimeout(() => window.location.reload(), 4500);
      } else {
        setShowPopup(true);
        setTimeout(() => window.location.reload(), 3500);
      }
    } catch (error) {
      console.error(error);
      alert('Uh oh! Failed to reach the server.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 font-sans px-4 pb-20 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-[2.5rem] border border-pink-50 flex flex-col overflow-hidden relative"
      >
        {/* Banner Image */}
        <div className="w-full h-64 md:h-80 relative overflow-hidden bg-pink-100 flex items-center justify-center">
          <img src={parthImg} alt="Parth" className="w-full h-full object-cover object-top filter brightness-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div className="p-8 md:p-12 relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#ffb6c1] mb-2 text-center tracking-wide">
            Book An Appointment
          </h1>
          <p className="text-gray-500 mb-10 text-center max-w-lg">
            Want to meet the birthday boy in person? Schedule a time below!
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">

            {/* Radio Group */}
            <div className="flex flex-col items-center">
              <label className="text-xl font-bold text-gray-700 mb-4 whitespace-nowrap">Wanted To Meet?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="meet"
                    value="Yes"
                    className="w-5 h-5 accent-pink-400 group-hover:scale-110 transition-transform"
                    onChange={(e) => setWantToMeet(e.target.value)}
                  />
                  <span className="text-lg font-medium text-gray-600 group-hover:text-pink-500 transition-colors">Yes, definitely!</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="meet"
                    value="No"
                    className="w-5 h-5 accent-gray-400 group-hover:scale-110 transition-transform"
                    onChange={(e) => {
                      setWantToMeet(e.target.value);
                      setMeetingDate(null);
                      setMeetingTime(null);
                      setPurpose('');
                    }}
                  />
                  <span className="text-lg font-medium text-gray-600 group-hover:text-gray-800 transition-colors">No thanks</span>
                </label>
              </div>
            </div>

            {/* Conditional Form Fields */}
            <AnimatePresence>
              {wantToMeet === 'Yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-6 w-full"
                >
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-pink-400 mb-2 tracking-widest uppercase ml-1">Date of Meeting</label>
                    <DatePicker
                      selected={meetingDate}
                      onChange={(date) => setMeetingDate(date)}
                      placeholderText="Select a magical date..."
                      className="w-full px-5 py-4 rounded-2xl text-gray-800 bg-gray-50 border-2 border-pink-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all shadow-sm"
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-pink-400 mb-2 tracking-widest uppercase ml-1">Time of Meeting</label>
                    <DatePicker
                      selected={meetingTime}
                      onChange={(time) => setMeetingTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Pick a time..."
                      className="w-full px-5 py-4 rounded-2xl text-gray-800 bg-gray-50 border-2 border-pink-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-pink-400 mb-2 tracking-widest uppercase ml-1">Purpose of Meeting</label>
                    <textarea
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="Why do you want to meet? Planning a surprise?"
                      className="w-full h-32 px-5 py-4 rounded-2xl text-gray-800 bg-gray-50 border-2 border-pink-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all shadow-sm resize-none"
                    ></textarea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={isSubmitting || showPopup || showSadPopup ? {} : { scale: 1.05 }}
                whileTap={isSubmitting || showPopup || showSadPopup ? {} : { scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting || showPopup || showSadPopup || !wantToMeet}
                className={`px-10 py-4 rounded-full font-bold text-white shadow-xl transition-all ${isSubmitting || showPopup || showSadPopup || !wantToMeet ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500'}`}
              >
                {isSubmitting || showPopup || showSadPopup ? 'Booking...' : 'Send Request 🗓️'}
              </motion.button>
            </div>

          </form>
        </div>

        {/* Error Modal */}
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
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-red-100 max-w-sm mx-4 text-center"
              >
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mb-5 shadow-inner">
                  ⚠️
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">Hold on!</h2>
                <p className="text-gray-500 text-lg mb-8">Please fill out all the visible fields to request a meeting! 🥺</p>
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

        {/* Success Modal */}
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
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-pink-100 max-w-sm mx-4 text-center overflow-hidden relative"
              >
                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-4xl mb-5 shadow-inner">
                  📅
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">Booked!</h2>
                <p className="text-gray-500 text-lg mb-8">Your meeting request was dispatched to him securely! 💛</p>

                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-400"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hilarious Sad Modal for Rejections */}
        <AnimatePresence>
          {showSadPopup && (
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
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-gray-200 max-w-sm mx-4 text-center overflow-hidden relative"
              >
                <div className="w-20 h-20 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-4xl mb-5 shadow-inner">
                  🥺
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4 leading-tight">
                  Why are you not meeting?
                </h2>
                <p className="text-gray-600 text-lg mb-8 font-semibold">
                  ITNA BURA HU KYA MAIN 😭 <br /><br />
                  <span className="text-pink-500">Millo yrr USKA BIRTHDAY HAI! from BestieHeart</span>
                </p>

                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-gray-400 to-gray-500"
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
