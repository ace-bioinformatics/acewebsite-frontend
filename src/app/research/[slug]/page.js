import { client } from '@/lib/sanity'
import { projectBySlugQuery } from '@/lib/queries'
import { allProjectsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

const THEMATIC_AREA_LABELS = {
  ai: 'AI',
  amr: 'AMR',
  human_genomics_cancer: 'Human Genomics & Cancer',
  malaria: 'Malaria',
  visualization: 'Visualization',
}

export async function generateStaticParams() {
  const projects = await client.fetch(allProjectsQuery)
  return projects.map((project) => ({
    slug: project.slug.current,
  }))
}

async function getProject(slug) {
  return client.fetch(projectBySlugQuery, { slug })
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = await getProject(slug)

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

  const thematicLabels = project.thematicAreas?.map(
    (a) => THEMATIC_AREA_LABELS[a] || a
  ) ?? []

  return (
    <div className="bg-white">
      {/* Header */}
      <div className={`relative py-16 sm:py-24 overflow-hidden ${project.featuredImage ? '' : 'bg-gradient-to-br from-red-700 to-red-900'}`}>
        {project.featuredImage ? (
          <div className="absolute inset-0">
            <Image
              src={urlFor(project.featuredImage).width(1600).height(900).url()}
              alt={project.featuredImage.alt || project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-slate-900/75" />
          </div>
        ) : (
          <ACEPattern rows={6} cols={9} opacity={0.08} className="absolute top-4 right-4 hidden lg:block" />
        )}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <Link
              href="/research"
              className="inline-flex items-center text-red-100 hover:text-white mb-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Research
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.category && (
                <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
                  {project.category}
                </span>
              )}
              {thematicLabels.map((label) => (
                <span key={label} className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                  {label}
                </span>
              ))}
              {project.status && (
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  project.status === 'active' || project.status === 'ongoing'
                    ? 'bg-emerald-500 text-white'
                    : project.status === 'completed'
                    ? 'bg-gray-500 text-white'
                    : 'bg-purple-500 text-white'
                }`}>
                  {project.status}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>

            {project.startDate && (
              <p className="mt-4 text-red-100 text-sm">
                Started: {new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                {project.endDate && ` · Ends: ${new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 space-y-12">

        {/* Description */}
        {project.description && (
          <AnimateOnScroll variant="fade-up">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </section>
          </AnimateOnScroll>
        )}

        {/* Abstract */}
        {project.abstract && (
          <AnimateOnScroll variant="fade-up">
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.abstract}</p>
            </section>
          </AnimateOnScroll>
        )}

        {/* Principal Investigator */}
        {project.pi && (
          <AnimateOnScroll variant="fade-up">
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Principal Investigator</h2>
              <Link
                href={`/team/${project.pi.slug?.current}`}
                className="inline-flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm hover:border-red-200 hover:shadow-md transition-all group w-full sm:w-auto"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-2 ring-white shadow">
                  {project.pi.image?.url ? (
                    <Image
                      src={project.pi.image.url}
                      alt={project.pi.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
                      <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">{project.pi.name}</p>
                  {project.pi.role && <p className="text-sm text-gray-500 mt-0.5">{project.pi.role}</p>}
                  <p className="text-xs text-red-700 font-medium mt-1">View Profile →</p>
                </div>
              </Link>
            </section>
          </AnimateOnScroll>
        )}

        {/* Fellows */}
        {project.fellows && project.fellows.length > 0 && (
          <AnimateOnScroll variant="fade-up">
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fellows</h2>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                {project.fellows.map((fellow, i) => (
                  <AnimateOnScroll key={fellow._id} variant="zoom" delay={i * 60}>
                    <Link href={`/team/${fellow.slug?.current}`} className="group">
                      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                        {fellow.image?.url ? (
                          <Image
                            src={fellow.image.url}
                            alt={fellow.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
                            <svg className="h-14 w-14 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="p-3 text-white text-xs font-medium">View Profile</p>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors leading-snug">{fellow.name}</p>
                        {fellow.role && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{fellow.role}</p>}
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </section>
          </AnimateOnScroll>
        )}

        {/* Research Team */}
        {project.team && project.team.length > 0 && (
          <AnimateOnScroll variant="fade-up">
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Team</h2>
              <div className="flex flex-wrap gap-3">
                {project.team.map((member, index) => {
                  const name = typeof member === 'string' ? member : member.name
                  const slug = typeof member === 'object' ? member.slug?.current : null
                  return slug ? (
                    <Link
                      key={member._id || index}
                      href={`/team/${slug}`}
                      className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      {name}
                    </Link>
                  ) : (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      {name}
                    </span>
                  )
                })}
              </div>
            </section>
          </AnimateOnScroll>
        )}

        {/* Funders */}
        {project.funders && project.funders.length > 0 && (
          <AnimateOnScroll variant="fade-up">
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Funders</h2>
              <div className="flex flex-wrap gap-3">
                {project.funders.map((funder, index) => {
                  const name = typeof funder === 'string' ? funder : funder.name
                  const website = typeof funder === 'object' ? funder.website : null
                  const logo = typeof funder === 'object' ? funder.logo : null

                  const inner = (
                    <div
                      key={funder._id || index}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {logo?.url ? (
                        <Image
                          src={logo.url}
                          alt={logo.alt || name}
                          width={20}
                          height={20}
                          className="object-contain shrink-0"
                        />
                      ) : (
                        <svg className="h-4 w-4 text-red-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {name}
                    </div>
                  )

                  return website ? (
                    <a key={funder._id || index} href={website} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                      {inner}
                    </a>
                  ) : inner
                })}
              </div>
            </section>
          </AnimateOnScroll>
        )}

        {/* Timeline */}
        {(project.startDate || project.endDate) && (
          <AnimateOnScroll variant="fade-up">
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.startDate && (
                  <div className="rounded-xl bg-gray-50 p-5">
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                )}
                {project.endDate && (
                  <div className="rounded-xl bg-gray-50 p-5">
                    <p className="text-sm font-medium text-gray-500">End Date</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </AnimateOnScroll>
        )}
      </div>

      {/* CTA */}
      <AnimateOnScroll variant="fade-up">
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
      </AnimateOnScroll>
    </div>
  )
}
