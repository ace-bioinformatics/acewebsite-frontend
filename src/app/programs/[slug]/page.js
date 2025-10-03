import { client } from '@/lib/sanity'
import { programBySlugQuery } from '@/lib/queries'
import { allProgramsQuery } from '@/lib/queries'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export async function generateStaticParams() {
  const programs = await client.fetch(allProgramsQuery)
  
  return programs.map((program) => ({
    slug: program.slug,
  }))
}

async function getProgram(slug) {
  const program = await client.fetch(programBySlugQuery, { slug })
  return program
}

export default async function ProgramPage({ params }) {
  const program = await getProgram(params.slug)

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <Link href="/programs" className="text-red-700 hover:text-red-600">
            ← Back to Programs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link 
              href="/programs" 
              className="inline-flex items-center text-red-100 hover:text-white mb-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Programs
            </Link>

            <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white mb-4">
              {program.level?.toUpperCase()}
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {program.name}
            </h1>

            {program.duration && (
              <p className="mt-4 text-lg text-red-100">
                Duration: {program.duration}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {program.content && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={program.requirements} />
          </div>
        )}

        {program.eligibility && program.eligibility.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility</h2>
            <ul className="space-y-3">
              {program.eligibility.map((req, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-red-700 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {program.applyUrl && (
          <div className="mt-12">
            <a
              href={program.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
            >
              Apply Now
            </a>
          </div>
        )}
      </div>
    </div>
  )
}