"use client";
import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

interface SkillProps {
  title: string;
  progress: number;
  image: { asset: { _ref: string } };
  directionLeft?: boolean;
  toolspackages?: string[]; // Array of tools or packages
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
          width={20}
          height={20}
          aria-label={`Skill: ${title}`}
          className="rounded-full border object-contain w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 
                    group-hover:grayscale group-hover:brightness-110 transition duration-300 bg-white"
        />
      ) : (
        <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border rounded-full">
          <p className="text-gray-400">No Image</p>
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
          strokeWidth="2"
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
        <div className="bg-white p-3 w-44 h-44 rounded-lg shadow-lg flex flex-col items-center justify-start">
          <h4 className="text-lg font-bold text-gray-800 mb-1">{title}</h4>
          <p className="text-blue-500 font-semibold mb-2">{progress}%</p>

          {/* Tools and Packages List */}
          {toolspackages.length > 0 ? (
            <ul className="list-disc space-y-1 text-sm text-gray-600">
              {toolspackages.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-gray-500"></p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
