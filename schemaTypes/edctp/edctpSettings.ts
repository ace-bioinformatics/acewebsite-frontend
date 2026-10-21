import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'edctpSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Site-wide identity and contact details. Page content lives in the per-page documents (Home Page, About Page, …).',
  fieldsets: [
    {
      name: 'programLogo',
      title: 'Program Logo',
      description: 'Upload two versions: one for the white header and a light/white one for the blue footer.',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({ name: 'programName', title: 'Program Name', type: 'string', initialValue: 'IDM-Africa' }),
    defineField({
      name: 'logo',
      title: 'Header logo (full colour)',
      type: 'image',
      fieldset: 'programLogo',
      description: 'Shown in the top navigation bar, which has a white background. Use the full-color/dark logo. Recommended: 400×160px PNG, transparent background.',
    }),
    defineField({
      name: 'logoLight',
      title: 'Footer logo (light / white version)',
      type: 'image',
      fieldset: 'programLogo',
      description: 'Shown in the footer, which has a dark navy background — use a white/light-colored version of the logo. Falls back to the header logo if left empty. Recommended: 400×160px PNG, transparent background.',
    }),
    defineField({
      name: 'edctpAcknowledgementLogo',
      title: 'EDCTP Acknowledgement Logo',
      type: 'image',
      description: 'The official EDCTP logo, shown in the footer as a funding acknowledgement.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '0312 211 444',
    }),
    defineField({
      name: 'idiSocials',
      title: 'IDI Uganda Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
