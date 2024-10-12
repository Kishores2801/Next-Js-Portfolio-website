"use client";
import React from 'react';
import Logo from '../Header/Logo';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

import { FloatingNav } from '../ui/floating-navbar';
import { FaHome, FaUser } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { GoProject } from "react-icons/go";

type Props = {}

function Header({}: Props) {
  return (
    <header className='fixed top-0 left-0 w-full z-50 p-4 px-10 flex items-center justify-between bg-light/60 backdrop-blur-[2px]'>
      {/* Logo */}
      <Logo />

      <div>
        <ul>
          <FloatingNav navItems={[
            { name: "Home", link: "/", icon: <FaHome /> },
            { name: "About", link: "#about", icon: <FaUser /> },
            { name: "WorkExperience", link: "#experience", icon: <MdOutlineWork /> },
            { name: "Skills", link: "#skills", icon: <GiSkills /> },
            { name: "Projects", link: "#project", icon: <GoProject /> },
          ]} />
        </ul>
      </div>

      {/* Social Icons with reduced size */}
      <div className="flex space-x-2">
        <SocialIcon
          url='https://www.linkedin.com/in/kishore-shan/'
          className='hover:scale-125 transition-transform duration-200'
          style={{ width: 40, height: 40 }}
        />
        <SocialIcon
          url='https://github.com/Kishores2801'
          className='hover:scale-125 transition-transform duration-200'
          style={{ width: 40, height: 40 }}
        />
      </div>
    </header>
  );
}

export default Header;
