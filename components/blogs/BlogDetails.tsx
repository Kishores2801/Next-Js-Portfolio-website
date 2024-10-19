import React from "react";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity.types";
import { groq } from "next-sanity";
import { parseISO, format } from "date-fns"; // For date formatting

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogDetails({ params: { slug } }: Props) {
  const blogQuery = groq`
    *[_type == 'post' && slug.current == $slug][0]{
      ...,
      "author": author[0] -> { name, image },
      publishedAt
    }
  `;

  const post: Post | null = await client.fetch(blogQuery, { slug });

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="p-6 mt-4 flex justify-between items-center px-10 bg-blue-500 text-black-100 dark:text-white mx-10 rounded-lg">
      {/* Display Published Date */}
      {post.publishedAt && (
        <time className="text-lg justify-self-start">
          {format(parseISO(post.publishedAt), "LLLL d, yyyy")}
        </time>
      )}

      <span className="text-lg justify-self-end">5 min read</span>

      
    </div>
  );
}
