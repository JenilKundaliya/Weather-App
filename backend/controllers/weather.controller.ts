import OpenWeatherMap from "../services/OpenWeatherMap.services";
import ApiClient from "../utils/axiosInstance";
import { NextFunction, Request, Response } from "express";
interface getWeather {
  city_name?: String;
}
class Weather extends ApiClient {
  private static instance: Weather;

  //For Getting Weather Details
  getWeatherDetails = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      let { city_name }: getWeather = req.query;
      if (!city_name) {
        res.status(400).json({ code: 400, message: "City Name is Required" });
      }
      const OpenWeatherMapService = new OpenWeatherMap();
      let weatherData: any = OpenWeatherMapService.getWeather(city_name);
      if (!weatherData.success) {
        res.status(400).json({ code: 400, error: weatherData?.error });
      }
      res.status(200).json({
        code: 200,
        message: "Weather Data Fetched Succesfully",
        data: weatherData?.data,
      });
    } catch (err: any) {}
  };
  static getInstance(): Weather {
    if (!Weather.instance) {
      Weather.instance = new Weather();
    }
    return Weather.instance;
  }
}
const WeatherController = Weather.getInstance();
export default WeatherController;
