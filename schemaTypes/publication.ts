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
      type: 'date',
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Journal', value: 'journal'},
          {title: 'Book', value: 'book'},
          {title: 'Conference', value: 'conference'},
        ],
      },
    }),
    defineField({
      name: 'doi',
      type: 'url',
    }),
    defineField({
      name: 'thematicArea',
      title: 'Thematic Area',
      type: 'string',
      options: {
        list: [
          {title: 'AI', value: 'ai'},
          {title: 'AMR (Antimicrobial Resistance)', value: 'amr'},
          {title: 'Human Genomics & Cancer', value: 'human_genomics_cancer'},
          {title: 'Malaria', value: 'malaria'},
          {title: 'Visualization', value: 'visualization'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'abstract',
      type: 'text',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})