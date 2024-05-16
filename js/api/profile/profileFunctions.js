import { API_BASE, API_PROFILE } from '../constants.js'
import { headers } from '../headers.js'

const token = localStorage.getItem('token') // Retrieve the stored auth token
const profile = JSON.parse(localStorage.getItem('profileData'))
const urlName = profile.name

/**
 * Retrieves and displays the user's profile information.
 * @returns {Promise<object|null>} A promise that resolves to the user's profile data if successful, otherwise null.
 */
export async function fetchUserProfile() {
  try {
    const response = await fetch(API_BASE + API_PROFILE + '/' + urlName, {
      method: 'GET',
      headers: headers(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile: ' + response.statusText)
    }

    const profileData = await response.json()
    localStorage.setItem('profileData', JSON.stringify(profileData.data)) // Store the profile data
    displayUserProfile(profileData.data)

    // Fetch posts made by the user
    await fetchUserPosts(profileData.data.id) // Await the result

    return profileData.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}
