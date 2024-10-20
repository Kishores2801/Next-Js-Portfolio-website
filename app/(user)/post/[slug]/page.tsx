// ./app/(user)/post/[slug]/page.tsx

import { groq } from 'next-sanity';
import { Post } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import BlogDetails from '@/components/blogs/BlogDetails';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Tag from '@/components/Elements/Tag';
import { RichtextComponents } from '@/components/RichtextComponents';
import { PortableText } from 'next-sanity';

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
    <div className="relative mt-16 dark:bg-black-100 bg-gray-200 dark:bg-grid-white/[0.035] bg-grid-black/[0.018] text-black flex flex-col overflow-x-hidden z-0">
      <article>
        <div className="w-full mb-8 p-4 sm:p-6 lg:p-10">
          {/* Responsive Image Container */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold capitalize text-white">
                {post.title}
              </h1>
              <p className="mt-4 italic px-4 sm:px-10 md:px-20 font-serif text-white">
                {post.description}
              </p>
              <div className="mt-4">
                <Tag />
              </div>
            </div>

            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title || 'Featured Blog'}
                fill
                placeholder="blur"
                blurDataURL={urlFor(post.mainImage).url()}
                className="object-cover rounded"
                priority
              />
            )}
          </div>

          {/* Blog Content */}
          <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 mt-8 mb-8">
            <BlogDetails params={{ slug }} />
          </div>

          {/* Blog Body */}
          {post.body && (
            <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 mb-8">
              <PortableText value={post.body ?? []} components={RichtextComponents} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
