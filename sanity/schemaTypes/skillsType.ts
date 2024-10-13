// schema for Skills
import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const skillsType = defineType({
    name: 'Skills',
    title: 'Skills',
    type: 'document',
    icon: MasterDetailIcon,
    fields:[
        {
            name: 'name',
            title: 'Name',
            type: 'string',

        },

        {
            name : 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                hotspot: true,
              },
        },

        {
            name: "docid",
            title: "ID",
            type: "number",
            initialValue: () => {
                let d = new Date();
                return d.getTime();
              },
        },
        {
            name : 'showSkills',
            title: 'Show Skills',
            type: 'boolean',
            description: 'Check to Show the field'
        }
    
    ],

})

export default skillsType;