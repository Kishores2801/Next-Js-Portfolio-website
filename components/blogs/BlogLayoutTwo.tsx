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
        <div className="relative mx-auto w-full max-w-[700px] px-2 sm:px-4">
          {/* Blog Image and Overlay */}
          <Link href={`/post/${post.slug.current}`} className="block">
            <div className="relative  w-full h-[140px] sm:h-[200px] md:h-[230px] rounded-2xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title || "Featured Blog"}
                width={700}
                height={500}
                placeholder="blur"
                blurDataURL={urlFor(post.mainImage).url()}
                className="w-full h-full object-cover object-center"
                priority={true}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950 rounded-3xl z-10" />

              {/* Title and Tag within Image */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 space-y-3">
                {/* Tag Component */}
                <div className="inline-block uppercase text-cyan-100 font-semibold text-xs sm:text-sm">
                  <Tag />
                </div>

                {/* Post Title */}
                <h1 className="text-lg sm:text-xl font-bold capitalize text-white">
                  <Link href={`/post/${post.slug.current}`} className="hover:underline">
                    <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                      {post.title}
                    </span>
                  </Link>
                </h1>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
