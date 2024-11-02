
import {AddUserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const testimonialType = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    icon: AddUserIcon,
    fields : [

        defineField({
            name:'name',
            title:'Name',
            type: 'string'
        }),

        defineField({
            name:'company',
            title:'Company',
            type: 'string'
        }),

        defineField({
            name:'imgurl',
            title:'ImgUrl',
            type: 'image',
            options: {
                hotspot: true,
              }
        }),
        defineField({
            name:'feedback',
            title:'Feedback',
            type:'string'
        })

    ]
})

export default testimonialType;