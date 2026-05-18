import { client } from '@/lib/sanity'
import { personBySlugQuery } from '@/lib/queries'
import { allStaffQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const people = await client.fetch(allStaffQuery)
  
  return people.map((person) => ({
    slug: person.slug.current,
  }))
}

async function getPerson(slug) {
  const person = await client.fetch(personBySlugQuery, { slug })
  return person
}

export default async function StaffDetailPage({ params }) {
  const person = await getPerson(params.slug)

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Staff Member Not Found</h1>
          <Link href="/about#team" className="text-red-700 hover:text-red-600">
            ← Back to Team
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link 
            href="/team" 
            className="inline-flex items-center text-red-100 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Team
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-3">
            {/* Profile Image Section */}
            <div className="lg:col-span-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mb-6">
                {person.image ? (
                  <Image
                    src={urlFor(person.image).width(500).height(500).url()}
                    alt={person.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
                    <svg className="h-32 w-32 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-4">
                {person.department && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="capitalize">{person.department.replace('_', ' ')}</span>
                  </div>
                )}

                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center text-sm text-red-700 hover:text-red-600 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {person.email}
                  </a>
                )}

                {(person.linkedin || person.twitter) && (
                  <div className="flex gap-3 pt-2">
                    {person.linkedin && (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-9 w-9 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {person.twitter && (
                      <a
                        href={person.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-9 w-9 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                        title="X (Twitter) Profile"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bio and Details Section */}
            <div className="lg:col-span-2 p-8 lg:p-12">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {person.name}
                </h1>
                <p className="text-xl text-red-700 font-medium">
                  {person.role}
                </p>
              </div>

              {person.bio && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Biography</h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {person.bio}
                  </div>
                </div>
              )}

              {/* Additional sections can be added here */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Research Interests</h3>
                <p className="text-gray-600">
                  Information about research interests will be available soon.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Publications</h3>
                <p className="text-gray-600">
                  Publication list will be available soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Team Members */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View All Team Members
          </Link>
        </div>
      </div>
    </div>
  )
}