"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';  
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { Post } from '@/sanity.types';
import Tag from '../Elements/Tag';

type Props = {}

export default function BlogCoverSection({}: Props) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const firstBlogQuery = `
      *[_type == "post"] | order(publishedAt desc)[0]{
        title,
        description,
        mainImage,
        slug
      }
    `;
    
    client.fetch(firstBlogQuery)
      .then((data: Post) => {
        setPost(data);
      })
      .catch(err => console.error(err)); // Handle errors if fetch fails
  }, []);

  return (
    <div className='mt-24 w-full flex justify-center'>
      {post && post.mainImage ? (
        <article className='relative w-[95%] lg:w-[1350px] mx-auto h-[70vh] sm:h-[85vh]'>
          {/* Main Image */}
          <div className='relative w-full h-full rounded-3xl overflow-hidden'>
            <Image 
              src={urlFor(post.mainImage).url()}
              alt={post.title || 'Featured Blog'}
              width={3600}
              height={800}
              placeholder='blur'
              blurDataURL={urlFor(post.mainImage).url({ blur: 10 })}
              className='w-full h-full object-cover object-center'
              priority={true}
            />
            {/* Gradient Overlay */}
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent to-gray-950 rounded-3xl' />
          </div>
          
          {/* Text Overlay */}
          <div className='absolute bottom-4 left-4 p-4 text-white z-20 space-y-4'>
            {/* Tag Component */}
            <Tag/>
            
            {/* Post Title */}
            {post.slug && post.title && (
              <Link href={`/post/${post.slug.current}`}>
                <h1 className='mt-2 text-xl md:text-3xl font-bold capitalize cursor-pointer hover:underline'>
                  <span className='bg-gradient-to-r from-blue-300 to-blue-500 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500'>
                    {post.title}
                  </span>
                </h1>
              </Link>
            )}

            {/* Post Description */}
            {post.description && (
              <p className='hidden md:block text-[10px] md:text-[14px] lg:text-[16px] leading-snug'>
                {post.description}
              </p>
            )}
          </div>
        </article>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
