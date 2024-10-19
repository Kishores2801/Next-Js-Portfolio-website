"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';  
import BlogLayoutOne from '../blogs/BlogLayoutOne';
import BlogLayoutTwo from '../blogs/BlogLayoutTwo';
import BlogLayoutThree from '../blogs/BlogLayoutThree';
import { Post } from '@/sanity.types';

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
    <section className="w-full mt-32 px-8 md:px-16 lg:px-32 flex flex-col items-center justify-center">
  <h2 className="w-full ml-4 md:ml-8 font-bold capitalize text-2xl sm:text-3xl">
    Featured Posts
  </h2>

  {/* Responsive Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
    {/* BlogLayoutOne with consistent height */}
    <article className="md:row-span-2 relative h-[400px] md:h-[700px]">
      <BlogLayoutOne  />
    </article>

    {/* BlogLayoutTwo and BlogLayoutThree Stacked */}
    <div className="flex flex-col space-y-6">
      <article className="relative h-[300px] md:h-[350px]">
        <BlogLayoutTwo  />
      </article>
      <article className="relative h-[300px] md:h-[350px]">
        <BlogLayoutThree />
      </article>
    </div>
  </div>
</section>

  );
}
