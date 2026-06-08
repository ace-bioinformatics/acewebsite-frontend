import {defineField, defineType} from 'sanity'

export const partnerType = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Funder', value: 'funder'},
          {title: 'Collaborator', value: 'collaborator'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Partner organisation\'s website (optional)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Recommended: PNG with transparent background, at least 300 × 150px, max 500KB. Square or landscape logos work best.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
  ],
})