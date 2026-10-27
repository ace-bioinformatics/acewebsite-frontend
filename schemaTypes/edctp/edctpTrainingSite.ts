import { defineType, defineField } from 'sanity'
import { localeText } from './_localeHelpers'

export default defineType({
  name: 'edctpTrainingSite',
  title: 'Training Site',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Site Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'institution', title: 'Host Institution', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'latitude', title: 'Latitude', type: 'number', description: 'Exact map pin location. If left blank, the map falls back to the country’s approximate center.' }),
    defineField({ name: 'longitude', title: 'Longitude', type: 'number', description: 'Exact map pin location. If left blank, the map falls back to the country’s approximate center.' }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'image', title: 'Logo / Image', type: 'image', description: 'Site or host institution logo. Shown uncropped on the Training Sites page, the Collaborators page and the map.', options: { hotspot: true } }),
    localeText('description', 'Description', 3),
  ],
})
