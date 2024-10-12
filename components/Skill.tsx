"use client";
import React from 'react';
import { motion } from "framer-motion";
import Sawtooth from '@/public/sawtooth.jpeg';

type Props = {
  directionLeft?: boolean;
  percentage?: number; // Add a percentage prop to control the progress circle
};

export default function Skill({ directionLeft, percentage = 75 }: Props) {
  return (
    <div className='group relative flex cursor-pointer justify-center items-center p-1.5 sm:p-2.5'>
      {/* Skill image with animation */}
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-full border border-gray-500 object-cover w-20 h-20 sm:w-26 sm:h-26 xl:w-32 xl:h-32 filter group-hover:grayscale transition duration-300 ease-in-out"
        src={Sawtooth.src}
        alt="Skill Icon"
      />

      {/* Circular progress indicator, visible on hover */}
      <svg className="absolute w-20 h-20 sm:w-26 sm:h-26 xl:w-32 xl:h-32 transform -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 36 36">
        <circle
          className="text-gray-300"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          cx="18"
          cy="18"
          r="15.5" /* Same size across breakpoints */
        />
        <circle
          className="text-blue-500"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${percentage}, 100`} // Dynamic percentage for progress
          strokeLinecap="round"
          fill="none"
          cx="18"
          cy="18"
          r="15.5" /* Same size as the outer circle */
        />
      </svg>

      {/* Percentage label, visible on hover */}
      <div className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='flex items-center justify-center h-full'>
          <p className='text-lg sm:text-xl xl:text-3xl font-bold text-black-100'>{percentage}%</p>
        </div>
      </div>
    </div>
  );
}
