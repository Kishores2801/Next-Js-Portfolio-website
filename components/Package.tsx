"use client";
import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

interface Skill {
  title: string;
}

interface PackageProps {
  title: string;
  image: { asset: { _ref: string } };
  directionLeft?: boolean;
  toolsIncluded?: string[];
  relatedSkills?: Skill[];
}

export default function Package({
  title,
  image,
  directionLeft,
  toolsIncluded = [],
  relatedSkills = [],
}: PackageProps) {
  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
    >
      {/* Package Image */}
      {image?.asset?._ref ? (
        <motion.img
          initial={{ x: directionLeft ? -100 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={urlFor(image).url()}
          alt={title}
          width={10}
          height={10}
          aria-label={`Package: ${title}`}
          className="rounded-full border object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                     group-hover:grayscale group-hover:brightness-110 transition duration-300 bg-white"
        />
      ) : (
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border rounded-full bg-gray-100">
          <p className="text-gray-400 text-xs sm:text-sm">No Image</p>
        </div>
      )}

      {/* Hover Details with Included Tools and Related Skills */}
      <div className="absolute top-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-white p-2 sm:p-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full shadow-lg flex flex-col items-center justify-center">
          <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-1 text-center">{title}</h4>

          {/* Related Skills List */}
          {relatedSkills.length > 0 && (
            <div className="mt-1 text-center">
              <p className="text-xs font-semibold text-gray-700">Related Skills:</p>
              <ul className="list-disc space-y-1 text-xs sm:text-sm text-gray-600">
                {relatedSkills.map((skill, index) => (
                  <li key={index}>{skill.title}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools Included List */}
          {toolsIncluded.length > 0 && (
            <div className="mt-2 text-center">
              <p className="text-xs font-semibold text-gray-700">Tools Included:</p>
              <ul className="list-disc space-y-1 text-xs sm:text-sm text-gray-600">
                {toolsIncluded.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
