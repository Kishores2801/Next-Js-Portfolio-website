"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

type ExperienceItem = {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  dateStarted: string;
  dateEnded?: string;
  isCurrentlyWorkingHere: boolean;
  companyImageUrl: string;
  technologies: { name: string; imageUrl: string }[];
  points: string[];
};

export default function ExperienceCard() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sanity query to fetch experiences
  const experienceQuery = groq`
    *[_type == "Experience" && !(_id in path("drafts.**"))] | order(dateStarted desc) {
      _id,
      jobTitle,
      company,
      location,
      dateStarted,
      dateEnded,
      isCurrentlyWorkingHere,
      "companyImageUrl": companyImage.asset->url,
      technologies[]-> {
        "name": title,
        "imageUrl": image.asset->url
      },
      points
    }
  `;

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await client.fetch(experienceQuery);
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load experiences.");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) return <p>Loading experiences...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (experiences.length === 0) return <p>No experiences available.</p>;

  return (
    <div className="space-y-6">
      {experiences.map((experience) => (
        <article
          key={experience._id}
          className="flex flex-col items-center space-y-3 w-[85%] sm:w-[280px] md:w-[300px] h-[250px] sm:h-[450px] bg-gray-50 p-4 
                     hover:opacity-100 opacity-90 cursor-pointer transition-opacity duration-200 overflow-hidden shadow-md 
                     mx-auto rounded-2xl"
        >
          <motion.div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
            <Image
              src={experience.companyImageUrl}
              alt={`${experience.company} Logo`}
              layout="fill"
              objectFit="cover"
              priority // Improves performance for critical images
            />
          </motion.div>

          <div className="px-3 text-center">
            <h2 className="text-base font-medium text-gray-800">
              {experience.jobTitle} at {experience.company}
            </h2>
            <p className="font-semibold text-xs mt-1 text-gray-600">
              {experience.location}
            </p>

            <div className="flex justify-center space-x-2 my-1">
              {experience.technologies.map((tech, index) => (
                <Image
                  key={index}
                  className="h-5 w-5 rounded-full"
                  src={tech.imageUrl}
                  alt={tech.name}
                  width={50}
                  height={50}
                />
              ))}
            </div>

            <p className="uppercase py-1 text-xs text-gray-500">
              {new Date(experience.dateStarted).toLocaleDateString()} -{" "}
              {experience.isCurrentlyWorkingHere
                ? "Present"
                : new Date(experience.dateEnded || "").toLocaleDateString()}
            </p>

            {/* Display Points Dynamically */}
            {experience.points?.length > 0 ? (
              <ul className="list-disc space-y-1 ml-3 text-[10px] sm:text-xs text-gray-800">
                {experience.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[10px] sm:text-xs text-gray-500 italic">
                No points available.
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
