"use client";

import { useState } from 'react';
import Header from '@/components/Header/Header'; // Import the Header component
import About from '../pages/About';
import Hero from '../pages/Hero';
import BlogList from '../pages/BlogList';

export default function Home() {
  const [selectedSection, setSelectedSection] = useState('/');

  return (
    <main className="relative flex flex-col items-center justify-center">
      {/* Pass selectedSection and setSelectedSection to the Header */}
      <Header selectedSection={selectedSection} setSelectedSection={setSelectedSection}/>

      {/* Conditionally Render Content Based on Selected Section */}
      <div className="w-full h-fit">
        {selectedSection === '/' && <Hero />}
        {selectedSection === '/about' && <About />}
        {selectedSection === '/portfolio' && <div>Portfolio Component</div>}
        {selectedSection === '/blogs' && <BlogList />}
        {selectedSection === '/contact' && <div>Contact Component</div>}
      </div>
    </main>
  );
}
