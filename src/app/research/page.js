'use client'
import { useState, useEffect, useMemo } from 'react'
import { client } from '@/lib/sanity'
import { allProjectsQuery, allPartnersQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { getFallbackData } from '@/lib/fallback'
import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

const THEMATIC_AREAS = [
  { value: 'all', label: 'All Areas' },
  { value: 'ai', label: 'AI' },
  { value: 'amr', label: 'AMR' },
  { value: 'human_genomics_cancer', label: 'Human Genomics & Cancer' },
  { value: 'malaria', label: 'Malaria' },
  { value: 'visualization', label: 'Visualization' },
]

const AREA_COLORS = {
  ai: 'bg-purple-50 text-purple-700 ring-purple-200',
  amr: 'bg-orange-50 text-orange-700 ring-orange-200',
  human_genomics_cancer: 'bg-blue-50 text-blue-700 ring-blue-200',
  malaria: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  visualization: 'bg-pink-50 text-pink-700 ring-pink-200',
}

export default function ResearchPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeArea, setActiveArea] = useState('all')
  const [partners, setPartners] = useState([])

  useEffect(() => {
    async function getProjects() {
      const data = await client.fetch(allProjectsQuery)
      setProjects(data || [])
      setLoading(false)
    }
    async function getPartners() {
      try {
        const data = await client.fetch(allPartnersQuery)
        setPartners(data && data.length > 0 ? data : getFallbackData('partners') || [])
      } catch {
        setPartners(getFallbackData('partners') || [])
      }
    }
    getProjects()
    getPartners()
  }, [])

  const filtered = useMemo(() => {
    if (activeArea === 'all') return projects
    return projects.filter((p) => p.thematicArea === activeArea)
  }, [projects, activeArea])

  const areaLabel = THEMATIC_AREAS.find((a) => a.value === activeArea)?.label

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32 overflow-hidden">
        <ACEPattern rows={6} cols={10} opacity={0.08} className="absolute top-6 right-6 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Research Projects
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Advancing health outcomes through innovative computational research
              addressing critical challenges across Africa
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Thematic Area Filter */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            {THEMATIC_AREAS.map((area) => (
              <button
                key={area.value}
                onClick={() => setActiveArea(area.value)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeArea === area.value
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Research Portfolio
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {activeArea === 'all'
              ? `${projects.length} project${projects.length !== 1 ? 's' : ''} across all thematic areas`
              : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} in ${areaLabel}`}
          </p>
        </AnimateOnScroll>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-700 border-t-transparent" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => {
              const areaColor = project.thematicArea ? AREA_COLORS[project.thematicArea] : null
              const areaName = project.thematicArea
                ? THEMATIC_AREAS.find((a) => a.value === project.thematicArea)?.label
                : null

              return (
                <AnimateOnScroll key={project._id} variant="fade-up" delay={i * 60}>
                  <Link
                    href={`/research/${project.slug?.current || project._id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all h-full"
                  >
                    {project.featuredImage ? (
                      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                        <Image
                          src={urlFor(project.featuredImage).width(600).height(400).url()}
                          alt={project.featuredImage.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-900" />
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {areaName && (
                          <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ring-1 ring-inset ${areaColor}`}>
                            {areaName}
                          </span>
                        )}
                        {project.status && (
                          <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                            project.status === 'active' || project.status === 'ongoing'
                              ? 'bg-emerald-50 text-emerald-700'
                              : project.status === 'completed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-purple-50 text-purple-700'
                          }`}>
                            {project.status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-700 transition-colors leading-snug">
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
                    </div>
                  </Link>
                </AnimateOnScroll>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <ACEPattern rows={4} cols={6} opacity={0.06} className="mx-auto mb-6" />
            <p className="text-gray-500 text-lg">
              No research projects found{activeArea !== 'all' ? ` in ${areaLabel}` : ''}.
            </p>
            {activeArea !== 'all' && (
              <button
                onClick={() => setActiveArea('all')}
                className="mt-4 text-red-700 hover:text-red-600 text-sm font-medium"
              >
                View all projects →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Partners & Collaborators */}
      {partners.length > 0 && (
        <div className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimateOnScroll variant="fade-up" className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Partners &amp; Collaborators</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our research is powered by strong partnerships with leading funders and collaborating institutions.
              </p>
            </AnimateOnScroll>

            {/* Funders */}
            {partners.filter((p) => p.type === 'funder').length > 0 && (
              <div className="mb-12">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">Funders</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {partners.filter((p) => p.type === 'funder').map((partner, i) => (
                    <AnimateOnScroll key={partner._id} variant="zoom" delay={i * 60}>
                      <PartnerCard partner={partner} />
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            )}

            {/* Collaborators */}
            {partners.filter((p) => p.type === 'collaborator').length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">Collaborators</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {partners.filter((p) => p.type === 'collaborator').map((partner, i) => (
                    <AnimateOnScroll key={partner._id} variant="zoom" delay={i * 60}>
                      <PartnerCard partner={partner} />
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <AnimateOnScroll variant="fade-up">
        <div className="bg-red-50 py-16">
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
      </AnimateOnScroll>
    </div>
  )
}

function PartnerCard({ partner }) {
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm hover:border-red-200 hover:shadow-md transition-all min-w-[180px]">
      {partner.logo?.url ? (
        <img src={partner.logo.url} alt={partner.logo.alt || partner.name} className="h-8 w-8 object-contain shrink-0" />
      ) : (
        <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-red-700">{partner.name.charAt(0)}</span>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-gray-900 leading-tight">{partner.name}</p>
        {partner.description && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{partner.description}</p>
        )}
      </div>
    </div>
  )

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return inner
}
