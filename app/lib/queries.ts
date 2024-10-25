// ./src/sanity/lib/queries.ts

import { defineQuery } from "next-sanity";

// Query to fetch all posts with essential details
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->name,
    categories[]->title
  }
`);

// Query to fetch a single post by slug with full details
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    mainImage,
    publishedAt,
    "author": author->{name, bio, image},
    categories[]->{
      title,
      description
    }
  }
`);
