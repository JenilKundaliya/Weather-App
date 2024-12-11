# Weather-App

Clone the 'main' Branch of the Repository

Weather App (Root Folder)

-- Sub Folders
frontend
backend

-- Steps For Running the Project:
After cloning the Repository->
Make sure you have Node and npm installed in the local system.

## Backend Setup

In the CLI

1. Move to the 'backend' directory

2. Run Command ->

## 'npm install'

This will install all the required dependencies for the Backend

3. Once all the dependencies are installed run command

## 'npm start'

This will start running the server for Backend.
The Server will start running default on PORT 8001

# Frontend Setup

In the CLI

1. Move to the 'frontend' directory

2. Run Command ->

## 'npm install'

This will install all the required dependencies for the Frontend

3. Once all the dependencies are installed-
   Run Command ->

## 'npm start'

-- This will start running the server for Frontend
The App will start running default on PORT: 3005
--Local URL for FE =>

http://localhost:3005

Once both the servers are running-

-- On the Frontend,
Enter any city name, and then Check For Weather for that city.

-- On the Backend,
--OpenWeatherMap Service is used to fetch weather data.
API Used ->
`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${this.apiKey}&units=metric`;

--Caching is done after getting response from the OpenWeatherMap service
--So if a subsequent request comes for a cached city, then return Response from the Cached Data
--so for a particular city , the cached value will be it's response.
--The Caching Expiry is 10 mins for now.

Tech Stack:
FE: ReactJS

BE: NodeJS, ExpressJS
