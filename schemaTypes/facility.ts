import {defineField, defineType} from 'sanity'

export const facilityType = defineType({
  name: 'facility',
  title: 'Facility',
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
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Computing', value: 'computing'},
          {title: 'Learning', value: 'learning'},
          {title: 'VR', value: 'vr'},
        ],
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})