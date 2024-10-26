"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import { groq } from "next-sanity";

// Define types
interface Category {
  _id: string;
  title: string;
  slug: { current?: string };
}

interface Post {
  categories: Category[];
}

export default function Tag() {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetching post categories on mount
  useEffect(() => {
    client
      .fetch<Post>(
        groq`*[_type == "post"] | order(publishedAt desc)[0]{ 
          "categories": categories[]->{ _id, title, slug } 
        }`
      )
      .then((data) =>
        data?.categories ? setPost(data) : setError("No categories found")
      )
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!post || post.categories.length === 0)
    return <p>No categories available.</p>;

  return (
    <div className="p-4 sm:p-6">
      <ul className="flex flex-wrap gap-2">
        {post.categories.map(({ _id, title, slug }) => (
          <li key={_id}>
            <Link
              href={`/categories/${slug?.current || "#"}`}
              passHref
              className="py-2 px-4 bg-black text-white rounded-full text-sm font-semibold border border-white hover:scale-105 transition-transform"
            >
              {title || "Unnamed Category"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
