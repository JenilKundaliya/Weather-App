import ApiClient from "../utils/axiosInstance";
import CacheService from "../config/nodeCache";
const weatherCache = CacheService.getInstance();
class OpenWeatherMap extends ApiClient {
  private apiKey: String =
    process.env.OPEN_WEATHER_APP_APIKEY || "140614cebc1dcbd6d1122a62087e9c51";
  constructor() {
    super();
  }
  getWeather = async (city_name: string | undefined) => {
    //url for fetching weather from openweathermap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${this.apiKey}&units=metric`;
    try {
      // Send request to the weather API
      const weatherResponse: any = await this.get(url);
      if (weatherResponse.cod !== 200) {
        console.log("weatherweatherresponse", weatherResponse);
        return {
          success: false,
          error: { message: `City Not Found ${weatherResponse?.statusText}` },
        };
      }
      //setting the city -> response in the weathercache instance
      if (city_name) {
        weatherCache.set(city_name, weatherResponse, 600);
      }
      return {
        success: true,
        data: weatherResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error,
      };
      // Display error message
    }
  };
}
export default OpenWeatherMap;
