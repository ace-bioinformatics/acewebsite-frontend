import { defineType, defineField } from 'sanity'

export const funderType = defineType({
  name: 'funder',
  title: 'Funder',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organisation Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Recommended: 400 × 200px, PNG with transparent background, max 500KB.',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the logo for accessibility (e.g. "NIH logo")',
        }),
      ],
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use this to control the display sequence.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
