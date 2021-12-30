# OpenStreetMap to GeoJSON with Express and React

This application is used to acquire OSM data from the OpenStreetMap API and converting the data to GeoJSON using `osmtogeojson` Node.js package

## Running the application

To run the application, you need to have Node.js or Docker installed on your machine

### Running with Docker (Simplest Way)

To run with Docker run `docker-compose up` from the root of the application (Where the docker-compose file is located)

You can then access the server and client on ports `5000` and `3000` respectively from your browser

### Running with Node.js

To run locally with Node.js installed on on your machine, you need:

- Node.js v14+
- Redis (throws an error is Redis is not installed)

#### Steps to run app with Node.js locally

##### Running the server

```bash
  # Running the server
  # Go into server folder
  cd server

  # Install dependencies
  yarn # yarn should be installed (preffered)
  npm install # to install with npm

  # Run server
  yarn dev # with npm
  npm run dev # with npm

```

##### Running the client

```bash
  # Running the client
  # Go into client folder
  cd client

  # Install dependencies
  yarn # yarn should be installed (preffered)
  npm install # to install with npm

  # Run server
  yarn dev # with npm
  npm run dev # with npm

  # access from your browser on port 3000
```
