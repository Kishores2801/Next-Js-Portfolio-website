import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Props = {};

function BackgroundCircles({}: Props) {
  const [colors, setColors] = useState({
    outer: 'border-blue-600',
    middle: 'border-blue-500',
    inner: 'border-blue-400',
    core: 'from-blue-500 to-blue-200',
  });

  // Function to generate a random color
  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  // Function to update colors randomly every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColors({
        outer: getRandomColor(),
        middle: getRandomColor(),
        inner: getRandomColor(),
        core: `${getRandomColor()} to ${getRandomColor()}`,
      });
    }, 3000); // Change colors every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Circle with Random Color Ping Animation */}
      <motion.div
        className={`absolute border rounded-full h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] animate-ping`}
        style={{ borderColor: colors.outer }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Middle Circle */}
      <motion.div
        className={`absolute border rounded-full h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]`}
        style={{ borderColor: colors.middle }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      {/* Largest Circle */}
      <motion.div
        className={`absolute border rounded-full h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]`}
        style={{ borderColor: colors.inner }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      {/* Arc Reactor Core with Gradient */}
      <motion.div
        className="absolute rounded-full h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px] blur-lg shadow-[0_0_30px_15px_rgba(59,130,246,0.8)]"
        style={{
          background: `linear-gradient(to right, ${colors.core})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default BackgroundCircles;
