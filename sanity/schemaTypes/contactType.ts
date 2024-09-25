import {EnvelopeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const contactType = defineType({
    name: 'contact',
    title: 'Contact',
    type: 'document',
    icon: EnvelopeIcon, 
    fields: [
        defineField({
            name:'name',
            title:'Name',
            type:'string'
        }),
        defineField({
            name:'email',
            title:'Email',
             type:'string'
        }),
        defineField({
            name:'message',
            title:'Message',
            type:'text'
        })
    ]
})