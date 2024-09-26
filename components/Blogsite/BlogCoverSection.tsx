"use client";
import React, { useState, useEffect } from 'react';
import { urlForImage, client } from '../../sanity/lib/client';  
import Image from 'next/image';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Post {
  title?: string;
  mainImage?: {
    asset: SanityImageSource;
  };
}
export default function BlogCoverSection ()  {
  const [Post, setPost] = useState([]);

  useEffect(() => {
    const firstBlogQuery = '*[_type == "post"] | order(publishedAt desc)[0]';
  
    client.fetch(firstBlogQuery)
    .then((data: Post) => {
      setPost(data);
    });
  }, []);  // <-- Add empty array here to ensure it runs only once
  
  return (
    <div>
      {Post ? (
        <div>BlogCoverSection for {Post.title}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
