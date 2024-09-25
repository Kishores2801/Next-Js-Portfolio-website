import {CalendarIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'


export const experienceType = defineType({
    name: 'experiences',
    title: 'Experiences',
    type: 'document',
    icon: CalendarIcon,
    fields: [
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
          }),
          defineField({
            name: 'works',
            title: 'Works',
            type: 'array',
            of: [{type: 'workExperience'}]
          }),

          defineField({
            name : 'showexperience',
            title: 'Show Experience',
            type: 'boolean',
            description: 'Check to Show the field'

          }),
    ],})

    export default experienceType;