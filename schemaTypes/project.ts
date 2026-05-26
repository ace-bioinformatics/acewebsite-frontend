import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the image for accessibility' }),
      ],
      description: 'Main image shown on project cards and detail page',
    }),
    defineField({
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Lower number appears first (e.g. 1 = top). Leave empty to sort by date after prioritised items.',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Completed', value: 'completed'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
    }),
    defineField({
      name: 'partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    }),
    defineField({
      name: 'thematicArea',
      title: 'Thematic Area',
      type: 'string',
      options: {
        list: [
          {title: 'AI', value: 'ai'},
          {title: 'AMR', value: 'amr'},
          {title: 'Human Genomics & Cancer', value: 'human_genomics_cancer'},
          {title: 'Malaria', value: 'malaria'},
          {title: 'Visualization', value: 'visualization'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'funders',
      title: 'Funders',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of organizations or agencies funding this project',
    }),
    defineField({
      name: 'pi',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'abstract',
      type: 'text',
    }),
  ],
})