# Weather-App

Weather App (Root Folder)

-- Sub Folders
frontend
backend

-- Steps For Running the Project:
After cloning the Repository->
Make sure you have Node and npm installed in the local system.

1. Run Command -> 'npm install' (at the root folder)
   This will install all the required dependencies

2. Once all the dependencies are installed-
   Run Command -> 'npm run dev' (at the root folder)

This will start running the server for Frontend and Backend Both

For Frontend
The App will start running default on PORT 3000
Hit this URL in the browser
http://localhost:3000

For Backend
The Server will start running default on PORT 8001

Once both the servers are running-

On the Frontend,
Enter any city name, and then Check For Weather for that city.

On the Backend,
Caching is done after getting response from the OpenWeatherMap service,
So if a subsequent request comes for a cached city, then return Response from the Cached Data
so for a particular city , the cached value will be it's response.
The Caching Expiry will be 10 mins for now.
