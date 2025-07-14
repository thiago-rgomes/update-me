import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { getWeatherByCity, getForecastByCity } from "../../services/weatherAPI";
import translateWindDir from "./TranslateWindDir";
import { Wind } from "lucide-react";

type WeatherCondition = {
  text: string;
  icon: string;
};

type CurrentWeather = {
  temp_c: number;
  condition: WeatherCondition;
  wind_kph: number;
  wind_dir: string;
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

        const [currentData, forecastData] = await Promise.all([
          getWeatherByCity(location),
          getForecastByCity(location),
        ]);
        
        const allDays: ForecastDay[] = forecastData.forecast.forecastday;
        
        const upcomingDays = allDays.filter((day) => {
          const forecastDate = new Date(day.date);
          const localToday = new Date();
          return forecastDate >= new Date(localToday.toDateString());
        });
        
        setCurrent(currentData.current);
        setForecast(upcomingDays);
        setCity(currentData.location.name);
        
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
    <div className="flex flex-col gap-14 bg-gradient-to-br bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg text-white w-full max-w-[800px]  mx-auto">
      <div className="flex items-center text-center gap-18">

        <div className="flex flex-col items-center w-[180px]">
          <h2 className="text-2xl font-bold">{city}</h2>
          
          <div className="flex gap-4">
            <img src={`https:${current?.condition.icon}`} alt={current?.condition.text} className="w-12 h-12"/>
            <p className="text-xl font-bold mt-2">{current?.temp_c.toFixed(1)}°C</p>
          </div>
        </div>       

        <div className="flex flex-col text-start self-end w-[180px]">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-white/80"></Wind>
            <p className="font-semibold">Wind</p>
          </div>
          
          <p>{current?.wind_kph} km/h</p>
          <p className="uppercase">{translateWindDir(current?.wind_dir || '')}</p>
        </div>
        
      </div>      

      <div className="flex gap-4 overflow-x-auto">
        {forecast.map((day, index) => {
          const isToday = new Date(day.date).toDateString() === new Date().toDateString();
          return (
            <WeatherCard
              key={index}
              date={new Date(day.date).toLocaleDateString("pt-BR", {
                weekday: "short",
                day: "numeric",
              }).replace(',', '')}
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