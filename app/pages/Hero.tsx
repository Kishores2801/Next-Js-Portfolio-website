"use client";

import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// TypeScript typing for Lottie animation data
interface LottieOptions {
  loop: boolean;
  autoplay: boolean;
  animationData: any; // Use 'any' if the JSON structure is not strictly defined
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

const Hero: React.FC = () => {
  const [animationData, setAnimationData] = useState<any>(null);
  const words = `Every powerful decision is born from a deep understanding of information.`;

  useEffect(() => {
    // Fetch the Lottie animation JSON file from the public folder
    fetch('/Lottie Animation/Hero Animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  const defaultOptions: LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Set this after fetching
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-fit">
      {/* Flex container to place content side by side */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full md:space-x-2 space-y-4 md:space-y-0">
        {/* Text Section */}
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 1 }}
          id="app__header-info"
          className="relative p-4 md:w-2/5 text-center md:text-left flex flex-col justify-between"
        >
          <div id="app__header-badge">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-100 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-4 border">
                {/* Name and Hello Section */}
                <CardItem
                  translateZ="50"
                  className="text-lg font-bold text-neutral-600 dark:text-white"
                >
                  <div className="badge-cmp app__flex flex items-center justify-between">
                    {/* Waving Hand and Text on Same Line */}
                    <span className="text-3xl">👋🏼</span>
                    <div className="ml-2">
                      <p className="p-text inline-block">Hello, I am</p><br/>
                      <h1 className="head-text inline-block text-2xl ml-2">Kishore!</h1>
                    </div>
                  </div>
                </CardItem>

                {/* Aspiring Data Scientist Section */}
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-xs mt-4 dark:text-neutral-300"
                >
                  <span className="p-text text-left font-semibold italic">I am an Aspiring Data Scientist</span>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          {/* Text-Generate Effect Section */}
          <div id="Text-generate" className="mt-6">
            <TextGenerateEffect className='italic text-gray-500' duration={10} filter={false} words={words} />
          </div>
        </motion.div>

        {/* Lottie Animation Section */}
        <motion.div
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="app__header-lottie-img md:w-2/5 flex items-center justify-center"
        >
          {animationData && (
            <Lottie
              options={defaultOptions}
              height={500} // Reduced size of animation
              width={500}  // Reduced size of animation
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
