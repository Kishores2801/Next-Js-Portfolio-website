// This Schema for is for work experience

import {CaseIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const workExperienceType = defineType({
    name: 'workExperience',
    title: 'Work Experience',
    type: 'document',
    icon: CaseIcon,
    fields: [
        defineField({
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            validation: Rule => Rule.required().error('Company Name is required')
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
            validation: Rule => Rule.required().error('Position is required')
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            validation: Rule => Rule.required().error('Start Date is required')
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            validation: Rule => Rule.min(Rule.valueOfField('startDate')).error('End Date must be after Start Date')
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        })
    ],
    orderings: [
        {
            title: 'Start Date, Newest',
            name: 'startDateDesc',
            by: [{field: 'startDate', direction: 'desc'}]
        },
        {
            title: 'Start Date, Oldest',
            name: 'startDateAsc',
            by: [{field: 'startDate', direction: 'asc'}]
        }
    ]
})

export default workExperienceType;