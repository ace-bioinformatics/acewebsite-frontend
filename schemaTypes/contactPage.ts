import { defineType } from "sanity"

export const contactPage = defineType ({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      description: 'For internal reference only',
      validation: Rule => Rule.required()
    },
    // Hero Section
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2
        }
      ]
    },
    // Contact Information
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'generalEmail',
          title: 'General Email',
          type: 'string',
          validation: Rule => Rule.required().email()
        },
        {
          name: 'supportEmail',
          title: 'Support Email',
          type: 'string',
          validation: Rule => Rule.email()
        },
        {
          name: 'admissionsEmail',
          title: 'Admissions Email',
          type: 'string',
          validation: Rule => Rule.email()
        },
        {
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string'
        },
        {
          name: 'alternatePhone',
          title: 'Alternate Phone',
          type: 'string'
        },
        {
          name: 'faxNumber',
          title: 'Fax Number',
          type: 'string'
        }
      ]
    },
    // Physical Address
    {
      name: 'address',
      title: 'Physical Address',
      type: 'object',
      fields: [
        {
          name: 'buildingName',
          title: 'Building Name',
          type: 'string'
        },
        {
          name: 'streetAddress',
          title: 'Street Address',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'region',
          title: 'State/Region',
          type: 'string'
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string'
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'fullAddress',
          title: 'Full Address Text',
          type: 'text',
          rows: 3,
          description: 'Complete formatted address for display'
        }
      ]
    },
    // Office Hours
    {
      name: 'officeHours',
      title: 'Office Hours',
      type: 'object',
      fields: [
        {
          name: 'weekdayHours',
          title: 'Weekday Hours',
          type: 'string',
          placeholder: 'e.g., Monday - Friday: 9:00 AM - 5:00 PM',
          validation: Rule => Rule.required()
        },
        {
          name: 'weekendHours',
          title: 'Weekend Hours',
          type: 'string',
          placeholder: 'e.g., Saturday: 10:00 AM - 2:00 PM'
        },
        {
          name: 'holidayNote',
          title: 'Holiday Note',
          type: 'string',
          placeholder: 'e.g., Closed on public holidays'
        },
        {
          name: 'additionalInfo',
          title: 'Additional Information',
          type: 'text',
          rows: 2
        }
      ]
    },
    // Social Media Links
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url'
        },
        {
          name: 'github',
          title: 'GitHub URL',
          type: 'url'
        }
      ]
    },
    // Map Information
    {
      name: 'mapInfo',
      title: 'Map Information',
      type: 'object',
      fields: [
        {
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          description: 'Latitude coordinate for map display'
        },
        {
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          description: 'Longitude coordinate for map display'
        },
        {
          name: 'mapEmbedUrl',
          title: 'Map Embed URL',
          type: 'url',
          description: 'Google Maps or other map service embed URL'
        },
        {
          name: 'directionsText',
          title: 'Directions Text',
          type: 'text',
          rows: 4,
          description: 'Written directions to help visitors find the location'
        }
      ]
    },
    // Departments/Offices
    {
      name: 'departments',
      title: 'Departments/Offices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Department Name',
              type: 'string',
              validation: Rule => Rule.required()
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
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'Room number or building location'
            },
            {
              name: 'contactPerson',
              title: 'Contact Person',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'email'
            }
          }
        }
      ]
    },
    // Contact Form Settings
    {
      name: 'formSettings',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        {
          name: 'formTitle',
          title: 'Form Title',
          type: 'string'
        },
        {
          name: 'formDescription',
          title: 'Form Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Send Message'
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          rows: 2,
          initialValue: 'Thank you for your message. We will get back to you soon!'
        },
        {
          name: 'recipientEmail',
          title: 'Form Recipient Email',
          type: 'string',
          validation: Rule => Rule.email(),
          description: 'Email address where form submissions should be sent'
        }
      ]
    },
    // Additional Information
    {
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'object',
      fields: [
        {
          name: 'emergencyContact',
          title: 'Emergency Contact',
          type: 'string'
        },
        {
          name: 'parkingInfo',
          title: 'Parking Information',
          type: 'text',
          rows: 3
        },
        {
          name: 'accessibilityInfo',
          title: 'Accessibility Information',
          type: 'text',
          rows: 3
        },
        {
          name: 'visitorsNote',
          title: 'Note for Visitors',
          type: 'text',
          rows: 3
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
        title: selection.title || 'Contact Page Configuration'
      }
    }
  }
})
