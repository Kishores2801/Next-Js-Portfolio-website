"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity.types";
import Tag from "../Elements/Tag";

type Props = {};

export default function BlogLayoutTwo({}: Props) {
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
        if (data && data.length > 2) {
          setPost(data[2]); // Set the third blog post
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {post && post.mainImage && post.slug && (
        <div className="relative mx-auto w-full max-w-[700px] px-2 sm:px-4">
          {/* Blog Image with Overlay and Content */}
          <Link
            href={`/post/${post.slug.current}`}
            className="block rounded-xl overflow-hidden relative"
          >
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] rounded-2xl overflow-hidden">
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
              <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-gray-950 rounded-2xl z-10" />

              {/* Tag and Title Inside Image Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-20 space-y-2 text-white">
                {/* Tag Component */}
                <div className="uppercase text-[10px] sm:text-xs md:text-sm font-semibold text-cyan-100">
                  <Tag />
                </div>

                {/* Post Title */}
                <h1 className="text-md sm:text-lg md:text-xl font-bold capitalize ">
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
          </Link>
        </div>
      )}
    </>
  );
}
