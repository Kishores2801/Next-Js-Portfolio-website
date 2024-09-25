import { MasterDetailIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const badgesType = defineType({
  name: 'badges',
  title: 'Badges',
  type: 'document',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'badgeName',
      title: 'Badge Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'imgurl',
      title: 'Image URL',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'Certification URL',
      type: 'url',
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'expirationDate',
      title: 'Expiration Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Priority order for displaying badges.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this badge as featured.',
    }),
  ],
});

export default badgesType;
