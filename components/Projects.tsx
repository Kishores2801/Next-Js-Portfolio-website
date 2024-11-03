"use client";
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { groq } from 'next-sanity';


interface WorkItem {
  _id: string;
  title: string;
  summary: string;
  imgUrl: string;
  projectLink: string;
  githubLink : string;
  tags: string[];

}

export default function Projects() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [filterWork, setFilterWork] = useState<WorkItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [animateCard, setAnimateCard] = useState<{ y: number; opacity: number }>({ y: 0, opacity: 1 });

  const WORKS_QUERY = groq`
    *[_type == "works"]{
      _id,
      title,
      summary,
      "imgUrl": image.asset->url,
      projectLink,
      githubLink,
      tags,
      technologies[]->{
        title,
        "imageUrl": image.asset->url
      }
    }
  `;

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data: WorkItem[] = await client.fetch(WORKS_QUERY);
        setWorks(data);
        setFilterWork(data); // Initialize filtered work with all works
      } catch (err) {
        console.error("Error fetching data from Sanity:", err);
      }
    };
    fetchWorks();
  }, []);

  const uniqueCategories = Array.from(new Set(works.flatMap((work) => work.tags)));

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      setFilterWork(item === 'All' ? works : works.filter((work) => work.tags.includes(item)));
    }, 500);
  };

  return (
    <div className="flex flex-col relative min-h-screen text-center md:text-left max-w-9xl px-3 sm:px-6 md:px-6 justify-evenly mx-auto items-center overflow-hidden">
      <h3 className="absolute top-12 uppercase tracking-[6px] sm:tracking-[8px] text-blue-500 text-lg sm:text-xl md:text-2xl">
        Project Showcase
      </h3>

      <div className="mt-24 flex flex-col items-center justify-center w-full">
        <div className="flex justify-center rounded-md items-center flex-wrap mb-6 gap-3 px-4">
          <button
            onClick={() => handleWorkFilter('All')}
            className={`px-3 py-2 cursor-pointer rounded-xl transition-all duration-300 ${
              activeFilter === 'All' ? 'bg-blue-400 text-white' : 'bg-white text-black border border-gray-300'
            }`}
          >
            All
          </button>
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleWorkFilter(category)}
              className={`px-3 py-2 cursor-pointer rounded-xl transition-all duration-300 ${
                activeFilter === category ? 'bg-blue-400 text-white' : 'bg-white text-black border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="flex flex-wrap justify-center gap-5 p-2 w-full max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
        >
          {filterWork.map((work, index) => (
            <div
              key={work._id || index}
              className="w-[90%] sm:w-52 md:w-60 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-1 text-center cursor-pointer overflow-hidden"
            >
              <div className="w-full h-48 sm:h-52 relative overflow-hidden rounded-t-xl">
                {work.imgUrl ? (
                  <Image
                    src={urlFor(work.imgUrl).url()}
                    alt={work.title || "Project Image"}
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 transition-opacity gap-4"
                >
                  {work.projectLink && (
                    <a href={work.projectLink} target="_blank" rel="noreferrer" className="m-2">
                      <motion.div whileHover={{ scale: [1.1, 1] }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <AiFillEye className="text-black" />
                      </motion.div>
                    </a>
                  )}
                  {work.githubLink && (
                    <a href={work.githubLink } target="_blank" rel="noreferrer" className="m-2">
                      <motion.div whileHover={{ scale: [1.1, 1] }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <AiFillGithub className="text-black" />
                      </motion.div>
                    </a>
                  )}
                </motion.div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{work.title || "Untitled Project"}</h4>

                

                <p className="text-[12px] text-gray-600">{work.summary || "No description available."}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
