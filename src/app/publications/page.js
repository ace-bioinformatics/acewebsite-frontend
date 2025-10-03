import Link from 'next/link'
import { client } from '@/lib/sanity'
import { allPublicationsQuery } from '@/lib/queries'

async function getPublications() {
  const publications = await client.fetch(allPublicationsQuery)
  return publications
}

export default async function PublicationsPage({
  searchParams,
}) {
  const publications = await getPublications()

  // Pagination settings
  const ITEMS_PER_PAGE = 10
  const currentPage = Number(searchParams.page) || 1
  const totalPages = Math.ceil((publications?.length || 0) / ITEMS_PER_PAGE)
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedPublications = publications?.slice(startIndex, endIndex) || []
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Publications
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Peer-reviewed research contributing to scientific knowledge and health advancement in Africa
            </p>
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Research Output
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {publications?.length || 0} publications advancing scientific knowledge
          </p>
          {totalPages > 1 && (
            <p className="mt-2 text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, publications?.length || 0)} of {publications?.length || 0}
            </p>
          )}
        </div>

        {paginatedPublications && paginatedPublications.length > 0 ? (
          <>
            <div className="space-y-8">
              {paginatedPublications.map((pub, index) => (
                <article
                  key={pub._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                          {pub.category || 'Publication'}
                        </span>
                        <span className="text-sm text-gray-500">{pub.year}</span>
                        {pub.featured && (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {pub.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {pub.authors?.join(', ')}
                      </p>
                      
                      {pub.journal && (
                        <p className="text-sm text-gray-700 italic mb-3">
                          {pub.journal}
                        </p>
                      )}
                      
                      {pub.abstract && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {pub.abstract}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4">
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-red-700 hover:text-red-600"
                          >
                            DOI: {pub.doi}
                          </a>
                        )}
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-red-700 hover:text-red-600"
                          >
                            View Publication
                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 text-right">
                      <div className="text-3xl font-bold text-gray-200">
                        {(startIndex + index + 1).toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
                {/* Previous Button */}
                {currentPage > 1 ? (
                  <Link
                    href={`?page=${currentPage - 1}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                )}

                {/* Page Numbers */}
                <div className="hidden sm:flex gap-2">
                  {getPageNumbers().map((page, idx) => {
                    if (page === '...') {
                      return (
                        <span key={`ellipsis-${idx}`} className="px-4 py-2 text-gray-500">
                          ...
                        </span>
                      )
                    }
                    
                    const pageNum = page 
                    const isActive = pageNum === currentPage
                    
                    return (
                      <Link
                        key={pageNum}
                        href={`?page=${pageNum}`}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-red-700 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    )
                  })}
                </div>

                {/* Mobile page indicator */}
                <div className="sm:hidden px-4 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>

                {/* Next Button */}
                {currentPage < totalPages ? (
                  <Link
                    href={`?page=${currentPage + 1}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Next
                    <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                  >
                    Next
                    <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No publications available at the moment.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-red-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Collaborate with Us
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Interested in collaborative research? Let's work together to advance science
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors inline-block"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}