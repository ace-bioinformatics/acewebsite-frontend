export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for event listings',
      validation: Rule => Rule.max(200)
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'For multi-day events'
    },
    {
      name: 'category',
      title: 'Event Category',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Seminar', value: 'seminar'},
          {title: 'Conference', value: 'conference'},
          {title: 'Training', value: 'training'},
          {title: 'Webinar', value: 'webinar'},
          {title: 'Hackathon', value: 'hackathon'},
          {title: 'Symposium', value: 'symposium'},
          {title: 'Meetup', value: 'meetup'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'venue',
          title: 'Venue Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2
        },
        {
          name: 'city',
          title: 'City',
          type: 'string'
        },
        {
          name: 'isVirtual',
          title: 'Is Virtual Event',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'onlineLink',
          title: 'Online Meeting Link',
          type: 'url',
          description: 'Zoom, Teams, or other meeting link'
        }
      ]
    },
    {
      name: 'speakers',
      title: 'Speakers/Presenters',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Speaker Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Title/Affiliation',
              type: 'string'
            },
            {
              name: 'bio',
              title: 'Biography',
              type: 'text',
              rows: 3
            },
            {
              name: 'topic',
              title: 'Presentation Topic',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'title'
            }
          }
        }
      ]
    },
    {
      name: 'topics',
      title: 'Topics Covered',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key topics or themes'
    },
    {
      name: 'agenda',
      title: 'Event Agenda',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Time',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'activity',
              title: 'Activity',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            }
          ],
          preview: {
            select: {
              title: 'activity',
              subtitle: 'time'
            }
          }
        }
      ]
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum number of attendees'
    },
    {
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url'
    },
    {
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime'
    },
    {
      name: 'fee',
      title: 'Event Fee',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'string'
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'UGX'
        },
        {
          name: 'isFree',
          title: 'Is Free',
          type: 'boolean',
          initialValue: true
        }
      ]
    },
    {
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Who should attend this event'
    },
    {
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Required knowledge or experience'
    },
    {
      name: 'organizers',
      title: 'Organizers',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'partners',
      title: 'Partner Organizations',
      type: 'array',
      of: [{type: 'string'}]
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
      name: 'isPast',
      title: 'Is Past Event',
      type: 'boolean',
      description: 'Toggle for events that have concluded',
      initialValue: false
    },
    {
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Display prominently on events page',
      initialValue: false
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ],
  orderings: [
    {
      title: 'Event Date (Upcoming First)',
      name: 'dateAsc',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    },
    {
      title: 'Event Date (Recent First)',
      name: 'dateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      isPast: 'isPast'
    },
    prepare(selection) {
      const {title, date, category, isPast} = selection
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: `${category} • ${dateStr} ${isPast ? '(Past)' : ''}`
      }
    }
  }
}
