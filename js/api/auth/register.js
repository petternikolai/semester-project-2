import { API_AUTH, API_BASE, API_REGISTER } from '../constants.js'
import { authFetch } from '../fetch.js'

/**
 * Registers a new user with the provided name, email, and password.
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} A promise that resolves to the response data upon successful registration.
 * @throws {Error} If registration fails.
 */
export async function register(name, email, password) {
  const response = await authFetch(API_BASE + API_AUTH + API_REGISTER, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error('Could not register the account')
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen')
  loadingScreen.style.display = 'none' // Hide the loading screen

  const form = document.querySelector('form[name="auth"]')
  form.addEventListener('submit', async (event) => {
    event.preventDefault() // Prevent default form submission

    loadingScreen.style.display = 'flex' // Show the loading screen

    const name = form.elements['name'].value
    const email = form.elements['email'].value
    const password = form.elements['password'].value

    try {
      const data = await register(name, email, password)
      window.location.href = '/login/login.html' // Redirect on successful registration
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed: ' + error.message) // Display an error message
    } finally {
      loadingScreen.style.display = 'none' // Hide the loading screen
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
