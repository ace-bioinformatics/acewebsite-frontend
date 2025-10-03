export const settingsQuery = `*[_type == "settings"][0]`

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
    email
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
    category,
    featuredImage,
    status,
    startDate,
    endDate,
    team
  }
`

export const allPublicationsQuery = `
  *[_type == "publication"] | order(year desc) {
    _id,
    title,
    authors,
    journal,
    year,
    doi,
    url,
    abstract,
    category,
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
    requirements,
    slug,
    type,
    description,
    eligibility,
    duration,
    requirements,
  }
`