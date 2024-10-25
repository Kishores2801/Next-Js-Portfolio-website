"use client";
import BackgroundCircles from "./ui/BackgroundCircles";
import { Spotlight } from "./ui/Spotlight";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Image from "next/image";
import ProfileImg from '@/public/Kishore.png';

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "Hi, I'm Kishore Shanmugam",
      "Data Analyst exploring the path to Data Science",
      "Guy Who Loves to Analyze and Solve Problems",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="pb-10 pt-10 md:pb-20 md:pt-16 relative">
      {/* Spotlight Effect */}
      <div className="hidden md:block"> {/* Hide spotlights on smaller screens */}
        <Spotlight className="top-40 left-10 md:left-32 md:top-20 h-screen" fill="white" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-20 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Main Content Container */}
      <div className="h-auto md:h-screen w-full flex items-center justify-center flex-col relative">
        {/* Radial Gradient for Faded Look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Background Circles with Higher Z-index */}
        <div className="absolute z-10">
          <BackgroundCircles />
        </div>

        {/* Profile Image with Higher Z-index */}
        <div className="absolute z-20">
          <Image
            src={ProfileImg}
            alt="Profile image"
            className="relative rounded-full h-32 w-32 sm:h-36 sm:w-36 md:h-48 md:w-48 mx-auto object-cover"
          />
        </div>

        {/* Hero Section (Text) */}
        <div className="flex flex-col items-center relative z-0 mt-32 md:mt-48 justify-center overflow-hidden">
          <div className="max-w-[90vw] text-center px-4">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-gray-300 shadow-lg mt-20 md:mt-40">
              <h2 className="text-xs sm:text-sm uppercase text-gray-600 pb-2 tracking-[6px] sm:tracking-[10px] md:tracking-[15px]">
                An Aspiring Data Scientist
              </h2>
              <h1 className="mb-3 sm:mb-5 text-lg sm:text-xl md:text-2xl">
                <span>{text}</span>
                <Cursor cursorColor="#7CB9E8" />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
