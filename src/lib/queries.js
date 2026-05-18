export const settingsQuery = `*[_type == "settings"][0]`

export const allBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "featuredImage": images[0] { "url": asset->url },
    "author": author->{ name, "image": image }
  }
`

export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    images[] { "url": asset->url },
    "author": author->{ name, role, bio, "image": image }
  }
`

export const allBlogSlugsQuery = `*[_type == "blogPost"]{ "slug": slug.current }`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  socials,
  contactEmail,
  address
}`

export const heroSlidesQuery = `
  *[_type == "heroSlide" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    category,
    image,
    ctaText,
    ctaLink,
    order
  }
`
export const allStaffQuery = `*[_type == "person"] | order(order asc, name asc) {
  _id,
  name,
  slug,
  role,
  staffCategory,
  bio,
  image,
  email,
  order
}`

export const personBySlugQuery = `
  *[_type == "person" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    department,
    bio,
    image,
    email,
    linkedin,
    twitter
  }
`

export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt
  }
`

export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    featuredImage,
    category,
    publishedAt
  }
`

export const allProjectsQuery = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    thematicArea,
    featuredImage,
    status
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    abstract,
    category,
    thematicArea,
    featuredImage,
    status,
    startDate,
    endDate,
    team,
    funders,
    "pi": pi->{ name, role, slug }
  }
`

export const allPublicationsQuery = `
  *[_type == "publication"] | order(date desc) {
    _id,
    title,
    authors,
    journal,
    "year": date[0..3],
    date,
    doi,
    url,
    abstract,
    type,
    thematicArea,
    featured
  }
`

export const allProgramsQuery = `
  *[_type == "academicProgram"] | order(level) {
    _id,
    slug,
    type,
    description,
    duration,
  }
`

export const programBySlugQuery = `
  *[_type == "academicProgram" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    type,
    description,
    eligibility,
    duration,
    requirements,
    researchActivities[] {
      _key,
      title,
      description,
      photos[] {
        ...,
        "url": asset->url,
        caption
      }
    }
  }
`

// Query for all upcoming events
export const upcomingEventsQuery = `
  *[_type == "event" && isPast == false && date >= now()] | order(date asc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for all past events
export const pastEventsQuery = `
  *[_type == "event" && (isPast == true || date < now())] | order(date desc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for event highlights
export const eventHighlightsQuery = `
  *[_type == "eventHighlight"] | order(order asc, date desc) {
    _id,
    title,
    description,
    date,
    category,
    badge,
    "image": image.asset->url,
    stats,
    keyPoints
  }
`

// Query for a single event by slug
export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current,
    gallery[] {
      "url": asset->url,
      caption,
      "dimensions": asset->metadata.dimensions
    }
  }
`

// Query for featured events
export const featuredEventsQuery = `
  *[_type == "event" && featured == true && isPast == false] | order(date asc) [0...3] {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for events by category
export const eventsByCategoryQuery = `
  *[_type == "event" && category == $category] | order(date desc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`

// Query for all events (for filtering on client-side)
export const allEventsQuery = `
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    description,
    date,
    category,
    location,
    "image": image.asset->url,
    isPast,
    speakers,
    topics,
    capacity,
    registrationLink,
    "detailsLink": "/events/" + slug.current
  }
`