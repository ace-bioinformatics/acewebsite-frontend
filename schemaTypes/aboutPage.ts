import {defineField, defineType} from 'sanity'

export const aboutPage =  defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      description: 'For internal reference only',
      validation: (rule) => rule.required()
    },
    // Hero/Introduction Section
    {
      name: 'introSection',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (rule) => rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 3
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5
        }
      ]
    },
    // Mission & Vision
    {
      name: 'missionVision',
      title: 'Mission & Vision',
      type: 'object',
      fields: [
        {
          name: 'mission',
          title: 'Mission Statement',
          type: 'text',
          rows: 4,
          validation: rule => rule.required()
        },
        {
          name: 'vision',
          title: 'Vision Statement',
          type: 'text',
          rows: 4,
          validation: rule => rule.required()
        }
      ]
    },
    // Core Values
    {
      name: 'coreValues',
      title: 'Core Values',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: rule => rule.required()
        },
        {
          name: 'values',
          title: 'Values',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Value Title',
                  type: 'string',
                  validation: rule => rule.required()
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: rule => rule.required()
                },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Icon identifier or emoji'
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description'
                }
              }
            }
          ],
          validation: rule => rule.required().min(1)
        }
      ]
    },
    // Services Section
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: rule => rule.required()
        },
        {
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'services',
          title: 'Services Offered',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Service Title',
                  type: 'string',
                  validation: rule => rule.required()
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 4,
                  validation: rule => rule.required()
                },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string'
                },
                {
                  name: 'features',
                  title: 'Key Features',
                  type: 'array',
                  of: [{type: 'string'}],
                  description: 'List of key features or benefits'
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description'
                }
              }
            }
          ]
        }
      ]
    },
    // Education & Training Section
    {
      name: 'educationSection',
      title: 'Education & Training Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: rule => rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5,
          validation: rule => rule.required()
        },
        {
          name: 'programs',
          title: 'Training Programs',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Program Title',
                  type: 'string',
                  validation: rule => rule.required()
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3
                }
              ],
              preview: {
                select: {
                  title: 'title'
                }
              }
            }
          ]
        }
      ]
    },
    // Timeline/History Section
    {
      name: 'timelineSection',
      title: 'Timeline/History Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: rule => rule.required()
        },
        {
          name: 'milestones',
          title: 'Timeline Milestones',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'year',
                  title: 'Year',
                  type: 'string',
                  validation: rule => rule.required()
                },
                {
                  name: 'title',
                  title: 'Milestone Title',
                  type: 'string',
                  validation: rule => rule.required()
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: rule => rule.required()
                },
                {
                  name: 'category',
                  title: 'Category',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Establishment', value: 'establishment'},
                      {title: 'Achievement', value: 'achievement'},
                      {title: 'Partnership', value: 'partnership'},
                      {title: 'Expansion', value: 'expansion'},
                      {title: 'Innovation', value: 'innovation'}
                    ]
                  }
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'year'
                }
              }
            }
          ]
        }
      ]
    },
    // Partners/Collaborations Section
    {
      name: 'partnersSection',
      title: 'Partners & Collaborations',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: rule => rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'partnerTypes',
          title: 'Partner Types',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'category',
                  title: 'Category',
                  type: 'string',
                  validation: rule => rule.required()
                },
                {
                  name: 'description',
                  title: 'Category Description',
                  type: 'text',
                  rows: 2
                },
                {
                  name: 'partners',
                  title: 'Partners',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'name',
                          title: 'Partner Name',
                          type: 'string',
                          validation: rule => rule.required()
                        },
                        {
                          name: 'description',
                          title: 'Description',
                          type: 'text',
                          rows: 2
                        },
                        {
                          name: 'website',
                          title: 'Website',
                          type: 'url'
                        },
                        {
                          name: 'country',
                          title: 'Country',
                          type: 'string'
                        }
                      ],
                      preview: {
                        select: {
                          title: 'name',
                          subtitle: 'country'
                        }
                      }
                    }
                  ]
                }
              ],
              preview: {
                select: {
                  title: 'category',
                  partners: 'partners'
                },
                prepare(selection) {
                  const {title, partners} = selection
                  return {
                    title: title,
                    subtitle: `${partners?.length || 0} partners`
                  }
                }
              }
            }
          ]
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
        title: selection.title || 'About Page Configuration'
      }
    }
  }
})
