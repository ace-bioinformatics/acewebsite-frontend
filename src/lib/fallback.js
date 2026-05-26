/**
 * Fallback data utility
 *
 * This module provides fallback data when Sanity CMS is unavailable.
 * Import and use these functions in your pages to ensure the site
 * remains functional even when the Sanity API is down.
 *
 * Usage example:
 *
 * import { getFallbackData } from '@/lib/fallback'
 *
 * async function getData() {
 *   try {
 *     const data = await client.fetch(query)
 *     return data
 *   } catch (error) {
 *     console.error('Sanity API error, using fallback data:', error)
 *     return getFallbackData('home')
 *   }
 * }
 */

import fallbackHome from '@/data/fallback-home.json'
import fallbackAbout from '@/data/fallback-about.json'
import fallbackHpc from '@/data/fallback-hpc.json'
import fallbackContact from '@/data/fallback-contact.json'
import fallbackPrograms from '@/data/fallback-programs.json'
import fallbackTeam from '@/data/fallback-team.json'
import fallbackProjects from '@/data/fallback-projects.json'
import fallbackEvents from '@/data/fallback-events.json'
import fallbackPublications from '@/data/fallback-publications.json'
import fallbackFacilities from '@/data/fallback-facilities.json'
import fallbackPartners from '@/data/fallback-partners.json'

/**
 * Fallback data registry
 * Maps data type keys to their fallback data
 */
const fallbackRegistry = {
  home: fallbackHome,
  about: fallbackAbout,
  hpc: fallbackHpc,
  contact: fallbackContact,
  programs: fallbackPrograms,
  team: fallbackTeam,
  projects: fallbackProjects,
  events: fallbackEvents,
  publications: fallbackPublications,
  facilities: fallbackFacilities,
  partners: fallbackPartners,
}

/**
 * Get fallback data for a specific page or content type
 *
 * @param {string} type - The type of data to retrieve (e.g., 'home', 'about', 'programs')
 * @returns {Object|Array|null} The fallback data or null if not found
 */
export function getFallbackData(type) {
  if (!type || typeof type !== 'string') {
    console.error('Invalid fallback data type:', type)
    return null
  }

  const data = fallbackRegistry[type.toLowerCase()]

  if (!data) {
    console.warn(`No fallback data found for type: ${type}`)
    return null
  }

  return data
}

/**
 * Get a single item from a collection by slug
 *
 * @param {string} collectionType - The collection type (e.g., 'programs', 'team')
 * @param {string} slug - The slug to search for
 * @returns {Object|null} The matching item or null if not found
 */
export function getFallbackItemBySlug(collectionType, slug) {
  const collection = getFallbackData(collectionType)

  if (!Array.isArray(collection)) {
    console.error(`Collection type "${collectionType}" is not an array`)
    return null
  }

  const item = collection.find(item => item.slug === slug)

  if (!item) {
    console.warn(`No item found with slug "${slug}" in collection "${collectionType}"`)
    return null
  }

  return item
}

/**
 * Filter collection items by a property value
 *
 * @param {string} collectionType - The collection type
 * @param {string} property - The property to filter by
 * @param {*} value - The value to match
 * @returns {Array} Array of matching items
 */
export function filterFallbackCollection(collectionType, property, value) {
  const collection = getFallbackData(collectionType)

  if (!Array.isArray(collection)) {
    console.error(`Collection type "${collectionType}" is not an array`)
    return []
  }

  return collection.filter(item => item[property] === value)
}

/**
 * Get featured items from a collection
 *
 * @param {string} collectionType - The collection type
 * @returns {Array} Array of featured items
 */
export function getFeaturedFallbackItems(collectionType) {
  return filterFallbackCollection(collectionType, 'featured', true)
}

/**
 * Wrapper function to fetch data with automatic fallback
 *
 * @param {Function} sanityFetchFn - The Sanity fetch function to try first
 * @param {string} fallbackType - The fallback data type to use if Sanity fails
 * @param {Object} options - Additional options
 * @param {boolean} options.logErrors - Whether to log errors (default: true)
 * @returns {Promise<Object|Array>} The data from Sanity or fallback
 */
export async function fetchWithFallback(sanityFetchFn, fallbackType, options = {}) {
  const { logErrors = true } = options

  try {
    const data = await sanityFetchFn()

    // If Sanity returns null or undefined, use fallback
    if (data === null || data === undefined) {
      if (logErrors) {
        console.warn(`Sanity returned no data, using fallback for: ${fallbackType}`)
      }
      return getFallbackData(fallbackType)
    }

    return data
  } catch (error) {
    if (logErrors) {
      console.error(`Sanity fetch error for ${fallbackType}:`, error.message)
      console.log(`Using fallback data for: ${fallbackType}`)
    }

    return getFallbackData(fallbackType)
  }
}

/**
 * Check if Sanity API is available
 *
 * @param {Object} client - Sanity client instance
 * @returns {Promise<boolean>} True if API is available, false otherwise
 */
export async function isSanityAvailable(client) {
  try {
    // Try a simple query to check if Sanity is responding
    await client.fetch('*[_type == "settings"][0]')
    return true
  } catch (error) {
    console.error('Sanity API is not available:', error.message)
    return false
  }
}

/**
 * Get all available fallback data types
 *
 * @returns {Array<string>} Array of available fallback data type keys
 */
export function getAvailableFallbackTypes() {
  return Object.keys(fallbackRegistry)
}

export default {
  getFallbackData,
  getFallbackItemBySlug,
  filterFallbackCollection,
  getFeaturedFallbackItems,
  fetchWithFallback,
  isSanityAvailable,
  getAvailableFallbackTypes
}
