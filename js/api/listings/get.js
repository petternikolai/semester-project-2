import {
  API_BASE,
  API_LISTINGS,
  API_QUERY_SELLER,
  API_QUERY_BIDS,
} from '../constants.js'
import { authFetch } from '../fetch.js'

/**
 * Retrieves a list of posts from the server.
 * @returns {Promise<object>} A promise that resolves to the response data containing the posts.
 * @throws {Error} If the request fails or an error occurs during retrieval.
 */
export async function getListings() {
  let url = `${API_BASE}${API_LISTINGS}?${API_QUERY_SELLER}&${API_QUERY_BIDS}&_active=true`
  const response = await authFetch(url)
  return await response.json()
}

export async function searchListings(query) {
  const response = await fetch(
    `${API_BASE}/auction/listings/search?q=${encodeURIComponent(query)}`,
    {
      method: 'GET',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch search results')
  }

  const data = await response.json()

  // Client-side filtering for whole word matches
  const wordBoundaryRegex = new RegExp(`\\b${query}\\b`, 'i')
  const filteredResults = data.data.filter(
    (listing) =>
      wordBoundaryRegex.test(listing.title) ||
      wordBoundaryRegex.test(listing.description)
  )

  return { data: filteredResults }
}
