import { API_BASE, API_LISTINGS } from '../constants.js'
import { authFetch } from '../fetch.js'
import { load } from '../../storage/load.js'
import { save } from '../../storage/save.js'

document.addEventListener('DOMContentLoaded', async () => {
  const listingDetailsContainer = document.getElementById('listing-details')

  const urlParams = new URLSearchParams(window.location.search)
  const listingId = urlParams.get('id')

  if (!listingId) {
    listingDetailsContainer.innerHTML = '<p>No listing ID found in the URL.</p>'
    return
  }

  try {
    const response = await fetch(
      `${API_BASE}${API_LISTINGS}/${listingId}?_bids=true&_seller=true`
    )
    if (!response.ok) throw new Error('Failed to fetch listing details')

    const listingData = await response.json()
    const { title, description, media, endsAt, _count, bids, seller } =
      listingData.data

    // Update the meta description dynamically
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', `Listing - ${title}`)
    }

    // Update the title dynamically
    document.title = `Listing - ${title}`

    // Find the most recent bid amount
    const highestBid =
      bids.length > 0 ? bids[bids.length - 1].amount : 'No bids yet'

    // Get the logged-in user
    const userProfile = load('profile')
    const isOwner = userProfile.data.name === seller.name

    // Render listing details
    listingDetailsContainer.innerHTML = `
          <h1 class='text-center'>${title}</h1>
      <img src="${media.length > 0 ? media[0].url : '/img/placeholder.jpeg'}" alt="${media.length > 0 ? media[0].alt : 'placeholder'}" class="img-fluid">
      <p class='mt-3'>${description}</p>
      <p>Ends at: ${new Date(endsAt).toLocaleString()}</p>
      <p>Bids: ${_count.bids}</p>
      <p>Highest bid: ${highestBid}</p>
      ${
        !isOwner
          ? `
      <h3 class='mt-4'>Place a Bid</h3>
      <form id="bid-form" class="mt-3">
        <div class="mb-3">
          <input type="number" id="bid-amount" class="form-control" placeholder="Enter your bid" min="1" required>
        </div>
        <button type="submit" class="btn btn-primary">Place Bid</button>
      </form>
      `
          : ''
      }
      <h2 class='mt-4'>Bid History</h2>
      <ul id='bid-history' class='list-group'></ul>
    `

    // Populate the bid history
    const bidHistoryContainer = document.getElementById('bid-history')
    if (bids.length > 0) {
      // Sort bids by date in descending order
      const sortedBids = bids.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      )
      sortedBids.forEach((bid) => {
        const bidItem = document.createElement('li')
        bidItem.className = 'list-group-item'
        bidItem.innerHTML = `Bidder: ${bid.bidder.name}<br>Amount: ${bid.amount}<br>Date: ${new Date(bid.created).toLocaleString()}`
        bidHistoryContainer.appendChild(bidItem)
      })
    } else {
      bidHistoryContainer.innerHTML =
        '<li class="list-group-item">No bids yet</li>'
    }

    if (!isOwner) {
      // Handle bid submission
      const bidForm = document.getElementById('bid-form')
      bidForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const bidAmount = parseFloat(
          document.getElementById('bid-amount').value
        )

        if (userProfile.data.credits < bidAmount) {
          alert('Insufficient credits to place this bid.')
          return
        }

        try {
          const bidResponse = await authFetch(
            `${API_BASE}${API_LISTINGS}/${listingId}/bids`,
            {
              method: 'POST',
              body: JSON.stringify({ amount: bidAmount }),
            }
          )

          if (!bidResponse.ok) throw new Error('Failed to place bid')

          // Update user credits
          userProfile.data.credits -= bidAmount
          save('profile', userProfile)

          alert('Bid placed successfully!')
          location.reload()
        } catch (error) {
          console.error('Error placing bid:', error)
          alert('Error placing bid. Please try again.')
        }
      })
    }
  } catch (error) {
    console.error('Error fetching listing details:', error)
    listingDetailsContainer.innerHTML = '<p>Failed to load listing details.</p>'
  }

  // Hide loadingscreen
  const loadingScreen = document.getElementById('loading-screen')
  loadingScreen.style.display = 'none'
})
