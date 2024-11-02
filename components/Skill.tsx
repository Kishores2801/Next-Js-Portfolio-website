"use client";
import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

interface SkillProps {
  title: string;
  progress: number;
  image: { asset: { _ref: string } };
  directionLeft?: boolean;
  toolspackages?: string[];
}

export default function Skill({
  title,
  progress,
  image,
  directionLeft,
  toolspackages = [],
}: SkillProps) {
  const color =
    progress > 80
      ? "stroke-green-500"
      : progress > 50
      ? "stroke-yellow-500"
      : "stroke-red-500";

  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
    >
      {/* Skill Image */}
      {image?.asset?._ref ? (
        <motion.img
          initial={{ x: directionLeft ? -100 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={urlFor(image).url()}
          alt={title}
          width={15}
          height={15}
          aria-label={`Skill: ${title}`}
          className="rounded-full border object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                     group-hover:grayscale group-hover:brightness-110 transition duration-300 bg-white"
        />
      ) : (
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border rounded-full bg-gray-100">
          <p className="text-gray-400 text-xs sm:text-sm">No Image</p>
        </div>
      )}

      {/* Circular Progress Indicator */}
      <svg
        className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        viewBox="0 0 36 36"
      >
        <circle
          className="text-gray-300 dark:text-gray-700"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          cx="18"
          cy="18"
          r="15.5"
        />
        <motion.circle
          className={color}
          strokeWidth="4"
          strokeDasharray={`${progress}, 100`}
          strokeLinecap="round"
          fill="none"
          cx="18"
          cy="18"
          r="15.5"
          initial={{ strokeDasharray: "0, 100" }}
          animate={{ strokeDasharray: `${progress}, 100` }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Hover Details with Tools and Packages */}
      <div className="absolute top-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-white p-2 sm:p-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24  rounded-full shadow-lg flex flex-col items-center justify-start">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 text-center">{title}</h4>
          <p className="text-blue-500 font-semibold mb-1 text-xs sm:text-sm">{progress}%</p>

          
        </div>
      </div>
    </motion.div>
  );
}
