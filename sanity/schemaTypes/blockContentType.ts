import { defineType, defineArrayMember } from 'sanity';

import { table } from '@sanity/table';

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // Block Content with Text Styles, Lists, and Marks
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike-through', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }).error('Please enter a valid URL'),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Open in new tab',
              },
            ],
          },
        ],
      },
    }),

    // Image Block with Alt Text Validation
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) =>
            Rule.required().error('Alternative text is required for accessibility.'),
        },
      ],
    }),

    // Code Block with Language Options
    defineArrayMember({
      type: 'code',
      title: 'Code Block',
      options: {
        theme: 'monokai',
      },
    }),

    // Table Block (using @sanity/table plugin)
    defineArrayMember({
      type: 'table',
      title: 'Table',
    }),
    


  ],
});
