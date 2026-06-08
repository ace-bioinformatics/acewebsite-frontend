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
      description: 'Recommended: 1200 × 675px (16:9 ratio), max 2MB. For logos/graphics, use PNG with transparent background. Shown in the hero section on the project detail page and on the project listing card.',
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
    // NOTE: Previously this was a single-value string field named `thematicArea`.
    // It was changed to an array to allow a project to span multiple thematic areas.
    // Existing documents with the old `thematicArea` field will need to be re-saved
    // in Sanity Studio to populate `thematicAreas`, or migrated via a Sanity dataset export/import.
    defineField({
      name: 'thematicAreas',
      title: 'Thematic Areas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          {title: 'AI', value: 'ai'},
          {title: 'AMR', value: 'amr'},
          {title: 'Human Genomics & Cancer', value: 'human_genomics_cancer'},
          {title: 'Malaria', value: 'malaria'},
          {title: 'Visualization', value: 'visualization'},
        ],
      },
      description: 'Select all thematic areas this project belongs to.',
    }),
    defineField({
      name: 'funders',
      title: 'Funders',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'funder'}]}],
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