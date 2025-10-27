export default {
  name: 'heroSlide',
  title: 'Hero Carousel Slide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Research', value: 'research'},
          {title: 'Education', value: 'education'},
          {title: 'Technology', value: 'technology'},
          {title: 'Partnership', value: 'partnership'},
          {title: 'Innovation', value: 'innovation'}
        ]
      }
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Call to action button text (e.g., "Learn More")'
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Link URL for the call to action button'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this slide appears (lower numbers appear first)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this slide',
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      order: 'order',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, subtitle, order, isActive} = selection
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle || 'No category'} ${isActive ? '✓' : '✗ Hidden'}`
      }
    }
  }
}
