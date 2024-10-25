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
    defineField({
      name: 'toolspackages',
      title: 'Tools or Packages',
      type: 'array',
      description: 'List of tools or packages used in the project',
      of: [defineArrayMember({ type: 'string' })], // Array of strings for multiple tools
    }),
  ],
});

export default skillsType;
