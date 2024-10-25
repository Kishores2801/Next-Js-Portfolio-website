// This Schema for is for work experience

import {CaseIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const ExperienceType = defineType({
    name: 'Experience',
    title: 'Experience',
    type: 'document',
    icon: CaseIcon,
    fields: [
        {
            name: "jobTitle",
            title: "Job Title",
            type:  "string"
        },

        {
            name : "companyImage",
            title: "Company Image",
            type: "image",
            options: {
                hotspot: true,
              }
        },
        {
            name: "company",
            title: "Company",
            type: "string"
        },
        {
            name: "location",
            title: "Location",
            type: "string"
        },

        {
            name: "dateStarted",
            title: "Date Started",
            type: "date"
        },
        {
            name: "dateEnded",
            title: "Date Ended",
            type: "date"
        },
        {
            name: "isCurrentlyWorkingHere",
            title: "Is Currently Working Here",
            type: "boolean"
        },

        {
            name: "technologies",
            title: "Technologies",
            type: "array",
            of: [{type: "reference", to: {type: "Skills"}}]
        },

        {
            name: 'points',
            title: 'Points',
            type: 'array',
            of: [{type: 'string'}]
        },
    ],
})

export default ExperienceType;