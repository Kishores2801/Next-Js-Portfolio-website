'use client';


import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { codeInput } from '@sanity/code-input';
import StudioLogo from './components/Studio Header/StudioLogo';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';



// Define a type for the Sanity document
interface SanityDocument {
  _type: string;
  slug?: {
    current: string;
  };
}

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
    table(),
    
    
   
 
  ],
});
