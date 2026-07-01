import { defineType, defineField } from 'sanity'

export const eventsPageSettings = defineType({
  name: 'eventsPageSettings',
  title: 'Events Page — Hero Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Hero Carousel Images',
      type: 'array',
      description: 'Add multiple images for the Events page hero — past events, workshops, conferences. Recommended: 1920×800px, max 2MB each.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'caption', title: 'Caption (optional)', type: 'string' }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Events Page — Hero Carousel' }
    },
  },
})
