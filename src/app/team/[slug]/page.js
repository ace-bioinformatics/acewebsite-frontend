import { client } from '@/lib/sanity'
import { personBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

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
            href="/about#team" 
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