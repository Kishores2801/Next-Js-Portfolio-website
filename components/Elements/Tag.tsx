"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import { cx } from "@/utils";
import { groq } from "next-sanity";

// Define the types for your data structure
interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

interface Post {
  categories: Category[];
}

export default function Tag() {
  const [post, setPost] = useState<Post | null>(null); // Use correct type
  const [error, setError] = useState<Error | null>(null); // Better error handling

  useEffect(() => {
    const firstBlogQuery = groq`
      *[_type == "post"] | order(publishedAt desc)[0]{
        "categories": categories[]->{
          _id,
          title,
          slug
        }
      }
    `;

    client
      .fetch<Post>(firstBlogQuery) // Type the fetch response
      .then((data) => {
        if (!data) {
          console.error("No post data found");
          setError(new Error("No post data found"));
        } else if (!data.categories) {
          console.error("Categories not found in post data", data);
          setError(new Error("Categories not found"));
        } else {
          setPost(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setError(err);
      });
  }, []);

  if (error) {
    return <p className="text-red-500">Failed to load categories: {error.message}</p>;
  }

  if (!post || !post.categories || post.categories.length === 0) {
    return <p>No categories available.</p>;
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="text-left">
        <ul className="flex flex-wrap justify-start gap-2 sm:gap-4">
          {post.categories.map((category) => (
            <li key={category._id} className="w-full sm:w-auto">
              <Link
                href={`/categories/${category.slug?.current || "#"}`}
                className={cx(
                  "block text-center py-3 px-5 sm:py-4 sm:px-8",
                  "bg-black text-white rounded-full text-sm sm:text-lg",
                  "capitalize font-semibold border border-solid border-white",
                  "hover:scale-110 transition-transform duration-300"
                )}
              >
                {category.title || "Unnamed Category"}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
