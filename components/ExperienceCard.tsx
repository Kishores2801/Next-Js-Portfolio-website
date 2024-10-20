"use client";
import Image from 'next/image';
import Stax from '@/public/Stax.jpeg';
import Sawtooth from '@/public/sawtooth.jpeg';
import { motion } from "framer-motion";

type Props = {};

export default function ExperienceCard({}: Props) {
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-2 flex-shrink-0 
        w-[85%] sm:w-[70%] md:w-[280px] xl:w-[350px] snap-center 
        bg-gray-50 p-2 sm:p-3 md:p-4 hover:opacity-100 opacity-90 
        cursor-pointer transition-opacity duration-200 overflow-hidden 
        shadow-sm mx-auto"
    >
      {/* Image */}
      <motion.img
        src={Stax.src}
        alt="Stax Logo"
        className="rounded-full object-cover object-center"
        width={50}
        height={50}
      />

      {/* Text Content */}
      <div className="px-1 sm:px-2 md:px-3">
        <h1
          className="text-xs sm:text-sm md:text-base font-medium 
          text-center md:text-left text-gray-800"
        >
          Senior Data Analyst at STAX LLC
        </h1>
        <p
          className="font-semibold text-[10px] mt-1 text-center 
          md:text-left text-gray-600"
        >
          STAX LLC
        </p>

        {/* Skill Icons */}
        <div className="flex justify-center md:justify-start space-x-1 my-1.5">
          <img
            className="h-3 w-3 md:h-4 md:w-4 rounded-full"
            src={Sawtooth.src}
            alt="Skill Icon"
          />
          <img
            className="h-3 w-3 md:h-4 md:w-4 rounded-full"
            src={Sawtooth.src}
            alt="Skill Icon"
          />
          <img
            className="h-3 w-3 md:h-4 md:w-4 rounded-full"
            src={Sawtooth.src}
            alt="Skill Icon"
          />
          <img
            className="h-3 w-3 md:h-4 md:w-4 rounded-full"
            src={Sawtooth.src}
            alt="Skill Icon"
          />
        </div>

        <p className="uppercase py-1 text-[10px] sm:text-xs text-gray-500 text-center md:text-left">
          Started work... - ended...
        </p>

        {/* Summary Points */}
        <ul className="list-disc space-y-1 ml-3 text-[10px] sm:text-xs text-gray-800">
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
