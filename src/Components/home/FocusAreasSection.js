import Link from 'next/link'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export default async function FocusAreasSection() {
  const homeData = await fetchWithFallback(
    () => client.fetch(`*[_type == "homePage"][0]`),
    'home'
  )
  return (
    <section className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden">
      <ACEPattern rows={5} cols={7} opacity={0.09} className="absolute bottom-8 left-8 hidden lg:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-900">Key Research Areas</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {homeData.focusAreasSection.sectionTitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {homeData.focusAreasSection.sectionDescription}
          </p>
        </AnimateOnScroll>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {homeData.focusAreasSection.focusAreas.map((area, index) => (
            <AnimateOnScroll key={area._key} variant="fade-up" delay={index * 100}>
              <div className="relative flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all group h-full">
                <div className="absolute top-0 right-0 h-8 w-8 bg-red-700 opacity-0 group-hover:opacity-10 rounded-bl-2xl transition-opacity" />
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-red-700 group-hover:bg-red-800 text-white group-hover:scale-110 transition-transform">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path d={area.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-900 transition-colors">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">{area.description}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll variant="fade-up" delay={200} className="mt-16 flex justify-center">
          <Link
            href="/research"
            className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-800 transition-colors"
          >
            Explore All Research Projects
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
