import React from 'react';
import ActionCard from '../components/home/ActionCard';
import { motion } from 'framer-motion';
import pippoImg from '../assets/Pippo 3.jpg';
import pippo4Img from '../assets/pippo 2.jpg';
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

        <div className="flex justify-center flex-wrap gap-x-3 gap-y-2 mb-10 mt-6 px-4">
          {"Welcome To BestieHeart!!".split(" ").map((word, wIdx) => (
            <div key={wIdx} className="flex">
              {word.split("").map((char, cIdx) => {
                const globalIndex = wIdx * 10 + cIdx;
                return (
                  <span
                    key={cIdx}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#ffb6c1] inline-block animate-bounce hover:text-pink-400 transition-colors drop-shadow-sm cursor-default"
                    style={{ animationDelay: `${globalIndex * 0.1}s` }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

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
