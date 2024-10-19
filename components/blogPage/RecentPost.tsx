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
    <section className="w-full mt-8 flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold capitalize text-2xl sm:text-3xl mb-4 text-center">
          Recent Posts
        </h2>

        <Link
          href="/categories"
          className="text-blue-500 hover:underline mb-6 block text-center"
        >
          View All Categories
        </Link>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
          {posts.map((post) =>
            post && post.mainImage && post.slug ? (
              <motion.div
                key={post.slug.current} // Ensure unique keys for React mapping
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* Post Image */}
                <Link href={`/post/${post.slug.current}`} className="relative block">
                  <div className="relative w-full h-40 sm:h-60">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title || "Featured Blog"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl"
                    />
                  </div>
                </Link>

                {/* Post Tag */}
                <div className="p-3">
                  <Tag />
                </div>

                {/* Post Details */}
                <div className="p-3">
                  <Link href={`/post/${post.slug.current}`}>
                    <h3 className="text-black text-[18px] font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-[length:0px_3px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
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
