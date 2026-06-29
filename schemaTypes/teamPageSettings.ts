import { defineType, defineField } from 'sanity'

export const teamPageSettings = defineType({
  name: 'teamPageSettings',
  title: 'Our Staff — Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Recommended: 1920×800px, max 2MB. Shown behind the page title on the Our Staff page.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Our Staff — Page Settings' }
    },
  },
})
