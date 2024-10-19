"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity.types";
import Tag from "../Elements/Tag";

type Props = {};

export default function BlogLayoutOne({}: Props) {
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
          setPost(data[1]); // Set the second blog post
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {post && post.mainImage && post.slug && (
        <div className="relative mx-auto w-full max-w-[700px]">
          {/* Blog Image */}
          <Link href={`/post/${post.slug.current}`} className="block">
            <div className="relative w-full h-[300px] sm:h-[250px] md:h-[360px] lg:h-[480px] max-h-[600px] rounded-3xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title || "Featured Blog"}
                width={700}
                height={800}
                placeholder="blur"
                blurDataURL={urlFor(post.mainImage).url()}
                className="w-full h-full object-cover object-center sm:object-contain"
                priority={true}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950 rounded-3xl" />
            </div>
          </Link>

          {/* Text and Tag Overlay */}
          <div className="p-4 sm:p-6 mt-4 space-y-3 sm:space-y-4">
            {/* Tag Component */}
            <div className="inline-block uppercase text-cyan-900 dark:text-accentDark font-semibold top-20 text-xs sm:text-sm">
              <Tag />
            </div>

            {/* Post Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize cursor-pointer">
              <Link href={`/post/${post.slug.current}`} className="hover:underline">
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
