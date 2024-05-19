# Auction House - Hammerdrop

This is the official repository for Hammerdrop, an online auction website where users can list items for auction, place bids, and manage their profiles.

## Features

- **User Authentication**: Register, log in, and log out.
- **Profile Management**: Update avatar, bio, and view credits.
- **Listings**: Create, view, and search for auction listings.
- **Bidding**: Place bids on active listings.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: API (provided by Noroff)
- **Libraries**: Bootstrap, FontAwesome

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/semester-project-2.git
   cd semester-project-2

   ```

2. Open index.html in your preferred browser to view the website locally.

## Usage

### Authentication

- **Login**: Navigate to the login page and enter your credentials.
- **Register**: Create a new account if you don't have one.

## Profile Management

- **Update Avatar**: Click on the camera icon on your profile picture, enter the new image URL, and save.
- **View Listings**: See all your active and past listings under the "Listings" section of your profile.

## Creating Listings

1. Navigate to "List an item" in the navbar.
2. Fill out the form with the title, description, media URL, and deadline.
3. Submit to create the listing.

## Bidding

1. View an item listing.
2. Enter your bid amount in the "Place a Bid" section.
3. Ensure you have sufficient credits and submit your bid.

## Development

### Running Locally

Ensure you have a local server setup (like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VSCode).

## API

This project utilizes the Noroff Auction API. Refer to the [API documentation](https://docs.noroff.dev/docs/v2/auction-house/listings) for more details.

## GitHub Actions

This project is set up to use GitHub Actions for CI/CD. The workflow is defined in .github/workflows/deploy.yml.

## Workflow Configuration

1. Ensure you have a GitHub Pages branch (e.g., gh-pages).
2. Configure the GitHub Actions workflow in .github/workflows/deploy.yml.
   Here's a basic example of a GitHub Actions workflow configuration:

```
name: Deploy to GitHub Pages

on:
push:
branches: - main

jobs:
build:
runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

This markdown file includes all the necessary steps and details for setting up, using, and developing the Hammerdrop project. It also includes a section on GitHub Actions for CI/CD deployment.

## License

N/A

## Contact

For any inquiries or support, please contact me at pnkristoffersen@gmail.com.
