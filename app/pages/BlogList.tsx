"use client"; 
import React, { useState, useEffect } from 'react';
import {  Post } from '@/interfaces/postInterfaces'; 
import Image from 'next/image';
import BlogCoverSection from '@/components/Blogsite/BlogCoverSection';
import { AuroraBackground } from '@/components/ui/aurora-background';

const BlogList: React.FC = () => {
  

  return (
    
      <div className='flex flex-col items-center justify-center'>
      
      <BlogCoverSection/>
    </div>

    
    
  );
};

export default BlogList;
