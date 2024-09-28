'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig, Studio} from 'sanity'
import {structureTool} from 'sanity/structure'
import { codeInput } from '@sanity/code-input';
import StudioLogo from './components/Studio Header/StudioLogo';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  name: 'DataGrid_Content_Studio',
  title: "DataGrid Content Studio",
  
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  studio: {
    components: {
      logo : StudioLogo,
    }
  },
  
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    codeInput(),
    
  ],
})
