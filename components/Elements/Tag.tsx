"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';  
import Link from 'next/link';
import { cx } from '@/utils';
import { Post } from '@/sanity.types';

type Props = {}

export default function Tag({}: Props) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const firstBlogQuery = `
      *[_type == "post"] | order(publishedAt desc)[0]{
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
  }, []);

  return (
    <div>
      {post && post.categories ? (
        <div className='text-left'>
          <ul className='flex flex-wrap justify-start space-x-4'>
            {post.categories.map(category => (
              <li key={category._id}>
                <Link 
                  href={`/categories/${category.slug.current}`} 
                  className={cx(
                    "inline-block py-2 px-5 md:py-3 md:px-10 bg-black-200 text-light rounded-full text-xs md:text-sm capitalize font-semibold border border-solid border-white hover:scale-105 transition-all ease-in-out duration-200"
                  )}
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
