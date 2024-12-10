import WeatherController from "../controllers/weather.controller"

const express = require("express")
const weatherRouter = express.Router()

weatherRouter.get("/check-weather",WeatherController.getWeatherDetails)


export default weatherRouter