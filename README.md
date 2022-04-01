### Overview

The provided codebase is a simple MERN application called “Our Places”. A user can sign up to create a profile in the app. Once the profile is created, the user can log in and create a “Place” record under their own profile. A Place record includes a place title, a description, a picture and an address. Note that the address verification takes places via the call to the Google Maps API.  The record owner can also edit their records (some fields) and delete their own records. Users can only see their own records and not the records created by other users. 

### Env

You will need to get a Google api token(GOOGLE_API_TOKEN) from https://developers.google.com/maps/documentation/embed/get-api-key, and put it in 2 places in this project. This API token allows verifying  the address that user enters on the "Create a Place" form via the Google Maps verification service, and also allows the front-end to find and display the location on the map based on the geominfo that is stored in the db.

**You will need to include the mongodb address and the credential in the call to the API.**

#### Run Locally

##### DB

- This application support mongoDB, you can find schema in `/backend/models`.
- Before invoking the API, you will need to have a mongodb setup and provide its credential to `/backend/app.js` => mongoose connection
- You can find information about setting up MongoDB in [this documentation](https://hub.docker.com/_/mongo) in DockerHub and on the [MondoDB website](https://docs.cloudmanager.mongodb.com/tutorial/nav/manage-hosts/).

##### Run api

- go to the backend folder `cd backend`
- install the dependency `npm install`
- run express api `npm start`

##### Run React front-end

- go to the backend folder `cd frontend`
- install the dependency `npm install`
- run express api `npm start`
