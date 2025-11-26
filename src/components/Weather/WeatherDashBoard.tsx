import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { getWeatherIcon } from "../../utils/weatherIcon";
import { getWeather } from "../../utils/weatherIcon";

type WeatherCondition = {
  text: string;
  icon: string;
};

type CurrentWeather = {
  temperature: number;
  weathercode: number;
};

type ForecastDay = {
  date: string;
  day: {
    avgtemp_c: number;
    maxtemp_c: number;
    condition: WeatherCondition;
  };
};

export default function WeatherDashboard() {
  const [city, setCity] = useState<string | null>(null);
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function getLocation(): Promise<string> {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          return reject("Geolocalização não suportada.");
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude},${longitude}`);
          },
          () => reject("Permissão de localização negada.")
        );
      });
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const location = await getLocation();
        setCity(location);

        const [lat, lon] = location.split(",");

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&daily=temperature_2m_max,weathercode&timezone=auto`
        );

        const data = await res.json();

        const forecastDays: ForecastDay[] = data.daily.time.map(
          (date: string, i: number) => ({
            date,
            day: {
              maxtemp_c: data.daily.temperature_2m_max[i],
              avgtemp_c: data.daily.temperature_2m_max[i],
              condition: getWeather(data.daily.weathercode[i]),
            },
          })
        );

        // Garantir que hoje aparece como primeiro
        const upcoming = forecastDays.filter((f) => {
          const d = new Date(f.date);
          return d >= new Date(new Date().toDateString());
        });

        setForecast(upcoming);

        const locRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=pt-BR`
        );

        const locData = await locRes.json();

        setCity(
          locData.address.city ||
            locData.address.town ||
            locData.address.village ||
            locData.address.municipality ||
            locData.address.state ||
            locData.address.country ||
            "Localização"
        );

        setCurrent({
          temperature: data.current.temperature_2m,
          weathercode: data.current.weathercode,
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error on loading weather data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading Weather...</p>;

  if (error)
    return (
      <div className="text-red-400 text-center bg-white/10 backdrop-blur p-6 rounded-xl">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-14 bg-gradient-to-br bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg text-white w-full max-w-[800px] mx-auto">
      <div className="flex items-center justify-around text-center">
        <div className="flex flex-row gap-20 items-center max-w-50%">
          <h2 className="text-2xl font-bold">{city}</h2>

          <div className="flex gap-1 self-start">
            <img
              src={getWeatherIcon(current?.weathercode || 1)}
              alt="Condição do tempo"
              className="w-12 h-12"
            />
            <p className="text-xl font-bold mt-3">
              {current?.temperature?.toFixed(1)}°C
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {forecast.map((day, index) => {
          const isToday =
            new Date(day.date).toDateString() === new Date().toDateString();
          return (
            <WeatherCard
              key={index}
              date={new Date(day.date)
                .toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "numeric",
                })
                .replace(",", "")}
              icon={day.day.condition.icon}
              temp={day.day.maxtemp_c}
              isToday={isToday}
            />
          );
        })}
      </div>
    </div>
  );
}