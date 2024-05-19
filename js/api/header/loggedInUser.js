import { load } from '../../storage/load.js'

// Function to set the profile avatar
const setProfileAvatar = () => {
  const profileAvatar = document.getElementById('profile-avatar')
  if (!profileAvatar) return

  const iconElement = profileAvatar.querySelector('i')
  if (!iconElement) return

  const profileData = load('profile') // Load the profile data from storage

  const profileLink = profileAvatar.querySelector('a')
  if (profileData && profileData.data.avatar && profileData.data.avatar.url) {
    profileLink.href = '../../../profile/profile.html' // Set link to profile page
    // Remove existing icon classes
    iconElement.className = ''
    // Add image tag inside the anchor tag
    const img = document.createElement('img')
    img.src = profileData.data.avatar.url
    img.alt = profileData.data.avatar.alt
    img.className = 'rounded-circle'
    profileLink.appendChild(img)
  } else {
    profileLink.href = '../../../login/login.html' // Set link to login page
  }
  profileAvatar.classList.remove('d-none') // Make the avatar visible
}

setProfileAvatar()

// Show navbar content that is only visible to a logged in user
const showLoggedInContent = () => {
  const loggedInContent = document.querySelectorAll('.logged-in')
  if (!loggedInContent) return

  const profileData = load('profile') // Load the auth token from storage
  if (profileData) {
    loggedInContent.forEach((element) => {
      element.classList.remove('d-none') // Show the element
    })
  }
}

showLoggedInContent()

// Log out and clear local storage
const logout = () => {
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    window.location.href = '../../../index.html'
  })
}

logout()
