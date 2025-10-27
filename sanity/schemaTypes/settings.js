export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Default meta description for SEO'
    },
    {
      name: 'stats',
      title: 'Homepage Statistics',
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
              title: 'label',
              subtitle: 'value'
            }
          }
        }
      ],
      description: 'Statistics displayed on the homepage'
    },
    {
      name: 'contactEmail',
      title: 'General Contact Email',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        }
      ]
    },
    {
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Banner',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'message',
          title: 'Banner Message',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Link URL',
          type: 'url'
        },
        {
          name: 'type',
          title: 'Banner Type',
          type: 'string',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Warning', value: 'warning'},
              {title: 'Success', value: 'success'},
              {title: 'Error', value: 'error'}
            ]
          },
          initialValue: 'info'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings'
      }
    }
  }
}
