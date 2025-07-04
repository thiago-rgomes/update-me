import React, { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelector";

export default function ConverterForm() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    const API_KEY = "API-KEY";
    const API_URL = ``;

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Something went wrong!");

      const data: {
        conversion_rate: number;
      } = await response.json();

      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
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
  }, []);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-2 mt-10">
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
  );
}
