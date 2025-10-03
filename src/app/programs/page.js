import { client } from '@/lib/sanity'
import { allProgramsQuery } from '@/lib/queries'
import Link from 'next/link'

async function getPrograms() {
  const programs = await client.fetch(allProgramsQuery)
  return programs
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

  const programsByLevel = {
    msc: programs?.filter((p) => p.type === 'msc') || [],
    phd: programs?.filter((p) => p.type === 'phd') || [],
    shortcourse: programs?.filter((p) => p.type === 'shortcourse') || [],
    internship: programs?.filter((p) => p.type === 'internship') || [],
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Academic Programs
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Build your career in bioinformatics and data science with world-class 
              training programs designed for the next generation of African scientists
            </p>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        {/* MSc Programs */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Master's Programs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Advanced training in bioinformatics and computational biology
            </p>
          </div>
          
          {programsByLevel.msc.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {programsByLevel.msc.map((program) => (
                <div
                  key={program._id}
                  className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                      MSc Program
                    </span>
                    {program.featured && (
                      <span className="text-xs font-semibold text-red-700">Featured</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  {program.duration && (
                    <p className="text-sm text-gray-600 mb-4">
                      Duration: {program.duration}
                    </p>
                  )}
                  <p className="text-base text-gray-600 flex-grow">
                    {program.description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/programs/${program.slug.current}`}
                      className="inline-flex items-center text-base font-semibold text-red-700 hover:text-red-600"
                    >
                      Learn more
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No MSc programs available at the moment.</p>
          )}
        </div>

        {/* PhD Programs */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Doctoral Programs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Research-focused PhD programs for advancing scientific knowledge
            </p>
          </div>
          
          {programsByLevel.phd.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {programsByLevel.phd.map((program) => (
                <div
                  key={program._id}
                  className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
                      PhD Program
                    </span>
                    {program.featured && (
                      <span className="text-xs font-semibold text-red-700">Featured</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  {program.duration && (
                    <p className="text-sm text-gray-600 mb-4">
                      Duration: {program.duration}
                    </p>
                  )}
                  <p className="text-base text-gray-600 flex-grow">
                    {program.description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/programs/${program.slug.current}`}
                      className="inline-flex items-center text-base font-semibold text-red-700 hover:text-red-600"
                    >
                      Learn more
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No PhD programs available at the moment.</p>
          )}
        </div>

        {/* Short Courses & Internships */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Short Courses */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Short Courses
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Intensive training programs for skill development
              </p>
            </div>
            {programsByLevel.shortcourse.length > 0 ? (
              <div className="space-y-6">
                {programsByLevel.shortcourse.map((program) => (
                  <div
                    key={program._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {program.description}
                    </p>
                    <Link
                      href={`/programs/${program.slug.current}`}
                      className="text-sm font-semibold text-red-700 hover:text-red-600"
                    >
                      View details →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No short courses available.</p>
            )}
          </div>

          {/* Internships */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Internships
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Hands-on research experience for students
              </p>
            </div>
            {programsByLevel.internship.length > 0 ? (
              <div className="space-y-6">
                {programsByLevel.internship.map((program) => (
                  <div
                    key={program._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {program.description}
                    </p>
                    <Link
                      href={`/programs/${program.slug.current}`}
                      className="text-sm font-semibold text-blue-900 hover:text-blue-700"
                    >
                      View details →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No internships available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Application CTA */}
      <div className="bg-red-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to Apply?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our community of researchers and scientists making a difference in Africa
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link
                href="/contact"
                className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
              >
                Contact Admissions
              </Link>
              <Link
                href="/about"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-red-700 shadow-sm border border-red-300 hover:bg-red-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}