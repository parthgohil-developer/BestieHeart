import React from 'react';
import ActionCard from '../components/home/ActionCard';
import prosImg from '../assets/Pros and cons.jpg';
import qnaImg from '../assets/Q&A.jpg';

export default function FormDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans items-center pt-24">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-pink-50 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-serif font-bold tracking-widest text-[#ffb6c1] mb-6">
          FORM DASHBOARD
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10 text-center">
          You have successfully unlocked the Forms area. 
          Different form elements will appear here!
        </p>
        
        <div className="w-full h-px bg-[#ffb6c1]/30"></div>
        
        {/* Form Selection Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <ActionCard 
            title="Pros & Cons Form" 
            route="/form-1" 
            imageSrc={prosImg} 
            imgConfig="object-center"
          />
          <ActionCard 
            title="Deep Q&A Form" 
            route="/form-2" 
            imageSrc={qnaImg} 
            imgConfig="object-center"
          />
        </div>
      </div>
    </div>
  );
}
