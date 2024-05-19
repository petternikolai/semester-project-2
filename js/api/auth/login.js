import { save } from '../../storage/save.js'
import { API_AUTH, API_BASE, API_LOGIN, API_PROFILE } from '../constants.js'
import { authFetch } from '../fetch.js'

/**
 * Logs in the user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} A promise that resolves to the user profile data upon successful login.
 * @throws {Error} If login fails.
 */
export async function login(email, password) {
  const response = await authFetch(API_BASE + API_AUTH + API_LOGIN, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data
    save('token', accessToken)

    // Fetch the complete profile data
    const profileResponse = await authFetch(
      `${API_BASE}${API_PROFILE}/${profile.name}`
    )
    if (profileResponse.ok) {
      const completeProfile = await profileResponse.json()
      save('profile', completeProfile) // Save the complete profile data
      return completeProfile
    } else {
      throw new Error('Could not fetch complete profile data')
    }
  }

  throw new Error('Could not log in the account')
}

const loadingScreen = document.getElementById('loading-screen')
loadingScreen.style.display = 'flex' // Show the loading screen

document.addEventListener('DOMContentLoaded', () => {
  loadingScreen.style.display = 'none'
  const loginForm = document.getElementById('login-form')
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try {
      const profile = await login(email, password)
      window.location.href = '/semester-project-2/index.html' // Redirect on successful login
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials and try again.')
    }
  })

  const element = document.getElementById('back-link')
  element.setAttribute('href', document.referrer)
  element.onclick = function () {
    history.back()
    return false
  }

  const header = document.querySelector('header')
  const root = document.documentElement

  function updateHeaderHeight() {
    const headerHeight = header.offsetHeight
    root.style.setProperty('--header-height', `${headerHeight}px`)
  }

  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)
})
