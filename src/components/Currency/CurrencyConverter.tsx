import React, { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelector";

export default function ConverterForm() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("BRL");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usdToBrl, setUsdToBrl] = useState<string | null>(null);
  const [btcToUsd, setBtcToUsd] = useState<string | null>(null);


  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getDailyRates = async () => {
  try {
    const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,BTC-USD");
    const data = await res.json();

    const usdBrl = data["USDBRL"]?.bid;
    const btcUsd = data["BTCUSD"]?.bid;

    if (usdBrl) setUsdToBrl(parseFloat(usdBrl).toFixed(2));
    if (btcUsd) setBtcToUsd(parseFloat(btcUsd).toFixed(2));
  } catch (err) {
    console.error("Error on fetch daily rates:", err);
  }
};


  const getExchangeRate = async () => {
    const API_URL = `https://economia.awesomeapi.com.br/last/${fromCurrency}-${toCurrency}`;

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      const pairKey = `${fromCurrency}${toCurrency}`;
      const exchangeRate = data[pairKey]?.bid;

      if (exchangeRate) {
        const rate = (parseFloat(exchangeRate) * amount).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      } else {
        console.log(data);
        setResult("Exchange rate not found.");
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getExchangeRate();
  };

  useEffect(() => {
    getExchangeRate();
    getDailyRates();
  }, []);

  return (
    <main className="flex flex-col gap-6 max-w-sm mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold mb-4">Your Daily Check</h2>
        <h3>{new Date().toLocaleDateString()}</h3>
        <h3 className="self-start ml-[25%]">1 BRL = {usdToBrl ? `${usdToBrl} USD` : "Carregando..."}</h3>
        <h3 className="self-start ml-[25%]">1 BTC = {btcToUsd ? `${btcToUsd} USD` : "Carregando..."}</h3>
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-3xl font-bold text-center border-t-2 pt-4">Currency Converter</h1>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Enter Amount</label>
          <input
            type="number"
            className="p-2 rounded-md bg-white/10 border border-white/50 transition ease-in-out duration-200"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <div>
            <label className="text-lg font-medium">From</label>
            <CurrencySelect
              selectedCurrency={fromCurrency}
              handleCurrency={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFromCurrency(e.target.value)
              }
            />
          </div>

          <div
            className="h-10 w-10 mt-[25px] cursor-pointer flex items-center justify-center rounded-full bg-white/10 border border-white/50 transition ease-in-out duration-200"
            onClick={handleSwapCurrencies}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
          </div>

          <div>
            <label className="text-lg font-medium">To</label>
            <CurrencySelect
              selectedCurrency={toCurrency}
              handleCurrency={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setToCurrency(e.target.value)
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className={`${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } text-gray-700 font-medium bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-300 transition duration-200`}
        >
          Get Exchange Rate
        </button>

        <p className="p-2 h-16 flex justify-center items-center rounded-md font-medium bg-white/10 border border-white/50 transition ease-in-out duration-200 hover:bg-white/20,">
          {isLoading ? "Getting exchange rate..." : result}
        </p>
      </form>
    </main>
  );
}
