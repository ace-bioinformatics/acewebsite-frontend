import {defineField, defineType} from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'date',
      description: 'The date this publication was published (e.g. in a journal or conference). Used to sort publications chronologically.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Legacy Date (deprecated)',
      type: 'date',
      description: 'Superseded by "Publication Date" (publishedAt). Kept for backwards compatibility.',
      hidden: true,
    }),
    defineField({
      name: 'type',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          {title: 'Journal Article', value: 'journal'},
          {title: 'Book', value: 'book'},
          {title: 'Conference Paper', value: 'conference'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publisherName',
      title: 'Publisher Name',
      type: 'string',
      description: 'The name of the journal publisher, book publishing house, or conference organizer (e.g. "Oxford University Press", "IEEE", "Springer").',
    }),
    defineField({
      name: 'doi',
      type: 'url',
    }),
    defineField({
      name: 'thematicAreas',
      title: 'Thematic Areas',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'AI', value: 'ai'},
          {title: 'AMR', value: 'amr'},
          {title: 'Human Genomics & Cancer', value: 'human_genomics_cancer'},
          {title: 'Malaria', value: 'malaria'},
          {title: 'Visualization', value: 'visualization'},
        ],
      },
    }),
    defineField({
      name: 'abstract',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      description: 'Recommended: 800 × 450px (16:9 ratio), max 1MB. Used as the publication card thumbnail.',
      options: { hotspot: true },
    }),
  ],
})