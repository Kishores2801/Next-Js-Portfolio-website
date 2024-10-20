// ./sanity/lib/client.ts

import type { SanityClient } from 'next-sanity'
import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from '../env'

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster read access in production
  perspective: 'published',
});

export default client;