
# FoodFire - Nuxt2.x + Fireabase + Vue2.x

## Static Generated Progressive e-commerce app using NuxtJS + Firebase

![Home Page Image](https://github.com/itswadesh/foodfire/blob/master/static/screenshots/home.jpg?raw=true)
![Cart Image](https://github.com/itswadesh/foodfire/blob/master/static/screenshots/cart.jpg?raw=true)
![Order Processing Page](https://github.com/itswadesh/foodfire/blob/master/static/screenshots/orders.jpg?raw=true)

## Quick start
> Make sure you have **Node** version >= 10.x, **NPM** >= 6.x
> Yarn version >= 1.x
> Clone the repo

### navigate inside the directory
```bash
cd foodfire
```
### install the dependencies with npm
`yarn`

### serve with hot reload at localhost:3000
`yarn dev`

## Deploy to Netlify
### Getting Started
> Press the "New site from Git" button on the Netlify dashboard. Authenticate with your repository host, select a repository to deploy, and continue. You should land on step 3: "Build options, and deploy!"

### Configure:
> Branch to deploy: `master`, or which-ever branch you prefer

> Build command: `npm run generate`

> Publish directory: `dist`

> Add additional ENV variables via the "Advanced" button

```
NODE_VERSION: 10.11.0
YARN_VERSION: 1.10.1
```

## Features

### Coding & Deployment
  - Using firebase `firestore` database with realtime update
  - Single page progressive ecommerce app using VueJs
  - Offline enabled
  - Progressive images with lazy loading
  - All assets(js,css,images) are precached for a faster user experience
  - Modular coding structure
  - Auto deploy to Netlify production server
  - Better and cleaner JavaScript code
  - Simplified installation and configuration
  - Reliable: Load fast and provide offline experience
  - Fast: Respond quickly to user actions
  - Engaging: Feel like a native app on mobile devices

### Store Front
  - Checkout using COD
  - Customer Address
  - Responsive store front
  - Dynamic Page Titles
  - Firebase authentication system (Login with google)