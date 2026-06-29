import { defineType, defineField } from 'sanity'

export const aboutPageSettings = defineType({
  name: 'aboutPageSettings',
  title: 'About Page — Hero Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Hero Carousel Images',
      type: 'array',
      description: 'Add multiple images showcasing ACE — facilities, events, students, campus life. Recommended: 1920×800px, max 2MB each.',
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
      return { title: 'About Page — Hero Carousel' }
    },
  },
})
