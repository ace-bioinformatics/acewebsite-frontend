import { defineType, defineField } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Carousel Slides',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline or description',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'VR Lab', value: 'vr' },
          { title: 'HPC Cluster', value: 'hpc' },
          { title: 'Research', value: 'research' },
          { title: 'Training & Learning', value: 'training' },
          { title: 'Announcements', value: 'announcement' },
          { title: 'Partnerships', value: 'partnership' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'URL or path (e.g., /vr-lab, /hpc, /research)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which slides appear (lower numbers first)',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this slide in the carousel',
      initialValue: true,
      }),
      ],
      orderings: [
        {
          title: 'Order',
          name: 'order',
          by: [{ field: 'order', direction: 'asc' }],
        },
      ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'category',
        media: 'image',
        order: 'order',
      },
      prepare(selection) {
        const { title, subtitle, media, order } = selection
        return {
          title: `${order}. ${title}`,
          subtitle: subtitle,
          media: media,
        }
      },
  },
})