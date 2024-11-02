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
  toolsIncluded?: string[]; // Array of tools included in the package
  relatedSkills?: Skill[]; // Array of related skills objects for this package
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
          width={20}
          height={20}
          aria-label={`Package: ${title}`}
          className="rounded-full border object-contain w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 
                    group-hover:grayscale group-hover:brightness-110 transition duration-300 bg-white"
        />
      ) : (
        <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border rounded-full">
          <p className="text-gray-400">No Image</p>
        </div>
      )}

      {/* Hover Details with Included Tools and Related Skills */}
      <div className="absolute top-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-white p-3 w-20 sm:w-18 h-18 rounded-full shadow-lg flex flex-col items-center justify-start">
          <h4 className="text-sm font-bold p-1 justify-center text-gray-800 mb-1">{title}</h4>

          {/* Related Skills List */}
          {relatedSkills.length > 0 && (
            <div className="mt-1">
              <p className="text-xs font-semibold text-gray-700">Related Skills:</p>
              <ul className="list-disc space-y-1 text-xs sm:text-sm text-gray-600">
                {relatedSkills.map((skill, index) => (
                  <li key={index}>{skill.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
