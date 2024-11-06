"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';  
import BlogLayoutOne from '../blogs/BlogLayoutOne';
import BlogLayoutTwo from '../blogs/BlogLayoutTwo';
import BlogLayoutThree from '../blogs/BlogLayoutThree';
import { Post as Post } from '@/sanity.types';

type Props = {}

export default function FeaturedPost({}: Props) {
  const [post, setPost] = useState<Post[]>([]);

  useEffect(() => {
    const OtherBlogQuery = `
      *[_type == "post"] | order(publishedAt desc)[1..]{
        title,
        description,
        mainImage,
        slug
      }
    `;

    client
      .fetch(OtherBlogQuery)
      .then((data: Post[]) => setPost(data))
      .catch((err) => console.error(err)); // Handle errors if fetch fails
  }, []);

  return (
    <section className="w-full mt-32 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center">
  <h2 className="font-bold capitalize text-xl text-black-100 dark:text-white sm:text-2xl lg:text-3xl mb-4 sm:mb-5 lg:mb-6 text-center">
    Featured Posts
  </h2>

  {/* Responsive Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
    {/* BlogLayoutOne with consistent height */}
    <article className="md:row-span-2 relative h-[400px] md:h-[700px]">
      <BlogLayoutOne  />
    </article>

    {/* BlogLayoutTwo and BlogLayoutThree Stacked */}
    <div className="flex flex-col gap-6">
      <article className="relative h-[180px] md:h-[230px]">
        <BlogLayoutTwo  />
      </article>
      <article className="relative h-[180px] md:h-[230px]">
        <BlogLayoutThree />
      </article>
    </div>
  </div>
</section>

  );
}