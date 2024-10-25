// ./src/sanity/lib/queries.ts


import { defineQuery } from "next-sanity";

import { groq } from 'next-sanity';

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`);




export const WORKS_QUERY = groq`
  *[_type == "works"]{
    _id,
    title,
    summary,
    "imgUrl": image.asset->url,
    projectLink,
    githubLink,
    tags,
    technologies[]->{
      title
    }
  }
`;
