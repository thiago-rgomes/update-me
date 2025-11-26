import MiniCalendar from "../components/Calendar/MiniCalendar";
import CurrencyConverter from "../components/Currency/CurrencyConverter";
import WeatherDashboard from "../components/Weather/WeatherDashBoard";

export default function Home() {
  return (
    <main className="flex max-h-[735px]">
      <div className="flex flex-col gap-12 justify-start mr-4 xl:mr-24 [@media(max-height:700px)]:gap-2">
        <WeatherDashboard />
        <MiniCalendar />
      </div>
      
      <CurrencyConverter />
    </main>
  );
}