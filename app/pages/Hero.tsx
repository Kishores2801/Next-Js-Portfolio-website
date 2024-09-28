"use client";
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { motion } from "framer-motion";

const Hero = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the Lottie animation JSON file from the public folder
    fetch('/Lottie Animation/Hero Animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Set this after fetching
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="w-full h-fit">
      {/* Flex container to place content side by side */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full md:space-x-4 space-y-8 md:space-y-0">
        {/* Text Section */}
        <motion.div 
          whileInView={{ x: [-100, 0], opacity: [0, 1] }} 
          transition={{ duration: 1 }}
          id='app__header-info'
          className="p-6 md:w-1/5 text-center md:text-left"
        >
          <div id="app__header-badge">
            <div className="badge-cmp app__flex flex items-center justify-center md:justify-start">
              <span className="text-4xl">👋</span>
              <div className="ml-5">
                <p className="p-text">Hello, I am</p>
                <h1 className="head-text">Kishore!</h1>
              </div>
            </div>
            <div className="mt-4">
              <p className="p-text">Aspiring Data Scientist</p>
            </div>
          </div>
        </motion.div>

        {/* Lottie Animation Section */}
        <motion.div
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="app__header-lottie-img md:w-3/5 flex items-center justify-center"
        >
          {animationData && (
            <Lottie
              options={defaultOptions}
              height={500}
              width={500} // Adjusted size for proper layout
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
