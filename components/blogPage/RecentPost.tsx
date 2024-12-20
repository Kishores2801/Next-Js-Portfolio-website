"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity.types";
import Tag from "../Elements/Tag";
import { motion } from "framer-motion";

type Props = {};

export default function RecentPost({}: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const OtherBlogQuery = `
      *[_type == "post"] | order(publishedAt desc)[4..11]{
        title,
        description,
        mainImage,
        slug
      }
    `;

    client
      .fetch(OtherBlogQuery)
      .then((data: Post[]) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full flex flex-col items-center mt-12 sm:mt-16 lg:mt-20">
      <div className="w-full max-w-[1000px] px-6 sm:px-5 lg:px-6">
        <h2 className="font-bold capitalize text-xl text-black-100 dark:text-white sm:text-2xl lg:text-3xl mb-4 sm:mb-5 lg:mb-6 text-center">
          Recent Posts
        </h2>

        <Link
          href="/categories/all"
          className="text-blue-500 hover:underline mb-5 block text-center text-base sm:text-lg"
        >
          View All Categories
        </Link>


        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {posts.map((post) =>
            post && post.mainImage && post.slug ? (
              <motion.div
                key={post.slug.current}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden w-full mx-auto max-w-[70%] sm:max-w-sm"
              >
                {/* Post Image */}
                <Link href={`/post/${post.slug.current}`} className="relative block">
                  <div className="relative w-full h-32 sm:h-40 lg:h-48">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title || "Featured Blog"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-xl"
                    />
                  </div>
                </Link>

                {/* Post Tag */}
                <div className="p-2">
                  <Tag />
                </div>

                {/* Post Details */}
                <div className="p-2">
                  <Link href={`/post/${post.slug.current}`}>
                  <h3 
                      className="inline-block text-black text-[16px] sm:text-[18px] font-semibold 
                      bg-gradient-to-r from-blue-300 to-blue-500 bg-[length:0%_3px] hover:bg-[length:75%_3px] 
                      bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-in-out"
                    >
                      {post.title}
                    </h3>
                  </Link>
                </div>
              </motion.div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
