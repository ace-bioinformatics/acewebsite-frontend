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
      name: 'funder',
      type: 'string',
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