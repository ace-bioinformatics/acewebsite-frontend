import Link from 'next/link'
import EventsClient from '@/Components/events/EventsClient'
import EventHighlight from '@/Components/events/EventHighlight'
import { client } from '@/lib/sanity'
import { upcomingEventsQuery, pastEventsQuery, eventHighlightsQuery } from '@/lib/queries'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export const revalidate = 60 // Revalidate every 60 seconds

async function getEventsData() {
  try {
    const [upcomingEvents, pastEvents, eventHighlights] = await Promise.all([
      client.fetch(upcomingEventsQuery),
      client.fetch(pastEventsQuery),
      client.fetch(eventHighlightsQuery)
    ])

    return {
      upcomingEvents: upcomingEvents || [],
      pastEvents: pastEvents || [],
      eventHighlights: eventHighlights || []
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      upcomingEvents: [],
      pastEvents: [],
      eventHighlights: []
    }
  }
}

export default async function EventsPage() {
  const { upcomingEvents, pastEvents, eventHighlights } = await getEventsData()

  // Filter categories and years
  const categories = [
    { value: 'workshop', label: 'Workshops', icon: '🔧' },
    { value: 'seminar', label: 'Seminars', icon: '🎤' },
    { value: 'conference', label: 'Conferences', icon: '🎓' },
    { value: 'training', label: 'Training', icon: '📚' },
    { value: 'webinar', label: 'Webinars', icon: '💻' },
    { value: 'networking', label: 'Networking', icon: '🤝' }
  ]

  // Extract unique years from events
  const allEvents = [...upcomingEvents, ...pastEvents]
  const years = [...new Set(allEvents.map(event =>
    new Date(event.date).getFullYear().toString()
  ))].sort((a, b) => b - a)

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 py-24 sm:py-32 overflow-hidden">
        <ACEPattern rows={6} cols={10} opacity={0.08} className="absolute top-6 right-6 hidden lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                Events & Happenings
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Discover Our Events
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Join us for workshops, conferences, seminars, and networking events that shape the future of bioinformatics and data science in Africa
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Event Highlights Section */}
      {eventHighlights.length > 0 && (
        <div className="bg-gradient-to-b from-gray-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Event Highlights
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Key moments and milestones from our most impactful events
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={100}>
              <EventHighlight highlights={eventHighlights} />
            </AnimateOnScroll>
          </div>
        </div>
      )}

      {/* Upcoming Events Section */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Don't miss out on these exciting opportunities to learn and connect
            </p>
          </AnimateOnScroll>

          {/* Client-side filtering component */}
          <EventsClient
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            categories={categories}
            years={years}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay Updated on Our Events
            </h2>
            <p className="mt-4 text-lg text-red-100">
              Subscribe to our newsletter to receive notifications about upcoming events and opportunities
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <Link
                href="/contact"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-red-700 shadow-sm hover:bg-gray-100 transition-all hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link
                href="/programs"
                className="rounded-md bg-white/10 backdrop-blur-sm border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
