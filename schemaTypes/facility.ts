import {defineField, defineType} from 'sanity'

export const facilityType = defineType({
  name: 'facility',
  title: 'Facility',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Facility Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Facility Type',
      type: 'string',
      options: {
        list: [
          { title: 'HPC / Compute', value: 'computing' },
          { title: 'Tele-Learning', value: 'learning' },
          { title: 'Visualization / VR', value: 'vr' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the Facilities overview card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Recommended: 1920 × 1080px (16:9 ratio), max 3MB. Avoid images with heavy red tones — the page uses a dark overlay for text legibility.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      description: 'Recommended: 1200 × 675px (16:9 ratio) per image, max 2MB each.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Main Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        },
      ],
      description: 'Rich-text description and narrative for the detail page',
    }),
    defineField({
      name: 'specs',
      title: 'Specifications / Capacity',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      description: 'Key specs shown in the stats grid (e.g. "CPU Cores" / "320 cores")',
    }),
    defineField({
      name: 'potentialUses',
      title: 'Potential Uses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-list of example use-cases or applications',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first on the Facilities overview page',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'type' },
  },
})
