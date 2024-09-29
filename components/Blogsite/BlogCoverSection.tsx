"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';  
import Image from 'next/image';
import Link from 'next/link';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {  Post } from '@/interfaces/postInterfaces'; 
import { urlFor } from '@/sanity/lib/image';


export default function BlogCoverSection() {
  // Rename state to lowercase to avoid confusion with the Post interface
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const firstBlogQuery = `
          *[_type == "post"] | order(publishedAt desc)[0]{
            title,
            mainImage,
            "categories": categories[]->{
              _id,
              title,
              slug
            }
          }
`;
    
    client.fetch(firstBlogQuery)
      .then((data: Post) => {
        setPost(data);
      })
      .catch(err => console.error(err)); // Handle errors if fetch fails
  }, []);  // <-- Empty dependency array ensures the fetch runs only once on component mount
  
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      {post && post.mainImage ? (
        <article className='flex flex-col items-start justify-end mx-10 w-[70%] h-[80vh] relative'>
          <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent to-gray-950 rounded-3xl z-0'/>

          <Image 
            src={urlFor(post.mainImage).url()} 
            alt={post.title || 'Featured Blog'} 
            fill
            className='w-full h-full object-center object-cover rounded-3xl -z-10'
          />
          
          <div className='w-3/4 p-16 flex flex-col items-start text-white justify-center  z-0'>
            {post && post.categories ? (
              <div>
                <ul>
                  {post.categories.map(category => (
                    <li  key={category._id}>
                      <Link href={`/categories/${category.slug.current}`}>
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </article>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}