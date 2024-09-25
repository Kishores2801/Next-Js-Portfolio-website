import { ProjectsIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const workType = defineType({
  name: 'works',
  title: 'Works',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'projectLink',
      title: 'Project Link',
      type: 'string',
    }),
    defineField({
      name: 'GithubLink',
      title: 'Github Link',
      type: 'string',
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

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),


  ],
});

export default workType;
