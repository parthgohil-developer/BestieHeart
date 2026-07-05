import React from 'react';
import ActionCard from '../components/home/ActionCard';
import { motion } from 'framer-motion';
import pippoImg from '../assets/Pippo 3.jpg';
import pippo4Img from '../assets/Pippo 2.jpg';
import parthImg from '../assets/Parth.jpeg';
import parth2Img from '../assets/parth 2.jpeg';


export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 pt-24 px-6 md:px-12 flex flex-col items-center relative overflow-hidden"
      >
        {/* Decorative Background blob */}
        <div className="absolute top-10 left-1/2 w-[800px] h-[800px] bg-pink-100/40 rounded-full blur-3xl -translate-x-1/2 pointer-events-none -z-10"></div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-[#ffb6c1] mb-10 tracking-widest text-center mt-6"
        >
          Welcome To BestieHeart!!
        </motion.h1>

        {/* Sections Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 relative z-10">

          <ActionCard
            title="Birthday Wish"
            route="/birthday"
            imageSrc={pippo4Img}
          />

          <ActionCard
            title="Personal Notes"
            route="/personal"
            imageSrc={pippoImg}
          />

          <ActionCard
            title="Special Forms"
            route="/form"
            imageSrc={parthImg}
            imgConfig="object-[center_30%]"
          />

          <ActionCard
            title="Book Appointment"
            route="/meeting"
            imageSrc={parth2Img}
            imgConfig="object-top"
          />

        </div>
      </motion.main>
    </div>
  );
}
