// ./app/(user)/post/[slug]/page.tsx

import { groq } from 'next-sanity';
import { Post } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import BlogDetails from '@/components/blogs/BlogDetails';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import Tag from '@/components/Elements/Tag';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugsQuery = groq`*[_type == 'post' && defined(slug.current)]{ 'slug': slug.current }`;
  const slugs = await client.fetch<{ slug: string }[]>(slugsQuery);

  return slugs.map((post) => ({ slug: post.slug }));
}

export default async function BlogPage({ params: { slug } }: Props) {
  const BlogQuery = groq`
    *[_type == 'post' && slug.current == $slug][0]{
      title,
      description,
      body,
      mainImage,
      author->,
      categories[]->
    }
  `;

  const post: Post | null = await client.fetch(BlogQuery, { slug });

  if (!post) return <p>Post not found</p>;

  return (
    <div className="relative dark:bg-black-100 bg-gray-200 text-black dark:text-white flex flex-col overflow-x-hidden">
      <article>
        <div className="w-full mb-8 text-center">
          <div className="relative w-full h-[80vh] overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl font-semibold capitalize text-white">{post.title}</h1>
              <p className="mt-4 italic">{post.description}</p>
              <Tag />
            </div>
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title || 'Featured Blog'}
                fill
                placeholder="blur"
                blurDataURL={urlFor(post.mainImage).url()}
                className="object-cover"
                priority
              />
            )}
          </div>
          <div className="px-6 sm:px-10 md:px-20 lg:px-32 mt-8">
            <BlogDetails params={{ slug }} />
            {/* <PortableText content={post.body} /> */}
          </div>
        </div>
      </article>
    </div>
  );
}
