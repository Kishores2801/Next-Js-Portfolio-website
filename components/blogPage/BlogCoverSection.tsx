"use client";

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { Post } from '@/sanity.types';
import Tag from '../Elements/Tag';

type Props = {};

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

    client
      .fetch(firstBlogQuery)
      .then((data: Post) => setPost(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-16 w-full flex justify-center px-4">
      {post && post.mainImage ? (
        <article className="relative w-full max-w-[1350px] h-[60vh] sm:h-[75vh] rounded-2xl overflow-hidden">
          {/* Main Image */}
          
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title || 'Featured Blog'}
              fill
              placeholder="blur"
              blurDataURL={urlFor(post.mainImage).url()}
              className="object-cover object-center w-full h-full"
              priority
            />
   

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />

          {/* Text Overlay */}
          <div className="absolute bottom-4 left-4 p-4 text-white z-20 space-y-3">
            <Tag />

            {post.title && post.slug &&  (
              <Link href={`/post/${post.slug.current}`}>
                <h1 className="text-xl md:text-3xl font-bold capitalize cursor-pointer hover:underline">
                  <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-[length:0px_4px] hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                    {post.title}
                  </span>
                </h1>
              </Link>
            )}

            {post.description && (
              <p className="hidden sm:block text-xs sm:text-sm md:text-base leading-snug">
                {post.description}
              </p>
            )}
          </div>
        </article>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
}
