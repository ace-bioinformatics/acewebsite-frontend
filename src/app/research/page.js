import { client } from '@/lib/sanity'
import { allProjectsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

async function getProjects() {
  const projects = await client.fetch(allProjectsQuery)
  return projects
}

export default async function ResearchPage() {
  const projects = await getProjects()
  console.log(projects)
  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'amr', label: 'Antimicrobial Resistance' },
    { value: 'genomics', label: 'Human Genomics' },
    { value: 'cancer', label: 'Cancer Research' },
    { value: 'datascience', label: 'Data Science' },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Research Projects
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Advancing health outcomes through innovative computational research 
              addressing critical challenges across Africa
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Research Portfolio
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our diverse range of research initiatives
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/research/${project.slug?.current || project._id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all"
              >
                {project.featuredImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={urlFor(project.featuredImage).width(600).height(400).url()}
                      alt={project.featuredImage.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-x-2 text-xs mb-3">
                    {project.category && (
                      <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-700">
                        {project.category}
                      </span>
                    )}
                    {project.status && (
                      <span className={`rounded-full px-3 py-1 font-medium ${
                        project.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : project.status === 'completed'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-grow">
                    {project.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-red-700 group-hover:text-red-600">
                    Learn more
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                    Learn more
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No research projects available at the moment.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Interested in Collaboration?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We welcome partnerships and research collaborations from institutions worldwide
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors inline-block"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}