import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';


import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: 'previewDrafts', // 'raw' | 'published' | 'previewDrafts' 
});

const builder = imageUrlBuilder(client);

// Type the source to be Sanity's image source

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

