#Our Places web app
#linux x64

FROM node:current-alpine

#Create directory in container image for app code
RUN mkdir -p /usr/src/app

#Copy app code to working directory
COPY . /usr/src/app

#Set working directory
WORKDIR /usr/src/app
#WORKDIR /backend

RUN npm install

#COPY . .

#CMD npm start
ENTRYPOINT ["node", "app.js"]