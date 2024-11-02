"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { client } from "@/sanity/lib/client";
import Package from "./Package";

interface SkillProps {
  title: string;
  progress: number;
  image: { asset: { _ref: string } };
}

interface PackageProps {
  title: string;
  progress: number;
  image: { asset: { _ref: string } };
}

type Props = {};

export default function Skills({}: Props) {
  const [skills, setSkills] = useState<SkillProps[]>([]);
  const [packages, setPackages] = useState<PackageProps[]>([]);

  // Sanity Queries to fetch skills and packages
  const SKILLS_QUERY = `
    *[_type == "Skills"]{
      title,
      progress,
      image
    }
  `;

  const PACKAGES_QUERY = `
    *[_type == "Packages"]{
      title,
      progress,
      image
    }
  `;

  // Fetch skills and packages from Sanity when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await client.fetch(SKILLS_QUERY);
        const sortedSkills = skillsData.sort((a: SkillProps, b: SkillProps) => b.progress - a.progress);
        setSkills(sortedSkills);

        const packagesData = await client.fetch(PACKAGES_QUERY);
        const sortedPackages = packagesData.sort((a: PackageProps, b: PackageProps) => b.progress - a.progress);
        setPackages(sortedPackages);

        console.log("Fetched Skills:", sortedSkills);
        console.log("Fetched Packages:", sortedPackages);
      } catch (err) {
        console.error("Error fetching data from Sanity:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className="flex flex-col h-auto min-h-screen text-center md:text-left max-w-7xl 
                 px-4 sm:px-6 md:px-8 mx-auto items-center mb-10"
    >
      {/* Skills Section */}
      <h3
        className="uppercase tracking-[5px] sm:tracking-[10px] md:tracking-[12px] 
                   text-blue-500 text-lg sm:text-xl md:text-2xl mb-8"
      >
        Skills 
      </h3>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6
                    w-full px-4 sm:px-8 mb-16"
      >
        {skills.map((skill, index) => (
          <Skill key={index} {...skill} />
        ))}
      </div>

      {/* Packages Section */}
      <h3
        className="uppercase tracking-[5px] sm:tracking-[10px] md:tracking-[12px] 
                   text-blue-500 text-lg sm:text-xl md:text-2xl mt-8 mb-8"
      >
        Packages & Frameworks
      </h3>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6
                    w-full px-4 sm:px-8"
      >
        {packages.map((pkg, index) => (
          <Package key={index} {...pkg} />
        ))}
      </div>
    </motion.div>
  );
}
