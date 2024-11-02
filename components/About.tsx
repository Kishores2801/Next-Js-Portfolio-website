"use client";
import { motion } from "framer-motion";
import ProfileImg from '@/public/Kishore.png';
import Image from "next/image";
import Link from "next/link";


type Props = {}

function About({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative min-h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden"
    >
      {/* Main Content */}
      <div className="relative z-10 p-10 md:p-20 flex flex-col items-center justify-center space-y-8">
        {/* Heading */}
        <h3 className="absolute top-10 uppercase tracking-[10px] text-blue-500 text-lg sm:text-xl md:text-2xl">
          About Me
        </h3>

        {/* Profile Image with Animation */}
        <motion.img
          src={ProfileImg.src} // Access the 'src' of imported image directly
          alt="Kishore's Profile Picture"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-20 md:mb-0 flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover md:rounded-lg md:w-64 md:h-96 xl:w-[300px] xl:h-[400px]"
        />

        {/* About Section */}
        <div className="space-y-4 p-0 md:px-10 text-gray-800 dark:text-gray-300">
          <p className="text-sm sm:text-base md:text-lg">
            👋 Hi, I'm a <strong>Senior Data Analyst</strong> with over three years of experience, skilled in transforming 
            complex survey data into actionable insights. Proficient in <strong>Power BI, SQL, Python</strong>, and 
             <strong> Data Visualization</strong>, I focus on empowering decision-makers with data-driven strategies. 
            🎓 With a background in <strong>Business Analytics</strong> and experience at <strong>Stax LLC</strong>,
            I’m passionate about simplifying data to tell impactful stories. 🚀 As an aspiring <strong>Data Scientist</strong>, 
            I’m eager to explore advanced analytics and machine learning to drive better outcomes.
            🤖 Let's collaborate on your next data-driven project!
          </p>

        </div>
       
      </div>

     
    </motion.div>
    
  );
}

export default About;
