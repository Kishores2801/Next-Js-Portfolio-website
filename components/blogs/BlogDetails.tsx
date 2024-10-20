import React from "react";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import { groq } from "next-sanity";
import { parseISO, format } from "date-fns"; // For date formatting

type Props = {
  params: {
    slug: string;
  };
};

// New type for the fetched post with expanded author and readingTime
interface ExpandedPost {
  title: string;
  description: string;
  slug: { current: string };
  author?: {
    name: string;
    image?: {
      asset: { url: string };
    };
  };
  publishedAt: string;
  readingTime?: number;
  mainImage?: {
    asset: { url: string };
  };
}

export default async function BlogDetails({ params: { slug } }: Props) {
  const blogQuery = groq`
    *[_type == 'post' && slug.current == $slug][0]{
      title,
      description,
      "author": author-> { name, image { asset->{ url } } },
      publishedAt,
      readingTime,
      mainImage { asset->{ url } }
    }
  `;

  const post: ExpandedPost | null = await client.fetch(blogQuery, { slug });

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="relative  p-6 mt-8 bg-blue-500 text-black-100 dark:text-white rounded-lg flex flex-col sm:flex-row justify-between items-center gap-8">
      {/* Author Info Section */}
      {post.author && (
        <div className="flex items-center gap-4">
          {post.author.image?.asset?.url && (
            <Image
              src={post.author.image.asset.url}
              alt={post.author.name}
              width={50}
              height={50}
              className="rounded-full object-cover transition-transform transform hover:scale-105 hover:brightness-110"
            />
          )}
          <span className="text-lg font-medium">{post.author.name}</span>
        </div>
      )}

      {/* Centered Date Section */}
      <div className="flex flex-col items-center">
        {post.publishedAt && (
          <time className="text-lg">
            {format(parseISO(post.publishedAt), "LLLL d, yyyy")}
          </time>
        )}
      </div>

      {/* Reading Time Section */}
      <div className="flex items-center gap-4">
        <span className="text-lg">
          {post.readingTime ? `${post.readingTime} min read` : "N/A min read"}
        </span>
      </div>
    </div>
  );
}
