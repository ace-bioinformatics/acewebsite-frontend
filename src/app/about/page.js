import Link from 'next/link'
import AnimatedTimeline from '@/Components/about/AnimatedTimeline'
import PartnerCarousel from '@/Components/about/PartnerCarousel'
import { client } from '@/lib/sanity'
import { fetchWithFallback } from '@/lib/fallback'
import AnimateOnScroll from '@/Components/shared/AnimateOnScroll'
import ACEPattern from '@/Components/shared/ACEPattern'

export default async function AboutPage() {
  const aboutData = await fetchWithFallback(
      () => client.fetch(`*[_type == "aboutPage"][0]`),
      'about'
    )
  console.log(aboutData)
  const milestones = [
    { year: '2015', event: 'ACE Uganda Established', description: 'Center founded through partnership with NIH/NIAID/OCICB' },
    { year: '2017', event: 'HPC Cluster Deployed', description: '56-node high-performance computing infrastructure installed' },
    { year: '2019', event: 'First PhD Graduates', description: 'Inaugural cohort of PhD students complete their programs' },
    { year: '2021', event: 'VR Lab Launched', description: 'State-of-the-art visualization laboratory opens' },
    { year: '2023', event: 'Google DeepMind Partnership', description: 'Strategic collaboration established for AI research' },
  ]

  const values = [
    {
      title: 'Excellence',
      description: 'Pursuing the highest standards in research, training, and innovation',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
        </svg>
      )
    },
    {
      title: 'Collaboration',
      description: 'Building partnerships across Africa and globally to amplify our impact',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      title: 'Innovation',
      description: 'Embracing cutting-edge technologies to solve complex health challenges',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      )
    },
    {
      title: 'Capacity Building',
      description: 'Empowering African scientists with skills for the future',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      )
    },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32 overflow-hidden">
        <ACEPattern rows={7} cols={10} opacity={0.08} className="absolute top-6 right-6 hidden lg:block" />
        <ACEPattern rows={4} cols={6} opacity={0.06} className="absolute bottom-6 left-6 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {aboutData.introSection.heading}
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              {aboutData.introSection.description}
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Overview */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            Who We Are
          </h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              The Infectious Diseases Institute (IDI), Makerere University's College of Computing & Health Sciences in partnership with the US Government National Institute of Allergy and Infectious Diseases and the Office of Cyber Infrastructure and Computational Biology (NIH/NIAID/OCICB) have established the African Center of Excellence in Bioinformatics & Data Sciences, one of the only 2 such centers on the African continent.
            </p>
            <p>
              First of its kind on the Makerere campus, the ACE is a center for Computational Biology and Big Data analysis. 
              It has a dedicated High-Performance Computing cluster, a Tele-learning center, a collaborative room with collaborative spaces, and a Virtual Reality room for the latest 3D & VR pedagogical and diagnostic approaches. 
              Layered over those facilities is professionally curated long term (MSc & PhD) and short term (Certificates) academic programs, as well as research and development support units.
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Thematic Areas Section */}
      <div className="relative bg-gray-50 py-20 overflow-hidden">
        <ACEPattern rows={5} cols={7} opacity={0.08} className="absolute bottom-6 right-6 hidden xl:block" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Thematic Areas
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {aboutData.servicesSection.sectionDescription}
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.servicesSection.services.map((service, i) => (
              <AnimateOnScroll key={service._key} variant="fade-up" delay={i * 80}>
                <div className="relative flex flex-col p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Education and Training */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <AnimateOnScroll variant="fade-up" className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            {aboutData.educationSection.sectionTitle}
          </h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              {aboutData.educationSection.description}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {aboutData.educationSection.programs.map(program => (
                <li key={program._key}>{program.title}</li>
              ))}
            </ol>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-24" id="mission">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimateOnScroll variant="fade-right">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-red-700 text-white mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                {aboutData.missionVision.mission}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-left" delay={100}>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-600 text-white mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600">{aboutData.missionVision.vision}</p>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="relative py-24 overflow-hidden">
        <ACEPattern rows={5} cols={8} opacity={0.07} className="absolute top-8 left-8 hidden xl:block" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {aboutData.coreValues.sectionTitle}
            </h2>
            <p className="mt-4 text-lg text-gray-600">Guiding principles that shape our work and culture</p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.coreValues.values.map((value, i) => (
              <AnimateOnScroll key={value.title} variant="zoom" delay={i * 80}>
                <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-700 mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {aboutData.timelineSection.sectionTitle}
            </h2>
            <p className="mt-4 text-lg text-gray-600">Key milestones in our growth and development</p>
          </AnimateOnScroll>
          <AnimatedTimeline milestones={aboutData.timelineSection.milestones} />
        </div>
      </div>

      {/* Collaborations Section */}
      <div className="bg-red-50 py-20" id="collaborations">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">Collaborations</h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              To optimize productivity and value creation, the ACE is leveraging all possible partners in the local and international bioinformatics research and development ecosystem.
            </p>
            <PartnerCarousel/>
          </AnimateOnScroll>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Join Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore opportunities to study, research, or collaborate with ACE Uganda
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <Link
                href="/programs"
                className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
              >
                View Programs
              </Link>
              <Link
                href="/research"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-red-700 shadow-sm border border-red-700 hover:bg-red-50 transition-colors"
              >
                Explore Research
              </Link>
              <Link
                href="/contact"
                className="rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
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