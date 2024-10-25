"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { client } from "@/sanity/lib/client";

interface SkillProps {
  title: string;
  progress: number;
  image: { asset: { _ref: string } };
}

type Props = {};

export default function Skills({}: Props) {
  const [skills, setSkills] = useState<SkillProps[]>([]);

  // Sanity Query to fetch skills
  const SKILLS_QUERY = `
    *[_type == "Skills"]{
      title,
      progress,
      image
    }
  `;

  // Fetch skills from Sanity when the component mounts
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await client.fetch(SKILLS_QUERY);

        // Sort the skills by progress in descending order
        const sortedSkills = data.sort((a: SkillProps, b: SkillProps) => b.progress - a.progress);

        console.log("Fetched and Sorted Skills:", sortedSkills); // Debugging
        setSkills(sortedSkills);
      } catch (err) {
        console.error("Error fetching skills from Sanity:", err);
      }
    };
    fetchSkills();
  }, []);

  return (
    <motion.div
      className="flex relative h-auto min-h-screen flex-col text-center md:text-left xl:flex-row max-w-7xl 
                 xl:px-10 justify-center xl:space-y-0 mx-auto items-center mb-10 px-4 sm:px-6 md:px-8"
    >
      <h3
        className="grid sm:top-16 md:top-18 uppercase tracking-[5px] sm:tracking-[10px] md:tracking-[12px] 
                   text-blue-500 text-lg sm:text-xl md:text-2xl mb-16"
      >
        Skills
      </h3>

      {/* Responsive Grid Setup */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6
                    p-10 sm:mt-24 md:mt-20 w-full px-4 sm:px-8"
      >
        {/* Render Skill components dynamically */}
        {skills.map((skill, index) => (
          <Skill key={index} {...skill} />
        ))}
      </div>
    </motion.div>
  );
}
