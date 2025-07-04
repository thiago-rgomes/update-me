import CurrencyConverter from "../components/Currency/CurrencyConverter";
import mainBackground from "../assets/main-bg.jpg";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center text-white px-4 py-8"
      style={{ backgroundImage: `url(${mainBackground})` }}
    >
      <div className="max-w-sm mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Currency Converter</h1>
        <CurrencyConverter></CurrencyConverter>
      </div>
    </main>
  );
}
