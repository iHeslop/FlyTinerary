# FlyTinerary

  FlyTinerary is an essential tool for travellers looking to visualize their adventures, in a beautiful and simple way. Use this application to visualize your flight routes, search for real-time flight data and add selected flights to personal itineraries. 

*Version 1.0 release 2023.04.04*

## Live Production Site
**https://flytinerary.onrender.com/**

## Features

Key Features:
  * Search for any airport location, either as your departure or arrival airport. 
  * Retrieve current and up to date flight information for your chosen date. (Round-Trip or One-Way)
  * Visualize your journey!
  * Add chosen flight data to custom itineraries
  * See all your saved flights visually on the globe
  * Remove flights, and update flight costs from within your itinerary

Dependencies: 
* Node JS
* Express JS
* React
* Material UI
* MySQL
* RapidAPI : Priceline com Provider

## Motivation || Inspiration
Organising a holiday is exciting, but often the planning is boring and repetitive. FlyTinerary aims to encourage adventure and reduce stress by providing a simple, no fuss UI which graphically visualizes your flights across the globe. Having all your flight information in one place and being able to update your flight information with ease, Flytinerary provides a simple, no-fuss approach to air travel. 

## Requirements
To run this code locally you will need:
* [Node.js](https://nodejs.org/en "Node.js")
* [React](https://react.dev/ "React")
* [mySQL](https://www.mysql.com/ "mySQL")

## Installation || Getting Started

To run this code locally: 

Method 1: Github Clone

```
git clone https://github.com/iHeslop/FlyTinerary.git
cd Flytinerary 

// Install the Backend: 
cd back-end
npm install

// Install the frontend:
cd front-end
npm install
```

Method 2: Docker Container (Frontend only)
* [Docker Frontend](https://hub.docker.com/r/iheslop/flytinerary_frontend)


Once installed, both methods will require a mySQL Database:
1. First create a .env file in the "flytinerary/backend" folder containing this information: 
```
DB_NAME=flytinerary
DB_USER=*your user here*
DB_PASSWORD=*your password here*
DB_HOST=localhost
DB_PORT=3306
```
2. In mySQL workbench, create a new schema called *flytinerary*.

*Remember to update the DB_USER and the DB_PASSWORD in the .env file with your local user and password*

3. Execute the SQL query in the flytinerary-queries file in this repository to set up your initial database table. 

4. FlyTinerary should be set up and ready to go! Just run ``` npm start ``` in both the back-end and front-end folders. If you can login/sign-up the database is working!


## Reference
* [Priceline com Provider API](https://rapidapi.com/tipsters/api/priceline-com-provider "Priceline com Provider API")
