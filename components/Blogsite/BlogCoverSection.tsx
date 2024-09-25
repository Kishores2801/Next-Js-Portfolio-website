"use client";
import React, { useState, useEffect } from 'react';
import { urlForImage, client } from '../../sanity/lib/client';  
import Image from 'next/image';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define the Post type according to your data structure
interface Post {
  title?: string;
  mainImage?: {
    asset: SanityImageSource;
  };
}

const BlogCoverSection: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null); // State for a single post
  const [loading, setLoading] = useState<boolean>(true); // State for loading image
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const firstBlogQuery = '*[_type == "post"] | order(publishedAt desc)[0]'; // Fetch only the first post

    client.fetch(firstBlogQuery)
      .then((data: Post) => {
        if (data) {
          console.log("Fetched post:", data); // Log the fetched post data
          setPost(data); // Set the fetched post into state
          setLoading(false); // Stop loading state
        }
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setErrorMessage('Failed to load post. Please try again later.');
        setLoading(false); // Stop loading state even if there's an error
      });
  }, []);

  return (
    <div className='w-full inline-block'>
      <article className="relative mx-10 h-[60vh] sm:h-[65vh]">
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : post && post.mainImage ? (
          <div className="relative w-full h-full rounded-3xl">
            <Image 
              src={urlForImage(post.mainImage.asset).url()} // Ensure the asset is passed correctly
              alt={post.title || 'Blog Post Image'} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add the sizes prop for responsive optimization
              className="w-full h-full object-center object-cover rounded-3xl"
              
              onLoadingComplete={() => console.log("Image Loaded")} // Optional: log when image is fully loaded
            />
          </div>
        ) : (
          <p>No post available.</p>
        )}
      </article>
    </div>
  );
};

export default BlogCoverSection;
