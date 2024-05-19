import { API_BASE, API_LISTINGS } from '../constants.js'
import { authFetch } from '../fetch.js'

document.addEventListener('DOMContentLoaded', () => {
  const createListingForm = document.getElementById('create-listing-form')
  const descriptionInput = document.getElementById('description')
  const descriptionCounter = document.getElementById('description-counter')

  descriptionInput.addEventListener('input', () => {
    const currentLength = descriptionInput.value.length
    descriptionCounter.textContent = `${currentLength}/280`
  })

  createListingForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const mediaUrl = document.getElementById('media').value
    const deadline = document.getElementById('deadline').value

    try {
      const response = await authFetch(`${API_BASE}${API_LISTINGS}`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          media: [{ url: mediaUrl }],
          endsAt: deadline,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create listing')
      }

      const listing = await response.json()
      alert('Listing created successfully!')
      window.location.href = `listing.html?id=${listing.id}` // Redirect to the newly created listing
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Error creating listing. Please try again.')
    }
  })
})
