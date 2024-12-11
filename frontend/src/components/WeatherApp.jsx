import React, { useState } from "react";
import { Sun, Cloud, CloudRain } from "lucide-react";
import axios from "axios";
const WEATHER_APP_API_BASE_URL =
  process.env.WEATHER_APP_API_BASE_URL ||
  `http://localhost:${process.env.SERVER_PORT || 8001}/api/v1`;
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");
  const [isCheckValid, setIsCheckValid] = useState(false);
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01d": <Sun size={64} className="bg-white text-yellow-500" />,
      "01n": <Sun size={64} className="text-gray-600" />,
      "02d": <Cloud size={64} className="text-gray-400" />,
      "02n": <Cloud size={64} className="text-gray-600" />,
      "03d": <Cloud size={64} className="text-gray-500" />,
      "03n": <Cloud size={64} className="text-gray-600" />,
      "04d": <Cloud size={64} className="text-gray-600" />,
      "04n": <Cloud size={64} className="text-gray-600" />,
      "09d": <CloudRain size={64} className="text-blue-500" />,
      "09n": <CloudRain size={64} className="text-gray-600" />,
      "10d": <CloudRain size={64} className="text-blue-500" />,
      "10n": <CloudRain size={64} className="text-gray-600" />,
    };
    return iconMap[iconCode] || <Sun size={64} className="text-yellow-500" />;
  };

  const fetchWeatherData = async () => {
    setIsCheckValid(true);
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setIsCheckValid(false);
    try {
      const response = await axios.get(
        `${WEATHER_APP_API_BASE_URL}/weather/check-weather?city=${city}`
      );
      if (!response?.data || response?.data?.code !== 200) {
        setError(response?.data?.error ?? "Something Went Wrong");
      }
      setWeatherData(response?.data?.data);
      setCity("");
      setError("");
    } catch (err) {
      console.log("errerr", err);
      setError(err?.response?.data?.error ?? "Something Went Wrong");
      setWeatherData(null);
    }
  };
  const weatherParameters = [
    {
      title: "Feels like",
      field: "feels_like",
      customValue: (data) => {
        return <span>{data?.main?.feels_like} °C</span>;
      },
    },
    {
      title: "Wind Speed",
      field: "wind_speed",
      customValue: (data) => {
        return <span>{data?.wind?.speed} mi/h</span>;
      },
    },
    {
      title: "Humidity",
      field: "humidity",
      customValue: (data) => {
        return <span>{data?.main?.humidity} %</span>;
      },
    },
    {
      title: "Pressure Level",
      field: "pressure",
      customValue: (data) => {
        return <span>{data?.main?.pressure}</span>;
      },
    },
    {
      title: "Visibility",
      field: "visibility",
      customValue: (data) => {
        return <span>{data?.visibility} mi</span>;
      },
    },
    {
      title: "Sea Level",
      field: "sea_level",
      customValue: (data) => {
        return <span>{data?.main?.sea_level}</span>;
      },
    },
  ];
  return (
    <div className="px-4 py-2 weather-app-main col-12 d-flex flex-column align-items-center">
      <div className="city-search d-flex flex-column my-4 col-12 col-md-8">
        <h3 className="text-light">Check Weather For Your City</h3>
        <div className="col-12 col-md-6 d-flex flex-column flex-md-row">
          <input
            type="text"
            className="city-search-input form-control rounded-0"
            placeholder="Enter any City Name"
            onChange={(e) => setCity(e?.target?.value)}
            value={city}
            style={{
              border: isCheckValid
                ? !city
                  ? "1px solid red"
                  : "1px solid white"
                : "1px solid white",
            }}
          />

          <button
            className="btn btn-outline-success rounded-0 ms-0 ms-md-2 mt-md-0 mt-2 px-2 text-nowrap bg-light text-dark border-light"
            onClick={() => {
              fetchWeatherData();
            }}
          >
            Check Weather
          </button>
        </div>
        {isCheckValid && !city && (
          <span className="text-white"> City Name is Required</span>
        )}
      </div>
      {/* {error && (
        <div className="text-red-500 text-center mb-4 font-medium">{error}</div>
      )} */}
      {weatherData && Object.keys(weatherData)?.length > 0 ? (
        <div className="col-12 d-flex flex-column align-items-center mt-4">
          <div className="col-12 col-md-8 d-flex flex-column flex-sm-row justify-content-center align-items-center p-2 border border-light shadow py-4">
            <div className="city col-12 col-sm-6 d-flex flex-column align-items-center align-items-sm-start">
              <div className="title text-light">
                <h2>
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
              </div>
              <div className="temperature mt-3 d-flex flex-row align-items-end">
                <h2 className="me-3 text-light fw-bold">
                  {Math.round(weatherData?.main?.temp)}°C
                </h2>
                <h3 className="text-light fs-4">
                  {" "}
                  {weatherData?.weather?.[0]?.description}
                </h3>
              </div>
            </div>
            <div className="col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center px-3">
              {getWeatherIcon(weatherData?.weather[0]?.icon)}
            </div>
          </div>
          <div className="col-12 col-md-8 d-flex mt-4 text-start">
            <p
              className="text-start text-light fw-bold"
              style={{ fontSize: "20px" }}
            >
              Weather Parameters
            </p>
          </div>
          <div className="col-12 col-md-8 row border border-light shadow-lg p-2">
            {weatherParameters?.map((val, idx) => {
              return (
                <div className="weather-parameter col-6 col-md-4 p-2" key={idx}>
                  <div className="weather-parameter-child rounded w-100 d-flex flex-column align-items-center justify-content-center">
                    <p className="wp-title fs-5">{val?.title}</p>
                    <p className="wp-desc fs-4">
                      {val?.customValue(weatherData)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="col-12 d-flex flex-column no-weather-data justify-content-center align-items-center mt-4">
          <div className="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center border border-light py-4">
            <img
              src="/assets/no-data.png"
              style={{ width: "60px", height: "60px", marginBottom: "12px" }}
            />

            <h3 className="text-light mb-0 fs-2">No Data</h3>
            <p className="text-light">
              {error ?? "Enter City Name to check Weather."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
