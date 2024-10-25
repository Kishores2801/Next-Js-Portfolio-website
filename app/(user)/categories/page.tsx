"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import hooks
import { client } from "../../../sanity/lib/client";
import { Post, Category } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/components/Header/Header";

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

export default function CategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug"); // Get the slug from query parameters

  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>("all");

  // Fetch Categories - Exclude Null or Undefined Slugs/Titles
  useEffect(() => {
    client
      .fetch<Category[]>(`
        *[_type == "category" && defined(title) && defined(slug.current)]{
          _id,
          title,
          slug
        }
      `)
      .then(setCategories)
      .catch(console.error);
  }, []);

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

  // Apply Filter Based on Slug from Query Params
  useEffect(() => {
    if (slug) {
      setActiveCategory(slug);
      const filtered = posts.filter((post) =>
        post.categories?.some((cat) => cat.slug?.current === slug)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Show all posts if no category is selected
    }
  }, [slug, posts]);

  // Handle Category Clicks and Redirect
  const handleCategoryClick = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
    router.push(categorySlug ? `/categories?slug=${categorySlug}` : `/categories`);
  };

  return (
    <main className="relative dark:bg-black-100 bg-gray-200 dark:bg-grid-white/[0.035] bg-grid-black/[0.018] text-black dark:to-blue-500 flex flex-col overflow-x-hidden z-0">
      <Header />

      <div className="w-full px-2 sm:px-4 py-4 mt-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mt-3 mb-4">
          Categories
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-3 py-1 rounded-full border ${
              activeCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            } hover:bg-blue-400 transition font-semibold`}
          >
            All
          </button>
          {categories.map(({ _id, title, slug }) => (
            <button
              key={_id}
              onClick={() => handleCategoryClick(slug?.current)}
              className={`px-3 py-1 rounded-full border ${
                activeCategory === slug?.current
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } hover:bg-blue-400 transition font-semibold`}
            >
              {title}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
          {filteredPosts.map(({ slug, title, mainImage }) => (
            <div
              key={slug?.current}
              className="bg-gray-200 dark:bg-white rounded-3xl shadow-md overflow-hidden w-[400px] h-[280px] mb-4 mx-auto"
            >
              <div className="relative w-full h-[220px]">
                {mainImage && (
                  <Image
                    src={urlFor(mainImage).url()}
                    alt={title || "Blog"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                )}
              </div>
              <div className="p-2">
                <Link href={`/post/${slug?.current || ""}`}>
                  <h2 className="text-[15px] font-semibold bg-gradient-to-r bg-[length:0px_4px] hover:bg-[length:100%_4px] bg-left-bottom text-black-100 transition-[background-size] duration-500">
                    {title}
                  </h2>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
