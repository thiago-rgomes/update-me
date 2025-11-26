import axios from "axios";

export async function getWeatherByCoords(lat: number, lon: number) {
  const url = "https://api.open-meteo.com/v1/forecast";

  const params = {
    latitude: lat,
    longitude: lon,
    current: "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m",
    daily: "weather_code,temperature_2m_max",
    timezone: "auto",
  };

  const { data } = await axios.get(url, { params });
  return data;
}