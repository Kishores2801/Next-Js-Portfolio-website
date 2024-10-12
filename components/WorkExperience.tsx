"use client";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

type Props = {}

function WorkExperience({}: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='h-screen flex relative flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center'
    >
      {/* Heading */}
      <h3 className="absolute top-24 uppercase tracking-[15px] text-blue-500 text-lg sm:text-xl md:text-2xl">
        Experience
      </h3>

      {/* Experience Card Container */}
      <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory'>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </motion.div>
  )
}

export default WorkExperience;
