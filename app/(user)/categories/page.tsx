"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../../sanity/lib/client";
import { Post, Category } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/components/Header/Header";
import { useSearchParams } from "next/navigation"; // New import

type Props = {};

export default function Categories({}: Props) {
  const searchParams = useSearchParams(); // Use useSearchParams to access query params
  const slug = searchParams.get("slug"); // Get the 'slug' from query params

  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>("all");

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{ _id, title, slug }`;
      const result = await client.fetch(query);
      setCategories(result);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `
        *[_type == "post"]{
          title,
          mainImage,
          slug,
          "categories": categories[]->{
            _id, title, slug
          }
        }
      `;
      const result = await client.fetch(query);
      setPosts(result);
      setFilteredPosts(result); // Show all posts by default
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (slug) {
      setActiveCategory(slug);
      const filtered = posts.filter((post) =>
        post.categories.some((cat) => cat.slug.current === slug)
      );
      setFilteredPosts(filtered);
    }
  }, [slug, posts]);

  const handleCategoryClick = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.categories.some((cat) => cat._id === categoryId)
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="relative dark:bg-black-100 bg-gray-200 dark:bg-grid-white/[0.035] bg-grid-black/[0.018] text-black dark:text-white flex flex-col snap-y snap-mandatory h-screen overflow-x-hidden z-0">
      <Header />

      <div className="w-full px-4 sm:px-5 py-6 mt-24">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-w">
          Categories
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => handleCategoryClick("all")}
            className={`px-3 py-1.5 rounded-full border ${
              activeCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            } hover:bg-blue-400 hover:text-white transition`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category.slug.current)}
              className={`px-3 py-1.5 rounded-full border ${
                activeCategory === category.slug.current
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } hover:bg-blue-400 hover:text-white transition`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {filteredPosts.map((post) => (
            <div
              key={post.slug.current}
              className="dark:bg-white bg-gray-300 dark:text-white-100 rounded-xl shadow-md overflow-hidden w-[80%] mx-auto"
            >
              <div className="relative w-full h-60">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-3">
                <Link href={`/post/${post.slug.current}`}>
                  <h2 className="text-[18px] bg-gradient-to-r text-black-100 font-semibold from-blue-300 to-blue-500 bg-[length:0px_6px] hover:bg-[length:80%_3px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                    {post.title}
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
