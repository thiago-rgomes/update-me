import CurrencyConverter from "../components/Currency/CurrencyConverter";
import WeatherDashboard from "../components/Weather/WeatherDashBoard";

export default function Home() {
  return (
    <main className="flex gap-12">
      <WeatherDashboard />
      <CurrencyConverter />
    </main>
  );
}
