import { type SchemaTypeDefinition } from 'sanity'


import { projectType } from './projectType'
import { skillsType } from './skillsType'

import { ExperienceType } from './ExperienceType'


import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { blockContentType } from './blockContentType'
import {testimonialType} from './testimonialType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ 
          ExperienceType,
          projectType,
          skillsType,
          categoryType,

          blockContentType,  postType, authorType,
          testimonialType
          

        ], 
}
