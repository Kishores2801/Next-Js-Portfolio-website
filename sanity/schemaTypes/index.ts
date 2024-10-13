import { type SchemaTypeDefinition } from 'sanity'

import { workExperienceType } from './workExperienceType'
import { workType } from './workType'
import { skillsType } from './skillsType'
import { experienceType } from './experienceType'
import { testimonialType } from './testimonialType'


import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { blockContentType } from './blockContentType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ 
          workExperienceType,
          experienceType,
          workType,
          skillsType,

          blockContentType, categoryType, postType, authorType
          

        ], 
}
