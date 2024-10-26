"use client";
import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

type Props = {};

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
};

type ExperienceCardProps = {
  experience: ExperienceItem;
};


function WorkExperience({ experience }: ExperienceCardProps) {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

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
      }
    }
  `;

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await client.fetch(experienceQuery);
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
      aria-label="Work Experience Section"
    >
      {/* Heading */}
      <h3 className="absolute top-24 uppercase tracking-[15px] text-blue-500 text-lg sm:text-xl md:text-2xl">
        My Work Experience
      </h3>

      {/* Experience Card Container */}
      <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-500">
      {experiences.map((experience) => (
      <ExperienceCard key={experience._id}  />
))}

      </div>
    </motion.div>
  );
}

export default WorkExperience;