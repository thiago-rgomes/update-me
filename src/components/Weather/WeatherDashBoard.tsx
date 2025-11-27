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
        if (!navigator.geolocation)
          return reject("Geolocalização não suportada.");
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(`${pos.coords.latitude},${pos.coords.longitude}`),
          () => reject("Permissão de localização negada.")
        );
      });
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const location = await getLocation();
        const [lat, lon] = location.split(",");

        const weatherReq = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&daily=temperature_2m_max,weathercode&timezone=auto`
        ).then((r) => r.json());

        const weather = await weatherReq;

        setCurrent({
          temperature: weather.current.temperature_2m,
          weathercode: weather.current.weathercode,
        });

        const forecastDays: ForecastDay[] = weather.daily.time.map(
          (date: string, i: number) => ({
            date,
            day: {
              maxtemp_c: weather.daily.temperature_2m_max[i],
              avgtemp_c: weather.daily.temperature_2m_max[i],
              condition: getWeather(weather.daily.weathercode[i]),
            },
          })
        );

        const upcoming = forecastDays.filter(
          (f) => new Date(f.date) >= new Date(new Date().toDateString())
        );

        setForecast(upcoming);

        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=pt-BR`
        )
          .then((r) => r.json())
          .then((loc) => {
            setCity(
              loc.address.city ||
                loc.address.town ||
                loc.address.village ||
                loc.address.municipality ||
                loc.address.state ||
                loc.address.country ||
                "Localização"
            );
          });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro carregando clima.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const interval = setInterval(() => {
      console.log("🔄 Atualizando clima...");
      fetchData();
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
          {loading ? (
            <div className="w-28 h-6 bg-white/20 animate-pulse rounded-md"></div>
          ) : (
            <h2 className="text-2xl font-bold">{city}</h2>
          )}

          <div className="flex gap-1 self-start">
            {loading ? (
              <>
                <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
                <div className="w-10 h-5 mt-3 bg-white/20 animate-pulse rounded-md"></div>
              </>
            ) : (
              <>
                <img
                  src={getWeatherIcon(current?.weathercode || 1)}
                  alt="Clima atual"
                  className="w-12 h-12"
                />
                <p className="text-xl font-bold mt-3">
                  {current?.temperature?.toFixed(1)}°C
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto justify-center">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-[96px] h-[144px] bg-white/20 rounded-2xl animate-pulse"
              ></div>
            ))
          : forecast.map((day, index) => {
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
