import React from 'react';
import { motion } from 'framer-motion';

export default function Birthday() {
  const paragraphs = [
    `First of all, congratulations on successfully surviving another year of your own dramatic decisions, random mood swings, overthinking marathons, and the incredible talent you have for turning the smallest situation into a full-fledged movie. 😂 Every year you get older, but somehow your maturity keeps playing hide-and-seek. Honestly, I still don't know whether I should wish you "Happy Birthday" or "Congratulations for leveling up in age while your inner child refuses to leave." And yes, before you say anything—I know you'll pretend you're still seventeen forever. Keep dreaming, Pippoo. Age is just a number... unfortunately, yours keeps increasing. 😌`,
    
    `I also have to thank the universe for creating someone who can go from "I'm perfectly fine" to "Don't talk to me" in less than three seconds. Your phone battery dies faster than your patience, your laugh is louder than common sense, and somehow you always manage to be both the problem and the solution at the same time. It's honestly a talent. And let's not forget your legendary ability to say, "I'll be ready in five minutes," which somehow translates into thirty-five business days. If procrastination, overthinking, unnecessary drama, and being adorably annoying were Olympic sports, you'd return home with a suitcase full of gold medals.`,
    
    `But jokes aside... somewhere between all the teasing, the endless roasting, and our random conversations that somehow start with one topic and end on something completely unrelated, you quietly became one of the most important people in my life.`,

    `It's funny how friendships begin. One day someone is just another person, and before you even realize it, they're the one you instinctively want to tell every piece of good news to, the one whose opinion starts mattering, the one whose messages can instantly make a bad day feel lighter. That's exactly what happened with you. Looking back, I honestly smile thinking about how we met and how naturally everything just clicked. There was never any pressure to be someone else around you. We could be completely stupid together, laugh until our stomachs hurt over things nobody else would ever understand, and somehow create inside jokes from the most random moments that still make us laugh today.`,

    `What I admire most about you isn't something people notice immediately. It's your heart. It's the way you care so deeply, even when you pretend not to. It's your kindness that appears in quiet ways. It's your resilience when life gets difficult. It's your ability to make people feel seen, even when you're carrying your own worries. It's your smile that somehow manages to brighten a room, your laughter that spreads before anyone realizes they're smiling too, and the warmth you bring simply by being yourself.`,

    `On your birthday, I don't just wish you happiness for today—I wish you a life overflowing with moments that make your heart genuinely full. I hope your dreams stop feeling distant and start becoming reality one by one. I hope you find people who love you the way you deserve to be loved, opportunities that recognize your worth, peace that stays even on difficult days, and success that makes every struggle worthwhile. I hope you never lose your curiosity, your kindness, your crazy sense of humor, or the beautiful light that makes you uniquely you.`,

    `Please never change the parts of yourself that make you special. Stay weird. Stay loud. Stay wonderfully chaotic. Stay compassionate. Stay ambitious. Stay the girl who somehow manages to make ordinary days unforgettable. The world already has enough copies; it only has one Pippoo.`,

    `Happy Birthday once again, Mittal—my forever Pippoo. Thank you for being one of the brightest chapters of my life. I may not say it every day, but I hope you always remember this: some people make life easier, some make it happier.`
  ];

  return (
    <div className="min-h-screen bg-pink-50/50 flex flex-col items-center pt-32 pb-24 font-sans px-4 sm:px-8 relative overflow-x-hidden">
        {/* Cinematic Background decorations */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-pink-200/40 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/50 rounded-full blur-[100px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
          className="w-full max-w-4xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-[3rem] border border-white p-8 sm:p-14 relative z-10"
        >
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 mb-14 text-center tracking-wide drop-shadow-sm"
            >
                Happy Birthday, Pippoo! 🎉❤️
            </motion.h1>

            <div className="flex flex-col gap-8 text-gray-700 text-lg md:text-xl font-serif leading-relaxed text-justify">
                {paragraphs.map((p, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                        className="p-6 bg-white/60 hover:bg-white/90 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-pink-300"
                    >
                        {p}
                    </motion.p>
                ))}
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4, duration: 1, type: "spring" }}
               className="mt-16 text-center text-rose-400 font-serif font-bold text-2xl italic border-t border-pink-100 pt-8"
            >
                ~ Forever, Your Best Friend
            </motion.div>
        </motion.div>
    </div>
  );
}
