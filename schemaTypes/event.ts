// sanity/schemas/event.ts
import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Conference', value: 'conference' },
          { title: 'Training', value: 'training' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Networking', value: 'networking' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      description: 'Recommended: 1200 × 675px (16:9 ratio), max 2MB. Used as the event banner and card thumbnail.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum number of attendees',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'isPast',
      title: 'Is Past Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Display this event prominently on the events page',
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Gallery Section Title',
      type: 'string',
      description: 'Optional. Defaults to "Event Gallery" if left blank.',
    }),
    defineField({
      name: 'gallery',
      title: 'Event Gallery',
      type: 'array',
      description: 'Photos from the event. Recommended: JPEG, minimum 1200px wide, max 5MB per image.',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption shown below the image in the lightbox',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
              validation: (Rule) => Rule.required().warning('Alt text is important for accessibility'),
            }),
            defineField({
              name: 'credit',
              title: 'Photo Credit',
              type: 'string',
              description: 'Photographer or source (e.g. "Photo: John Doe")',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'credit',
              media: 'image',
            },
            prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
              return {
                title: title || 'Untitled photo',
                subtitle: subtitle || '',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, date, category } = selection
      return {
        title: title,
        subtitle: `${category} - ${new Date(date).toLocaleDateString()}`,
        media: selection.media,
      }
    },
  },
})