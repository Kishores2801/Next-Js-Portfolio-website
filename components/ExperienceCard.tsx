"use client";
import Image from 'next/image';
import Stax from '@/public/Stax.jpeg';
import Sawtooth from '@/public/sawtooth.jpeg';
import { motion } from "framer-motion";

type Props = {}

export default function ExperienceCard({}: Props) {
  return (
    <article className='flex flex-col rounded-xl items-center space-y-4 flex-shrink-0 w-[95%] sm:w-[85%] md:w-[250px] xl:w-[360px] snap-center bg-gray-100 p-3 sm:p-5 md:p-6 hover:opacity-100 opacity-90 cursor-pointer transition-opacity duration-200 overflow-hidden shadow-md mx-auto'>
      {/* Image */}
      <motion.img 
        src={Stax.src} 
        alt="Stax Logo" 
        className='rounded-full object-cover object-center'
        width={70} 
        height={70} 
      />

      <div className='px-3 sm:px-4 md:px-5'>
        <h1 className='text-base sm:text-lg md:text-xl font-light text-center md:text-left text-gray-800'>Senior Data Analyst at STAX LLC</h1>
        <p className='font-bold text-sm mt-1 text-center md:text-left text-gray-700'>STAX LLC</p>
        
        {/* Skill Icons */}
        <div className='flex justify-center md:justify-start space-x-2 my-2'>
          <img className='h-5 w-5 md:h-6 md:w-6 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
          <img className='h-5 w-5 md:h-6 md:w-6 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
          <img className='h-5 w-5 md:h-6 md:w-6 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
          <img className='h-5 w-5 md:h-6 md:w-6 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
        </div>

        <p className='uppercase py-2 text-xs sm:text-sm text-gray-500 text-center md:text-left'>Started work.... - ended ...</p>

        <ul className='list-disc space-y-1 ml-4 text-xs sm:text-sm text-gray-800'>
          <li>Summary Points</li>
          <li>Summary Points</li>
          <li>Summary Points</li>
          <li>Summary Points</li>
          <li>Summary Points</li>
        </ul>
      </div>
    </article>
  );
}
