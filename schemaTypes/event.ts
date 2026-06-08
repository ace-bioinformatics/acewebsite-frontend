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
      name: 'gallery',
      title: 'Event Gallery',
      type: 'array',
      description: 'Photos from this event — upload as many as you like',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
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