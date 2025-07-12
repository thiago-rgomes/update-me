const API_KEY = "9c751a2497e7477d875115043251107";
const BASE_URL = 'https://api.weatherapi.com/v1';

async function fetchWeather(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Erro ao buscar dados do clima');
  }

  return res.json();
}

export async function getWeatherByCity(city: string) {
  if (!API_KEY) throw new Error('API KEY não configurada');
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&lang=pt`;
  return fetchWeather(url);
}

export async function getForecastByCity(city: string) {
  if (!API_KEY) throw new Error('API KEY não configurada');
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`;
  return fetchWeather(url);
}