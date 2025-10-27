export default {
  name: 'project',
  title: 'Research Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for listings',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 8,
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Data Science', value: 'data-science'},
          {title: 'Climate Research', value: 'climate'},
          {title: 'Public Health', value: 'health'},
          {title: 'Agriculture', value: 'agriculture'},
          {title: 'Bioinformatics', value: 'bioinformatics'},
          {title: 'HPC Development', value: 'hpc'},
          {title: 'AI & Machine Learning', value: 'ai-ml'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Completed', value: 'completed'},
          {title: 'On Hold', value: 'on-hold'},
          {title: 'Planning', value: 'planning'}
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'active'
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty for ongoing projects'
    },
    {
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}]
        }
      ],
      description: 'Reference to team member profiles'
    },
    {
      name: 'teamText',
      title: 'Additional Team Members',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Team members not in the system'
    },
    {
      name: 'objectives',
      title: 'Objectives',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key objectives of the project'
    },
    {
      name: 'methodology',
      title: 'Methodology',
      type: 'text',
      rows: 5
    },
    {
      name: 'outcomes',
      title: 'Outcomes/Results',
      type: 'text',
      rows: 5
    },
    {
      name: 'publications',
      title: 'Related Publications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'publication'}]
        }
      ]
    },
    {
      name: 'funding',
      title: 'Funding Information',
      type: 'object',
      fields: [
        {
          name: 'source',
          title: 'Funding Source',
          type: 'string'
        },
        {
          name: 'amount',
          title: 'Amount',
          type: 'string'
        },
        {
          name: 'grantNumber',
          title: 'Grant Number',
          type: 'string'
        }
      ]
    },
    {
      name: 'partners',
      title: 'Partner Organizations',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'website',
      title: 'Project Website',
      type: 'url'
    },
    {
      name: 'githubRepo',
      title: 'GitHub Repository',
      type: 'url'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Display this project prominently',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Start Date (Newest)',
      name: 'startDateDesc',
      by: [
        {field: 'startDate', direction: 'desc'}
      ]
    },
    {
      title: 'Title',
      name: 'title',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      status: 'status',
      featured: 'featured'
    },
    prepare(selection) {
      const {title, category, status, featured} = selection
      return {
        title: title,
        subtitle: `${category || 'No category'} • ${status} ${featured ? '⭐' : ''}`
      }
    }
  }
}
