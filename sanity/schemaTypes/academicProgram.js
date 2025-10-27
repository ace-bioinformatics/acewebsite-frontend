export default {
  name: 'academicProgram',
  title: 'Academic Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Program Title',
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
      name: 'type',
      title: 'Program Type',
      type: 'string',
      options: {
        list: [
          {title: 'MSc Program', value: 'msc'},
          {title: 'PhD Program', value: 'phd'},
          {title: 'Short Course', value: 'short-course'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Internship', value: 'internship'},
          {title: 'Certificate', value: 'certificate'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'level',
      title: 'Academic Level',
      type: 'string',
      options: {
        list: [
          {title: 'Undergraduate', value: 'undergraduate'},
          {title: 'Graduate', value: 'graduate'},
          {title: 'Postgraduate', value: 'postgraduate'},
          {title: 'Professional Development', value: 'professional'}
        ]
      }
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 8,
      validation: Rule => Rule.required()
    },
    {
      name: 'overview',
      title: 'Program Overview',
      type: 'text',
      rows: 5,
      description: 'Short overview for program listing'
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: Rule => Rule.required(),
      placeholder: 'e.g., 2 years, 6 weeks, 3 months'
    },
    {
      name: 'eligibility',
      title: 'Eligibility Requirements',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of eligibility criteria'
    },
    {
      name: 'requirements',
      title: 'Application Requirements',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Documents and materials required'
    },
    {
      name: 'curriculum',
      title: 'Curriculum/Course Content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'module',
              title: 'Module/Course Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3
            },
            {
              name: 'credits',
              title: 'Credits/Hours',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'module',
              subtitle: 'credits'
            }
          }
        }
      ]
    },
    {
      name: 'learningOutcomes',
      title: 'Learning Outcomes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'What students will learn/achieve'
    },
    {
      name: 'fees',
      title: 'Fees Information',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Fee Amount',
          type: 'string'
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'UGX'
        },
        {
          name: 'paymentPlan',
          title: 'Payment Plan',
          type: 'text',
          rows: 2
        },
        {
          name: 'scholarships',
          title: 'Scholarship Information',
          type: 'text',
          rows: 3
        }
      ]
    },
    {
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'date'
    },
    {
      name: 'startDate',
      title: 'Program Start Date',
      type: 'date'
    },
    {
      name: 'mode',
      title: 'Mode of Delivery',
      type: 'string',
      options: {
        list: [
          {title: 'On-Campus', value: 'on-campus'},
          {title: 'Online', value: 'online'},
          {title: 'Hybrid', value: 'hybrid'},
          {title: 'Distance Learning', value: 'distance'}
        ]
      }
    },
    {
      name: 'capacity',
      title: 'Student Capacity',
      type: 'number',
      description: 'Maximum number of students'
    },
    {
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}]
        }
      ]
    },
    {
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string'
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'applicationLink',
      title: 'Application Link',
      type: 'url',
      description: 'Link to application form'
    },
    {
      name: 'brochureUrl',
      title: 'Brochure URL',
      type: 'url'
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Is this program currently accepting applications?',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'Featured Program',
      type: 'boolean',
      description: 'Display prominently on programs page',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Program Type',
      name: 'type',
      by: [
        {field: 'type', direction: 'asc'}
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
      type: 'type',
      duration: 'duration',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, type, duration, isActive} = selection
      return {
        title: title,
        subtitle: `${type} • ${duration || 'No duration'} ${isActive ? '✓' : '✗ Inactive'}`
      }
    }
  }
}
