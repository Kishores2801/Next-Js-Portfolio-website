"use client";
import { motion } from "framer-motion";
import Skill from "./Skill";

type Props = {}

export default function Skills({}: Props) {
  return (
    <motion.div 
      className="flex relative h-screen flex-col text-center md:text-left xl:flex-row max-w-7xl xl:px-10 min-h-screen 
                 justify-center xl:space-y-0 mx-auto items-center mb-10 px-4 sm:px-6 md:px-8"
    >
      <h3 
        className="absolute top-8 sm:top-10 md:top-12 uppercase tracking-[10px] sm:tracking-[12px] md:tracking-[15px] 
                   text-blue-500 text-base sm:text-lg md:text-xl"
      >
        Skills
      </h3> 
      
      <h3 
        className="absolute top-16 sm:top-18 md:top-24 uppercase tracking-[1px] sm:tracking-[2px] text-gray-200 text-[8px] 
                   sm:text-xs md:text-sm lg:text-base whitespace-nowrap"
      >
        Hover over a skill for current proficiency
      </h3>

      {/* Responsive grid setup */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-3 md:gap-4 lg:gap-6 mt-8 sm:mt-9 md:mt-16 lg:mt-20 px-4 sm:px-10">
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
      </div>
    </motion.div>
  );
}
