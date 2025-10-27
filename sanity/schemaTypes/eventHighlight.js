export default {
  name: 'eventHighlight',
  title: 'Event Highlight',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Highlight Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Seminar', value: 'seminar'},
          {title: 'Conference', value: 'conference'},
          {title: 'Training', value: 'training'},
          {title: 'Achievement', value: 'achievement'},
          {title: 'Announcement', value: 'announcement'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small badge text (e.g., "New", "Featured", "Upcoming")'
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value'
            }
          }
        }
      ],
      description: 'Key statistics about the event (e.g., "Participants: 150")'
    },
    {
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points highlighting important information'
    },
    {
      name: 'relatedEvent',
      title: 'Related Event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Link to the full event page'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which highlights appear (lower numbers first)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this highlight',
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
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      order: 'order',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, category, order, isActive} = selection
      return {
        title: `${order}. ${title}`,
        subtitle: `${category} ${isActive ? '✓' : '✗ Hidden'}`
      }
    }
  }
}
