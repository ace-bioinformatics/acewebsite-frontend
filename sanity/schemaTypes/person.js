export default {
  name: 'person',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Leadership', value: 'leadership'},
          {title: 'Research', value: 'research'},
          {title: 'Education', value: 'education'},
          {title: 'Technology', value: 'technology'},
          {title: 'Administration', value: 'administration'},
          {title: 'Support', value: 'support'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 8
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'officeLocation',
      title: 'Office Location',
      type: 'string'
    },
    {
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Areas of expertise or specialization'
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Degree',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'year',
              title: 'Year',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'degree',
              subtitle: 'institution'
            }
          }
        }
      ]
    },
    {
      name: 'publications',
      title: 'Selected Publications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of key publications'
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url'
        },
        {
          name: 'googleScholar',
          title: 'Google Scholar',
          type: 'url'
        },
        {
          name: 'researchGate',
          title: 'ResearchGate',
          type: 'url'
        },
        {
          name: 'orcid',
          title: 'ORCID',
          type: 'url'
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in team listing (lower numbers appear first)',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this person',
      initialValue: true
    }
  ],
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
    {
      title: 'Name',
      name: 'name',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      department: 'department',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, subtitle, department, isActive} = selection
      return {
        title: title,
        subtitle: `${subtitle} • ${department || 'No dept'} ${isActive ? '✓' : '✗ Hidden'}`
      }
    }
  }
}
