"use client"; 
import React, { useState, useEffect } from 'react';
import { urlFor, client } from '../../sanity/lib/client';
import {  Post } from '@/interfaces/postInterfaces'; 
import Image from 'next/image';
import BlogCoverSection from '@/components/Blogsite/BlogCoverSection';

const BlogList: React.FC = () => {
  

  return (
    <div className='flex flex-col items-center justify-center'>
      
      <BlogCoverSection/>
    </div>
  );
};

export default BlogList;
