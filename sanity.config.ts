'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { codeInput } from '@sanity/code-input';
import StudioLogo from './components/Studio Header/StudioLogo';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { presentationTool } from 'sanity/presentation';

// Define a type for the Sanity document
interface SanityDocument {
  _type: string;
  slug?: {
    current: string;
  };
}

// Define the locate function to work only for blog posts
const locate = (document: SanityDocument) => {
  if (document._type === 'blog' && document.slug) {
    // Return the blog post URL based on slug
    return `/blog/${document.slug.current}`;
  }

  // If it's not a blog post, return null
  return null;
};

export default defineConfig({
  basePath: '/studio',
  name: "Kishore_Portfolio_Blog_Studio",
  title: "Kishore Portfolio Content Studio",
  studio: {
    components: {
      logo: StudioLogo, // Custom logo component
    },
  },
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      
      previewUrl: {
        origin:
          typeof location === 'undefined'
            ? 'http://localhost:3000'
            : location.origin,
        draftMode: {
          enable: '/api/draft',
          disable: '/api/disable-draft',
        },
      },
    }),
  ],
});
