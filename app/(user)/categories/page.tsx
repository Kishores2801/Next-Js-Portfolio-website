"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../../sanity/lib/client";
import { Post, Category } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/components/Header/Header";
import { useSearchParams } from "next/navigation";

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };  // Ensure slug is defined like this
}

export default function Categories() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>("all");



  // Fetch Posts
  useEffect(() => {
    client
      .fetch<Post[]>(`
        *[_type == "post"]{
          title, 
          mainImage, 
          slug,
          categories[]->{ _id, title, slug }
        }
      `)
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch(console.error);
  }, []);

  // Handle Slug Changes
  useEffect(() => {
    if (slug) {
      setActiveCategory(slug);
      const filtered = posts.filter((post) =>
        post.categories?.some((cat) => cat.slug?.current === slug)
      );
      setFilteredPosts(filtered);
    }
  }, [slug, posts]);

  // Handle Category Clicks
  const handleCategoryClick = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    setFilteredPosts(
      categoryId === "all"
        ? posts
        : posts.filter((post) =>
            post.categories?.some((cat) => cat._id === categoryId)
          )
    );
  };

  return (
    <div className="relative dark:bg-black-100 bg-gray-200 text-black dark:text-white flex flex-col h-screen overflow-x-hidden">
      <Header />

      <div className="w-full px-4 sm:px-5 py-6 mt-24">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Categories
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => handleCategoryClick("all")}
            className={`px-3 py-1.5 rounded-full border ${
              activeCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            } hover:bg-blue-400 transition`}
          >
            All
          </button>
          {categories.map(({ _id, title, slug }) => (
            <button
              key={_id}
              onClick={() => handleCategoryClick(slug?.current || "")}
              className={`px-3 py-1.5 rounded-full border ${
                activeCategory === slug?.current
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } hover:bg-blue-400 transition`}
            >
              {title}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {filteredPosts.map(({ slug, title, mainImage }) => (
            <div
              key={slug?.current}
              className="bg-gray-200 dark:bg-white rounded-xl shadow-md overflow-hidden w-full mx-auto max-w-sm"
            >
              <div className="relative w-full h-[150px]">
                {mainImage && (
                  <Image
                    src={urlFor(mainImage).url()}
                    alt={title || "Blog"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                  />
                )}
              </div>
              <div className="p-3">
                <Link href={`/post/${slug?.current || ""}`}>
                  <h2 className="text-[18px] font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-[length:0px_6px] hover:bg-[length:80%_3px] bg-left-bottom transition-[background-size] duration-500">
                    {title}
                  </h2>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
