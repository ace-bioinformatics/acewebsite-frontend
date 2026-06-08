import {defineField, defineType} from 'sanity'

export const academicProgramType = defineType({
  name: 'academicProgram',
  title: 'Academic Program',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'MSc', value: 'msc'},
          {title: 'PhD', value: 'phd'},
          {title: 'Short Course', value: 'short'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      type: 'string',
    }),
    defineField({
      name: 'eligibility',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'requirements',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Program Image',
      type: 'image',
      description: 'Recommended: 1200 × 675px (16:9 ratio), max 2MB. Used as the program card and detail page header image.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'researchActivities',
      title: 'Research Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'researchActivity',
          title: 'Research Activity',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'array',
              of: [{type: 'block'}],
            }),
            defineField({
              name: 'photos',
              title: 'Photos',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title}
            },
          },
        },
      ],
    }),
  ],
})