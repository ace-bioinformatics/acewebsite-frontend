'use client'

import { useState, useMemo } from 'react'
import EventCard from './EventCard'
import EventFilters from './EventFilters'

export default function EventsClient({ upcomingEvents, pastEvents, categories, years }) {
  const [filters, setFilters] = useState({
    category: 'all',
    year: 'all',
    search: ''
  })

  // Filter events
  const filteredUpcomingEvents = useMemo(() => {
    return upcomingEvents.filter(event => {
      const matchesCategory = filters.category === 'all' || event.category === filters.category
      const matchesYear = filters.year === 'all' || new Date(event.date).getFullYear().toString() === filters.year
      const matchesSearch = filters.search === '' ||
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase())
      return matchesCategory && matchesYear && matchesSearch
    })
  }, [filters, upcomingEvents])

  const filteredPastEvents = useMemo(() => {
    return pastEvents.filter(event => {
      const matchesCategory = filters.category === 'all' || event.category === filters.category
      const matchesYear = filters.year === 'all' || new Date(event.date).getFullYear().toString() === filters.year
      const matchesSearch = filters.search === '' ||
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase())
      return matchesCategory && matchesYear && matchesSearch
    })
  }, [filters, pastEvents])

  return (
    <>
      {/* Filters */}
      <div className="mb-12">
        <EventFilters
          onFilterChange={setFilters}
          categories={categories}
          years={years}
        />
      </div>

      {/* Upcoming Events Grid */}
      {filteredUpcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredUpcomingEvents.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 mb-24">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">No upcoming events found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Past Events Section */}
      <div className="py-24 bg-gray-50 -mx-6 lg:-mx-8 px-6 lg:px-8 rounded-lg">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Past Events
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore our archive of previous workshops, conferences, and seminars
            </p>
          </div>

          {/* Past Events Grid */}
          {filteredPastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPastEvents.map((event, index) => (
                <EventCard key={event._id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">No past events found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
