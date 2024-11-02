// schema for Skills
import { MasterDetailIcon } from '@sanity/icons';
import { defineField, defineType, defineArrayMember } from 'sanity';

export const skillsType = defineType({
  name: 'Skills',
  title: 'Skills',
  type: 'document',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of the skill',
      type: 'string',
    }),
    defineField({
      name: 'progress',
      title: 'Progress',
      type: 'number',
      description: 'Progress of skill from 0 to 100%',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
   
  ],
});

export default skillsType;
