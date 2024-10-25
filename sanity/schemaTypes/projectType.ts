import { ProjectsIcon } from '@sanity/icons';
import { defineField, defineArrayMember, defineType } from 'sanity';

export const projectType = defineType({
  name: 'works',
  title: 'Works',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of the project',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',   
      description: 'Summary of the project',
      type: 'text',
    }),
    
    defineField({
      name: 'projectLink',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'githubLink',
      title: 'Github Link',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tag',
          title: 'Tag',
          type: 'string',
          options: {
            list: [
              { title: 'Web App', value: 'Web App' },
              { title: 'Data Visualization', value: 'Data Visualization' },
              { title: 'Machine Learning & AI', value: 'Machine Learning & AI' },
              { title: 'Other', value: 'Other' },
            ],
          },
        }),
      ],
    }),
  ],
});
