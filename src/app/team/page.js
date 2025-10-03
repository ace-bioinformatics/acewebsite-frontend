import { client } from '@/lib/sanity'
import { allStaffQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

async function getStaff() {
  const staff = await client.fetch(allStaffQuery)
  return staff
}

export default async function TeamPage() {
  const staff = await getStaff()

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our Team
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Meet the experts driving innovation and excellence at ACE Uganda
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {staff?.map((person) => (
            <Link
              key={person._id}
              href={`/team/${person.slug.current}`}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                {person.image ? (
                  <Image
                    src={urlFor(person.image).width(300).height(300).url()}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
                    <svg className="h-20 w-20 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">View Profile</p>
                  </div>
                </div>
              </div>
              
              {/* Name and Title */}
              <div className="mt-3 text-center">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                  {person.name}
                </h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {person.role}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}