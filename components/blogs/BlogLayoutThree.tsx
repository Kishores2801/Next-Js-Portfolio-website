"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity.types";
import Tag from "../Elements/Tag";

type Props = {};

export default function BlogLayoutThree({}: Props) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const OtherBlogQuery = `
      *[_type == "post"] | order(publishedAt desc){
        title,
        description,
        mainImage,
        slug
      }
    `;

    client
      .fetch(OtherBlogQuery)
      .then((data: Post[]) => {
        if (data && data.length > 0) {
          setPost(data[3]); // Set the fourth blog post
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {post && post.mainImage && post.slug && (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-center text-dark overflow-hidden">
          {/* Blog Image */}
          <Link
            href={`/post/${post.slug.current}`}
            className="col-span-1 md:col-span-6 rounded-xl overflow-hidden"
          >
            <div className="relative w-full h-[120px] sm:h-[150px] md:h-[180px] rounded-2xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title || "Featured Blog"}
                width={400}
                height={300}
                placeholder="blur"
                blurDataURL={urlFor(post.mainImage).url()}
                className="w-full h-full object-cover object-center"
                priority={true}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-gray-950 rounded-2xl" />
            </div>
          </Link>

          {/* Text and Tags - Below Image on Mobile, Side-by-Side on Desktop */}
          <div className="col-span-1 md:col-span-6 flex flex-col md:justify-center space-y-4 mt-2 md:mt-0 text-left md:text-right">
            {/* Tag Component */}
            <div className="inline-block uppercase text-cyan-900 dark:text-accentDark font-semibold text-xs sm:text-sm">
              <Tag />
            </div>

            {/* Post Title */}
            <h1 className="text-lg sm:text-lg md:text-xl font-bold capitalize">
              <Link
                href={`/post/${post.slug.current}`}
                className="hover:underline"
              >
                <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                  {post.title}
                </span>
              </Link>
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
