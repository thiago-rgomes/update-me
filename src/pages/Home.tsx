import MiniCalendar from "../components/Calendar/MiniCalendar";
import CurrencyConverter from "../components/Currency/CurrencyConverter";
import WeatherDashboard from "../components/Weather/WeatherDashBoard";

export default function Home() {
  return (
    <main className="flex gap-12">
      <div className="flex flex-col gap-8 justify-start">
        <WeatherDashboard />
        <MiniCalendar />
      </div>
      
      <CurrencyConverter />
    </main>
  );
}