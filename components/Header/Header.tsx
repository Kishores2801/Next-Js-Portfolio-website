"use client";

import { useState } from 'react'; // Import useState
import Logo from '../Header/Logo';
import Link from 'next/link';
import { SunIcon, LinkedinIcon, GithubIcon } from '../icons';
import Head from "../../app/(user)/head";

// Define the navLinks array
export const navLinks = [
  { name: "Home", path: '/' },
  { name: "About", path: '/about' },
  { name: "Portfolio", path: '/portfolio' },
  { name: "Blogs", path: '/blogs' },
  { name: "Contact me", path: '/contact' },
];

const Header = ({ selectedSection, setSelectedSection }) => {
  return (
    <header className="w-full p-4 px-10 flex items-center justify-between ">
      {/* Logo */}
      <Logo />

      {/* Meta Information Head */}
      <Head />

      {/* Navigation Bar */}
      <nav className="w-max rounded-full py-3 px-8 border border-solid border-black font-medium capitalize flex items-center fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm">
        {/* Navigation Links */}
        <ul className="flex">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className={`mr-3 ${selectedSection === link.path ? '' : ''}`} // Underline the selected section
              onClick={() => setSelectedSection(link.path)} // Set the selected section on click
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Sun Icon (Theme Toggle) */}
        <button aria-label="Toggle Theme" className="ml-4">
          <SunIcon />
        </button>
      </nav>

      {/* Social Links */}
      <div className="flex space-x-4">
        <a
          href="https://www.linkedin.com/in/kishore-shan/"
          aria-label="LinkedIn Profile"
          className="inline-block w-6 h-8"
        >
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href="https://github.com/Kishores2801/"
          aria-label="GitHub Profile"
          className="inline-block w-6 h-8"
        >
          <GithubIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
      </div>
    </header>
  );
};

export default Header;
