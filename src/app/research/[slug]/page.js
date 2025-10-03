import { client } from '@/lib/sanity'
import { projectBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`)
  
  return projects.map((program) => ({
    slug: program.slug,
  }))
}

async function getProject(slug) {
  const project = await client.fetch(projectBySlugQuery, { slug })
  return project
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/research" className="text-red-700 hover:text-red-600">
            ← Back to Research
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
              href="/research" 
              className="inline-flex items-center text-red-100 hover:text-white mb-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Research
            </Link>

            {project.category && (
              <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white mb-4">
                {project.category}
              </span>
            )}

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>

            <div className="mt-6 flex items-center gap-4 text-red-100">
              {project.status && (
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  project.status === 'active' 
                    ? 'bg-emerald-500 text-white' 
                    : project.status === 'completed'
                    ? 'bg-gray-500 text-white'
                    : 'bg-purple-500 text-white'
                }`}>
                  {project.status}
                </span>
              )}
              {project.startDate && (
                <span className="text-sm">
                  Started: {new Date(project.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {project.featuredImage && (
        <div className="relative h-96 w-full">
          <Image
            src={urlFor(project.featuredImage).width(1200).height(600).url()}
            alt={project.featuredImage.alt || project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {/* Description */}
        {project.description && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={project.description} />
          </div>
        )}

        {/* Team Members */}
        {project.team && project.team.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Team</h2>
            <div className="flex flex-wrap gap-3">
              {project.team.map((member, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {(project.startDate || project.endDate) && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.startDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Start Date</p>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(project.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
              {project.endDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">End Date</p>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(project.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-red-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Interested in This Research?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get in touch to learn more about collaboration opportunities
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}