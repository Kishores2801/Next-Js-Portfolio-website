"use client";
import React from 'react';
import Logo from '../Header/Logo';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import { FloatingNav } from '../ui/floating-navbar';
import { FaHome, FaUser, FaPhoneAlt, FaBlogger } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { GoProject } from "react-icons/go";

type Props = {};

function Header({}: Props) {
  return (
    <header className="fixed top-0 left-0 w-full  p-3 px-10 flex items-center justify-between 
                       dark:bg-black-100 bg-gray-100 text-black dark:text-white 
                       backdrop-blur-[2px] transition-colors duration-300 dark:bg-grid-white/[0.035] bg-grid-black/[0.018] z-50">
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <div>
        <ul>
          <FloatingNav
            navItems={[
              { name: "Home", link: "/portfolio", icon: <FaHome /> },
              { name: "About", link: "/portfolio#about", icon: <FaUser /> },
              { name: "WorkExperience", link: "/portfolio#experience", icon: <MdOutlineWork /> },
              { name: "Skills", link: "/portfolio#skills", icon: <GiSkills /> },
              { name: "Projects", link: "/portfolio#project", icon: <GoProject /> },
              { name: "Blogs", link: "/blog", icon: <FaBlogger /> },
              { name: "Contact", link: "/portfolio#contact", icon: <FaPhoneAlt /> },
            ]}
          />
        </ul>
      </div>

      {/* Social Icons */}
      <div className="flex space-x-2">
        <SocialIcon
          url="https://www.linkedin.com/in/kishore-shan/"
          className="hover:scale-125 transition-transform duration-200"
          style={{ width: 40, height: 40 }}
        />
        <SocialIcon
          url="https://github.com/Kishores2801"
          className="hover:scale-125 transition-transform duration-200"
          style={{ width: 40, height: 40 }}
        />
      </div>
    </header>
  );
}

export default Header;
