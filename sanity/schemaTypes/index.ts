import { type SchemaTypeDefinition } from 'sanity'
import { aboutType } from './aboutType'
import { workExperienceType } from './workExperienceType'
import { workType } from './workType'
import { skillsType } from './skillsType'
import { experienceType } from './experienceType'
import { testimonialType } from './testimonialType'
import { contactType } from './contactType'
import {badgesType} from './badgesType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { blockContentType } from './blockContentType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutType, 
          workExperienceType,
          experienceType,
          workType,
          skillsType,
          testimonialType,
          // badgesType,
          contactType,
          blockContentType, categoryType, postType, authorType
          

        ], 
}
