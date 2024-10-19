"use client";
import Image from 'next/image';
import Stax from '@/public/Stax.jpeg';
import Sawtooth from '@/public/sawtooth.jpeg';
import { motion } from "framer-motion";

type Props = {}

export default function ExperienceCard({}: Props) {
  return (
    <article className='flex flex-col rounded-xl items-center space-y-3 flex-shrink-0 
      w-[90%] sm:w-[80%] md:w-[330px] xl:w-[420px] snap-center  
      bg-gray-50 p-3 sm:p-4 md:p-5 hover:opacity-100 opacity-90 
      cursor-pointer transition-opacity duration-200 overflow-hidden shadow-md mx-auto'>
      
      {/* Image */}
      <motion.img 
        src={Stax.src} 
        alt="Stax Logo" 
        className='rounded-full object-cover object-center'
        width={60} 
        height={60} 
      />

      {/* Text Content */}
      <div className='px-2 sm:px-3 md:px-4 '>
        <h1 className='text-sm sm:text-base md:text-lg font-medium 
          text-center md:text-left text-gray-800'>
          Senior Data Analyst at STAX LLC
        </h1>
        <p className='font-semibold text-xs mt-1 text-center 
          md:text-left text-gray-600'>
          STAX LLC
        </p>

        {/* Skill Icons */}
        <div className='flex justify-center md:justify-start space-x-1.5 my-2'>
          <img className='h-4 w-4 md:h-5 md:w-5 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
          <img className='h-4 w-4 md:h-5 md:w-5 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
          <img className='h-4 w-4 md:h-5 md:w-5 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
          <img className='h-4 w-4 md:h-5 md:w-5 rounded-full' src={Sawtooth.src} alt="Skill Icon" />
        </div>

        <p className='uppercase py-1 text-xs sm:text-sm text-gray-500 text-center md:text-left'>
          Started work... - ended...
        </p>

        {/* Summary Points */}
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
