"use client";
import React, { useState } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

// Skill logo mapping
const skillLogoMap: { [key: string]: string } = {
  'React': 'https://via.placeholder.com/40?text=React',
  'Node.js': 'https://via.placeholder.com/40?text=Node',
  'D3.js': 'https://via.placeholder.com/40?text=D3',
  'Tailwind CSS': 'https://via.placeholder.com/40?text=Tailwind',
  'Python': 'https://via.placeholder.com/40?text=Python',
  'Pandas': 'https://via.placeholder.com/40?text=Pandas',
  'Matplotlib': 'https://via.placeholder.com/40?text=Matplotlib',
  'Plotly': 'https://via.placeholder.com/40?text=Plotly',
  'Sanity.io': 'https://via.placeholder.com/40?text=Sanity',
  'JavaScript': 'https://via.placeholder.com/40?text=JS',
  'CSS': 'https://via.placeholder.com/40?text=CSS',
};

interface WorkItem {
  title: string;
  description: string;
  imgUrl: string;
  projectLink: string;
  codeLink: string;
  tags: string[];
  skills?: string[];
}

const sampleWorks: WorkItem[] = [
  {
    title: 'UK Railway Travel Dashboard',
    description: 'This interactive web dashboard is designed to explore traveler behavior and operational performance in UK Railways.',
    imgUrl: 'https://via.placeholder.com/150',
    projectLink: 'https://example.com',
    codeLink: 'https://github.com/example',
    tags: ['Web App'],
    skills: ['React', 'Node.js', 'D3.js', 'Tailwind CSS'],
  },
  {
    title: 'Phone-Pe Dashboard',
    description: 'PhonePe Dashboard offers insights from 2018–2023 data for operational oversight.',
    imgUrl: 'https://via.placeholder.com/150',
    projectLink: 'https://example.com',
    codeLink: 'https://github.com/example',
    tags: ['Data Visualization'],
    skills: ['Python', 'Pandas', 'Matplotlib', 'Plotly'],
  },
  {
    title: 'My Portfolio Web App',
    description: 'The Current Portfolio app is built on React JS front end and Sanity Back end.',
    imgUrl: 'https://via.placeholder.com/150',
    projectLink: 'https://example.com',
    codeLink: 'https://github.com/example',
    tags: ['Web App'],
    skills: ['React', 'Sanity.io', 'JavaScript', 'CSS'],
  },
];

export default function Projects() {
  const [works] = useState<WorkItem[]>(sampleWorks);
  const [filterWork, setFilterWork] = useState<WorkItem[]>(sampleWorks);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [animateCard, setAnimateCard] = useState<{ y: number; opacity: number }>({ y: 0, opacity: 1 });

  const uniqueCategories = Array.from(new Set(works.flatMap(work => work.tags)));

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      setFilterWork(item === 'All' ? works : works.filter(work => work.tags.includes(item)));
    }, 500);
  };

  return (
    <div className="flex flex-col relative min-h-screen text-center md:text-left max-w-9xl px-3 sm:px-6 md:px-8 justify-evenly mx-auto items-center overflow-hidden">
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
              key={index}
              className="w-[90%] sm:w-52 md:w-60 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-1 text-center cursor-pointer overflow-hidden"
            >
              <div className="w-full h-48 sm:h-52 relative overflow-hidden rounded-t-xl">
                <img src={work.imgUrl} alt={work.title} className="w-full h-full object-cover" />
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 transition-opacity"
                >
                  <a href={work.projectLink} target="_blank" rel="noreferrer" className="m-2">
                    <motion.div whileHover={{ scale: [1.1, 1] }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <AiFillEye className="text-black" />
                    </motion.div>
                  </a>
                  <a href={work.codeLink} target="_blank" rel="noreferrer" className="m-2">
                    <motion.div whileHover={{ scale: [1.1, 1] }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <AiFillGithub className="text-black" />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{work.title}</h4>
                <p className="text-sm text-gray-600">{work.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
