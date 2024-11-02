// schema for Packages
import { MasterDetailIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const packagesTypes = defineType({
  name: 'Packages',
  title: 'Packages',
  type: 'document',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of the Packages',
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
      name: 'skill',
      title: 'Skill',
      description: 'Select a related skill for this package',
      type: 'reference',
      to: [{ type: 'Skills' }], // Reference to Skills schema
      options: {
        disableNew: true, // Disable adding new Skills from within Packages to keep it a dropdown
      },
    }),
  ],
});

export default packagesTypes;
