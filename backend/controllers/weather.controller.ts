import OpenWeatherMap from "../services/OpenWeatherMap.services";
import ApiClient from "../utils/axiosInstance";
import { NextFunction, Request, Response } from "express";
interface getWeatherQuery {
  city?: string;
}
import CacheService from "../config/nodeCache";
const weatherCache = CacheService.getInstance();
class Weather extends ApiClient {
  private static instance: Weather;

  //For Getting Weather Details
  getWeatherDetails = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      let { city }: getWeatherQuery = req.query;
      if (!city) {
        return res
          .status(400)
          .json({ code: 400, message: "City Name is Required" });
      }

      //checking if exists in the cache
      if (weatherCache.get(city)) {
        let cachedData = weatherCache.get(city);
        return res.status(200).json({
          code: 200,
          message: "Weather Data Fetched Succesfully",
          data: cachedData,
        });
      }

      //Open Weather Map Service
      const OpenWeatherMapService = await new OpenWeatherMap();
      let weatherData: any = await OpenWeatherMapService.getWeather(
        city?.toString()
      );

      //error
      if (!weatherData.success) {
        return res.status(400).json({
          code: 400,
          error:
            "Something Went Wrong! There's some problem fetching data for this City or Enter a Valid City Name.",
        });
      }

      //success response
      return res.status(200).json({
        code: 200,
        message: "Weather Data Fetched Succesfully",
        data: weatherData?.data,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(400).json({
        code: 400,
        error:
          "Something Went Wrong! There's some problem fetching data for this City or Please Enter a Valid City Name.",
      });
    }
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
