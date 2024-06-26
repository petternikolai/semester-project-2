import { getListings, searchListings } from './get.js'
import { load } from '../../storage/load.js'

export async function fetchAndRenderListings(query = '') {
  const loadingScreen = document.getElementById('loading-screen')
  loadingScreen.style.display = 'flex' // Show the loading screen

  try {
    const data = query ? await searchListings(query) : await getListings()

    // Sort the listings by created date in descending order
    data.data.sort((a, b) => new Date(b.created) - new Date(a.created))

    const listingContainer = document.getElementById('listing-container')

    if (!listingContainer) {
      console.error('Listing container not found')
      return
    }

    listingContainer.innerHTML = '' // Clear existing listings
    let row
    const imagePromises = []

    if (data.data.length === 0) {
      listingContainer.innerHTML =
        '<p class="text-center">No listings found...</p>'
    } else {
      data.data.forEach((listing, index) => {
        if (index % 2 === 0) {
          row = document.createElement('div')
          row.className = 'row gap-2 mt-2'
          listingContainer.appendChild(row)
        }
        const col = createListing(listing)
        row.appendChild(col)

        const img = col.querySelector('img')
        if (img) {
          const imgLoadPromise = new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = () => {
              img.src = '/semester-project-2/img/placeholder.jpeg'
              resolve()
            }
          })
          imagePromises.push(imgLoadPromise)
        }
      })
    }

    await Promise.all(imagePromises)
    loadingScreen.style.display = 'none'

    // Show or hide the "Go Back" button
    const goBackButton = document.getElementById('go-back-button')
    if (query) {
      goBackButton.classList.remove('d-none')
    } else {
      goBackButton.classList.add('d-none')
    }
  } catch (error) {
    console.error('Error fetching listings:', error)
    loadingScreen.style.display = 'none'
  }
}

function createListing(listing) {
  const col = document.createElement('div')
  col.className =
    'col p-3 bg-body-secondary text-center d-flex flex-column justify-content-between overflow-x-hidden'

  const title = document.createElement('h2')
  title.textContent = listing.title

  const img = document.createElement('img')
  const media =
    listing.media && listing.media.length > 0
      ? listing.media[0]
      : {
          url: '/semester-project-2/img/placeholder.jpeg',
          alt: 'placeholder',
        }
  img.src = media.url
  img.alt = media.alt
  img.className = 'listing-img img-fluid'

  // Find the most recent bid amount
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
  link.href = '#'
  link.className = 'btn btn-primary mt-auto'
  link.textContent = 'See more'
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const profileData = load('profile')
    if (profileData) {
      window.location.href = `/semester-project-2/listings/listing.html?id=${listing.id}`
    } else {
      alert('You need to be logged in to see more details.')
      window.location.href = '/semester-project-2/login/login.html'
    }
  })

  col.appendChild(title)
  col.appendChild(img)
  col.appendChild(bid)
  col.appendChild(deadline)
  col.appendChild(deadlineTwo)
  col.appendChild(link)

  return col
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderListings()

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchInput = document.getElementById('search-input')
    const query = searchInput.value.trim()
    fetchAndRenderListings(query)

    // Clear the search input field
    searchInput.value = ''

    // Close the navbar collapse after search
    const navbarToggler = document.getElementById('navbarTogglerDemo02')
    if (navbarToggler.classList.contains('show')) {
      navbarToggler.classList.remove('show')
    }
  })

  const goBackButton = document.getElementById('go-back-button')
  goBackButton.addEventListener('click', () => {
    goBackButton.classList.add('d-none')
    fetchAndRenderListings()
  })
})
