import { API_BASE, API_PROFILE } from '../constants.js'
import { authFetch } from '../fetch.js'
import { save } from '../../storage/save.js'
import { load } from '../../storage/load.js'

/**
 * Fetches the profile data for the logged-in user.
 * @param {string} profileName - The name of the profile to fetch.
 * @returns {Promise<object>} - The profile data.
 */

const profileName = load('profileData')

export async function fetchProfile(profileName) {
  const response = await authFetch(`${API_BASE}${API_PROFILE}/${profileName}`)

  if (response.ok) {
    const profileData = await response.json()
    save('profile', profileData)
    return profileData
  }

  throw new Error('Could not fetch profile data')
}

/**
 * Fetches the listings created by the logged-in user.
 * @param {string} username - The username of the logged-in user.
 * @returns {Promise<object>} - The user's listings data.
 */
export async function fetchUserListings(username) {
  const response = await authFetch(
    `${API_BASE}${API_PROFILE}/${username}/listings`
  )

  if (response.ok) {
    const listingsData = await response.json()
    return listingsData.data
  }

  throw new Error('Could not fetch user listings')
}

/**
 * Updates the user's avatar URL.
 * @param {string} profileName - The name of the profile to update.
 * @param {string} avatarUrl - The new avatar URL.
 * @returns {Promise<void>}
 */
async function updateAvatar(profileName, avatarUrl, avatarAlt) {
  const response = await authFetch(`${API_BASE}${API_PROFILE}/${profileName}`, {
    method: 'PUT',
    body: JSON.stringify({ avatar: { url: avatarUrl, alt: avatarAlt } }),
  })

  if (!response.ok) {
    throw new Error('Could not update the avatar')
  }

  const updatedProfile = await response.json()
  save('profile', updatedProfile)
  return updatedProfile
}

document.addEventListener('DOMContentLoaded', async () => {
  const profileContainer = document.querySelector('.profile-container')
  const profileData = load('profile')

  if (!profileData) {
    profileContainer.innerHTML = '<p>No profile data found. Please log in.</p>'
    return
  }

  // Create elements to display profile data
  const avatar = document.createElement('img')
  avatar.src = profileData.data.avatar.url
  avatar.alt = profileData.data.avatar.alt
  avatar.className = 'rounded-circle'

  const username = document.createElement('p')
  username.textContent = `@${profileData.data.name}`
  username.className = 'mt-2'

  const icon = document.createElement('i')
  icon.className = 'fa-light fa-credit-card fs-1 text-primary'

  const credits = document.createElement('p')
  credits.textContent = `Credits: ${profileData.data.credits}`

  // Append elements to the profile container
  profileContainer.appendChild(avatar)
  profileContainer.appendChild(username)
  profileContainer.appendChild(icon)
  profileContainer.appendChild(credits)

  const profileAvatar = document.getElementById('profile-avatar')
  const saveAvatarButton = document.getElementById('save-avatar')

  saveAvatarButton.addEventListener('click', async () => {
    const avatarUrl = document.getElementById('avatar-url').value
    const avatarAlt = 'User avatar'
    if (avatarUrl) {
      try {
        const updatedProfile = await updateAvatar(
          profileData.data.name,
          avatarUrl,
          avatarAlt
        )
        profileAvatar.src = updatedProfile.data.avatar.url
        profileAvatar.alt = updatedProfile.data.avatar.alt
        const avatarModal = bootstrap.Modal.getInstance(
          document.getElementById('avatarModal')
        )
        avatarModal.hide()
        location.reload()
      } catch (error) {
        console.error('Error updating avatar:', error)
        alert('Error updating avatar. Please try again.')
      }
    }
  })

  try {
    const userListings = await fetchUserListings(profileData.data.name)
    const listingsContainer = document.createElement('div')
    listingsContainer.className = 'row gap-2 mt-2 mx-2'
    const listingsSection = document.querySelector('section')

    userListings.forEach((listing) => {
      const col = document.createElement('div')
      col.className =
        'col p-3 bg-body-secondary text-center d-flex flex-column justify-content-between'

      const title = document.createElement('h3')
      title.textContent = listing.title

      const img = document.createElement('img')
      const media =
        listing.media && listing.media.length > 0
          ? listing.media[0]
          : { url: '/img/placeholder.jpeg', alt: 'placeholder' }
      img.src = media.url
      img.alt = media.alt
      img.className = 'listing-img img-fluid'

      const currentBidAmount =
        listing.bids && listing.bids.length > 0
          ? listing.bids[listing.bids.length - 1].amount
          : 'No bids'

      const bid = document.createElement('p')
      bid.className = 'mb-0 mt-2 text-start'
      bid.textContent = `Current bid: ${currentBidAmount}`

      const deadline = document.createElement('p')
      deadline.className = 'text-start mb-0'
      deadline.textContent = 'Deadline:'

      const deadlineTwo = document.createElement('p')
      deadlineTwo.className = 'text-start'
      deadlineTwo.textContent = new Date(listing.endsAt).toLocaleString()

      const link = document.createElement('a')
      link.href = `../../../listings/listing.html?id=${listing.id}`
      link.className = 'btn btn-primary mt-auto'
      link.textContent = 'See more'

      col.appendChild(title)
      col.appendChild(img)
      col.appendChild(bid)
      col.appendChild(deadline)
      col.appendChild(deadlineTwo)
      col.appendChild(link)

      listingsContainer.appendChild(col)
    })

    listingsSection.appendChild(listingsContainer)
  } catch (error) {
    console.error('Error fetching user listings:', error)
    const listingsSection = document.querySelector('section')
    listingsSection.innerHTML += '<p>Failed to load user listings.</p>'
  }
})
