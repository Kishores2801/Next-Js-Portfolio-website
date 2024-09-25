import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
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
      name: 'lottieanimation',
      title: 'Lottie Animation',
      type: 'file',
      options: {
        accept: '.json', // Accept only .json files
      },
      validation: (Rule) => Rule.custom((file) => {
        return file && file.asset && file.asset._ref.endsWith('.json')
          ? true
          : 'Only JSON files are allowed for Lottie animations';
      }),
      description: 'Please upload a JSON file for the Lottie animation.',
    }),
  ],
});

export default aboutType;
