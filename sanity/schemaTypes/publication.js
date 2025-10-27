export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Publication Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1),
      description: 'List of authors (comma-separated or one per entry)'
    },
    {
      name: 'authorReferences',
      title: 'ACE Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}]
        }
      ],
      description: 'Link to internal team member profiles'
    },
    {
      name: 'journal',
      title: 'Journal/Conference Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Publication Year',
      type: 'string',
      validation: Rule => Rule.required().regex(/^\d{4}$/, {
        name: 'year',
        invert: false
      })
    },
    {
      name: 'volume',
      title: 'Volume',
      type: 'string'
    },
    {
      name: 'issue',
      title: 'Issue',
      type: 'string'
    },
    {
      name: 'pages',
      title: 'Pages',
      type: 'string',
      placeholder: 'e.g., 123-145'
    },
    {
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier'
    },
    {
      name: 'url',
      title: 'Publication URL',
      type: 'url',
      description: 'Direct link to the publication'
    },
    {
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 8
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Journal Article', value: 'journal'},
          {title: 'Conference Paper', value: 'conference'},
          {title: 'Book Chapter', value: 'book-chapter'},
          {title: 'Technical Report', value: 'report'},
          {title: 'Thesis', value: 'thesis'},
          {title: 'Preprint', value: 'preprint'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publicationType',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          {title: 'Peer-Reviewed', value: 'peer-reviewed'},
          {title: 'Non Peer-Reviewed', value: 'non-peer-reviewed'},
          {title: 'Under Review', value: 'under-review'}
        ]
      }
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'researchArea',
      title: 'Research Area',
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
      }
    },
    {
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Link to research project if applicable'
    },
    {
      name: 'citationCount',
      title: 'Citation Count',
      type: 'number',
      description: 'Number of citations (if tracked)'
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'string'
    },
    {
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      description: 'For book chapters'
    },
    {
      name: 'featured',
      title: 'Featured Publication',
      type: 'boolean',
      description: 'Display prominently on publications page',
      initialValue: false
    },
    {
      name: 'openAccess',
      title: 'Open Access',
      type: 'boolean',
      description: 'Is this publication openly accessible?',
      initialValue: false
    },
    {
      name: 'pdfUrl',
      title: 'PDF URL',
      type: 'url',
      description: 'Direct link to PDF (if available)'
    }
  ],
  orderings: [
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [
        {field: 'year', direction: 'desc'}
      ]
    },
    {
      title: 'Year (Oldest First)',
      name: 'yearAsc',
      by: [
        {field: 'year', direction: 'asc'}
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
      authors: 'authors',
      year: 'year',
      journal: 'journal'
    },
    prepare(selection) {
      const {title, authors, year, journal} = selection
      const authorStr = authors ? authors.slice(0, 2).join(', ') + (authors.length > 2 ? ' et al.' : '') : 'No authors'
      return {
        title: title,
        subtitle: `${authorStr} (${year}) • ${journal}`
      }
    }
  }
}
