
import { groq } from 'next-sanity';
import { Post } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import BlogDetails from '@/components/blogs/BlogDetails';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Tag from '@/components/Elements/Tag';
import { RichtextComponents } from '@/components/RichtextComponents';
import { PortableText } from 'next-sanity';
import siteMetaData from '@/utils/siteMetaData';
import { Suspense } from 'react';
import Header from '@/components/Header/Header';

// TypeScript Props
type Props = {
  params: { slug: string };
};

// Helper function for type safety
function isPost(post: Post | null): post is Post {
  return post !== null;
}

// Generate metadata dynamically
export async function generateMetadata({ params: { slug } }: Props) {
  const BlogQuery = groq`
    *[_type == 'post' && slug.current == $slug][0]{
      title,
      description,
      mainImage,
      publishedAt
    }
  `;

  const post = await client.fetch(BlogQuery, { slug });

  if (!isPost(post)) {
    return { title: 'Post not found' };
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : '';

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: siteMetaData.siteUrl + `/post/${slug}`,
      type: 'article',
      siteName: siteMetaData.title,
      publishedTime: post.publishedAt,
      locale: 'en_US',
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

// Main blog page component
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

  try {
    const post: Post | null = await client.fetch(BlogQuery, { slug });

    if (!isPost(post)) return <p>Post not found</p>;

    const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : '';

    return (
      <div className="relative mt-0 bg-gray-200 dark:bg-black-100 dark:bg-grid-white/[0.035] bg-grid-black/[0.018] text-black dark:text-white flex flex-col overflow-x-hidden z-0">
        <Header />

        <article className="mt-24 flex flex-col">
          <div className="w-full mb-8 p-4 sm:p-6 lg:p-10">
            <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 bg-black/40">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold capitalize text-white">
                  {post.title}
                </h1>
                <p className="mt-2 sm:mt-4 italic px-2 sm:px-8 font-serif text-sm sm:text-base md:text-lg text-white hidden sm:block">
                  {post.description}
                </p>
                <div className="mt-4">
                  <Tag />
                </div>
              </div>

              {post.mainImage ? (
                <Image
                  src={imageUrl}
                  alt={post.title || 'Featured Blog'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={imageUrl}
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                  <p>No image available</p>
                </div>
              )}
            </div>

            <div className="px-4 sm:px-6 md:px-8 lg:px-16 mt-8">
              <Suspense fallback={<div>Loading blog details...</div>}>
                <BlogDetails params={{ slug }} />
              </Suspense>
            </div>

            {post.body && (
              <div className="px-4 sm:px-6 md:px-8 lg:px-16 mb-8">
                <PortableText value={post.body ?? []} components={RichtextComponents} />
              </div>
            )}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return <p>Error loading post. Please try again later.</p>;
  }
}
