"use client";
import React from 'react';
import { motion } from "framer-motion";
import Sawtooth from '@/public/sawtooth.jpeg';

type Props = {
  directionLeft?: boolean;
  percentage?: number; // Percentage for the progress circle
};

export default function Skill({ directionLeft, percentage = 75 }: Props) {
  return (
    <div className='group relative flex cursor-pointer justify-center items-center p-1 sm:p-2 md:p-3'>
      {/* Skill image with animation */}
      <motion.img
        initial={{ x: directionLeft ? -150 : 150, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-full border border-gray-500 object-cover 
          w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 filter 
          group-hover:grayscale transition duration-300 ease-in-out"
        src={Sawtooth.src}
        alt="Skill Icon"
      />

      {/* Circular progress indicator */}
      <svg
        className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
          transform -rotate-90 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300"
        viewBox="0 0 36 36"
      >
        <circle
          className="text-gray-300"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          cx="18"
          cy="18"
          r="15.5"
        />
        <circle
          className="text-blue-500"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${percentage}, 100`}
          strokeLinecap="round"
          fill="none"
          cx="18"
          cy="18"
          r="15.5"
        />
      </svg>

      {/* Percentage label */}
      <div className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <p className='text-sm sm:text-lg md:text-xl font-bold text-black'>
          {percentage}%
        </p>
      </div>
    </div>
  );
}
