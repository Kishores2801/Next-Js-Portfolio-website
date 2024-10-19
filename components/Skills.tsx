"use client";
import { motion } from "framer-motion";
import Skill from "./Skill";

type Props = {};

export default function Skills({}: Props) {
  return (
    <motion.div
      className="flex relative h-screen flex-col text-center md:text-left xl:flex-row max-w-7xl xl:px-10 min-h-screen 
                 justify-center xl:space-y-0 mx-auto items-center mb-10 px-4 sm:px-6 md:px-8"
    >
      <h3
        className="absolute top-10 sm:top-12 md:top-20 uppercase tracking-[8px] sm:tracking-[12px] md:tracking-[15px] 
                   text-blue-500 text-lg sm:text-xl md:text-2xl mb-40"
      >
        Skills
      </h3>

      {/* Responsive grid setup */}
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 
                    mt-44 sm:mt-16 md:mt-20 px-4 sm:px-10"
      >
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
