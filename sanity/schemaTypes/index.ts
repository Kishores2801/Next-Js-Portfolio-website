import { type SchemaTypeDefinition } from 'sanity'


import { projectType } from './projectType'
import { skillsType } from './skillsType'

import { ExperienceType } from './ExperienceType'


import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { blockContentType } from './blockContentType'
import {testimonialType} from './testimonialType'
import packagesTypes from './packagesTypes'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ 
          ExperienceType,
          projectType,
          skillsType,
          categoryType,
          packagesTypes,

          blockContentType,  postType, authorType,
          testimonialType
          

        ], 
}
