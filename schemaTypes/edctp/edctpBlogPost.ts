import { defineType, defineField } from 'sanity'
import { localeString, localeText, localeBlock } from './_localeHelpers'

export default defineType({
  name: 'edctpBlogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    localeString('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // title is now a locale object — slug generates from the English version
      options: { source: (doc: any) => doc.title?.en },
    }),
    localeText('excerpt', 'Excerpt', 2),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    localeBlock('body', 'Body'),
    defineField({
      name: 'gallery',
      title: 'Photo Album',
      type: 'array',
      description: 'Photos from the event covered in this post, shown as an album below the article. Recommended: JPEG, minimum 1200px wide, max 5MB per image.',
      options: { layout: 'grid' },
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
            localeString('caption', 'Caption', 'Optional caption shown on hover and in the full-screen viewer'),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
              validation: (Rule) => Rule.required().warning('Alt text is important for accessibility'),
            }),
            defineField({ name: 'credit', title: 'Photo Credit', type: 'string' }),
          ],
          preview: {
            select: { title: 'caption.en', subtitle: 'alt', media: 'image' },
            prepare({ title, subtitle, media }) {
              return { title: title || subtitle || 'Photo', media }
            },
          },
        },
      ],
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title.en', media: 'featuredImage' },
    prepare({ title, media }) {
      return { title: title || 'Untitled', media }
    },
  },
})
