### Overview

The provided codebase is a simple MERN application called “Our Places”. A user can sign up to create a profile in the app. Once the profile is created, the user can log in and create a “Place” record under their own profile. A Place record includes a place title, a description, a picture and an address. Note that the address verification takes places via the call to the Google Maps API.  The record owner can also edit their records (some fields) and delete their own records. Users can only see their own records and not the records created by other users. 

### Env

You will need to get a Google api token(GOOGLE_API_TOKEN) from https://developers.google.com/maps/documentation/embed/get-api-key, and put it in 2 places in this project. This API token allows verifying  the address that user enters on the "Create a Place" form via the Google Maps verification service, and also allows the front-end to find and display the location on the map based on the geominfo that is stored in the db.

**You will need to include the mongodb address and the credential in the call to the API.**

#### Run Web App

This project can be run with docker compose. Start the project from the code-challenge-1 root directory with the following:
- docker-compose up (use --build --force-recreate if necessary)

- you will need to fill out the environment variables in the .env file in the code-challenge-1 folder to run with docker-compose.
- you will need to fill out the environment variables in the .env files in the sub project folders to run otherwise.

#### Run Locally

##### DB

This application support mongoDB, you can find schema in `/backend/models`.
The application is hardcoded to connect to a mongodb Atlas instance. You can change the connection string to connect to a different instance.

if you would like to run the project without docker compose, both the backend and front end can be run as individual docker images,
or with npm as follows:

##### Run api

- go to the backend folder `cd backend`
- install the dependency `npm install`
- run express api `npm start`

##### Run React front-end

- go to the backend folder `cd frontend`
- install the dependency `npm install`
- run express api `npm start`

##### linting

This project has linting enabled, using eslint. run 'npm lint <file>' to perform linting.

##### deployment

For purposes of this code challenge demo, this project was deployed to Azure. the site can be viewed at https://ourplaceswebapp.azurewebsites.net/.
To deploy, the docker image was pushed for each project to an Azure Container Registry (ACR). A Web App Service and Web Apps were created to host
the images, deployed from the ACR. Further instructions can be found in the [azure documentation](https://docs.microsoft.com/en-us/azure/app-service/tutorial-custom-container): 

Please email me for user information. (Google API calls aint free! ;) )