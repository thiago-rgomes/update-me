const weatherMap: Record<number, { text: string; icon: string }> = {
  0: { text: "Clear", icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png" },
  1: { text: "Mainly clear", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" },
  2: { text: "Partly cloudy", icon: "https://cdn.weatherapi.com/weather/64x64/day/119.png" },
  3: { text: "Cloudy", icon: "https://cdn.weatherapi.com/weather/64x64/day/122.png" },

  45: { text: "Fog", icon: "https://cdn.weatherapi.com/weather/64x64/day/143.png" },
  48: { text: "Rime fog", icon: "https://cdn.weatherapi.com/weather/64x64/day/248.png" },

  51: { text: "Drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/263.png" },
  53: { text: "Drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/266.png" },
  55: { text: "Drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/281.png" },

  61: { text: "Rain", icon: "https://cdn.weatherapi.com/weather/64x64/day/296.png" },
  63: { text: "Rain", icon: "https://cdn.weatherapi.com/weather/64x64/day/299.png" },
  65: { text: "Rain", icon: "https://cdn.weatherapi.com/weather/64x64/day/302.png" },

  71: { text: "Snow", icon: "https://cdn.weatherapi.com/weather/64x64/day/332.png" },

  80: { text: "Rain showers", icon: "https://cdn.weatherapi.com/weather/64x64/day/353.png" },
  81: { text: "Rain showers", icon: "https://cdn.weatherapi.com/weather/64x64/day/356.png" },
  82: { text: "Rain showers", icon: "https://cdn.weatherapi.com/weather/64x64/day/359.png" },
};

export function getWeather(code: number) {
  return weatherMap[code] || weatherMap[3]; 
}

export function getWeatherIcon(code: number): string {
  return (weatherMap[code] || weatherMap[2]).icon;
}