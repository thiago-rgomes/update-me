export interface ExchangeRateData {
  bid: string;
}

export const getDailyRates = async (): Promise<{
  usdToBrl: string | null;
  btcToUsd: string | null;
}> => {
  try {
    const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,BTC-USD");
    const data = await res.json();

    const usdBrl = data["USDBRL"]?.bid;
    const btcUsd = data["BTCUSD"]?.bid;

    return {
      usdToBrl: usdBrl ? parseFloat(usdBrl).toFixed(2) : null,
      btcToUsd: btcUsd ? parseFloat(btcUsd).toFixed(2) : null,
    };
  } catch (error) {
    console.error("Error fetching daily rates:", error);
    return {
      usdToBrl: null,
      btcToUsd: null,
    };
  }
};

export const getExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<string> => {
  const API_URL = `https://economia.awesomeapi.com.br/last/${fromCurrency}-${toCurrency}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Something went wrong!");

    const data = await response.json();
    const pairKey = `${fromCurrency}${toCurrency}`;
    const exchangeRate = data[pairKey]?.bid;

    if (exchangeRate) {
      const rate = (parseFloat(exchangeRate) * amount).toFixed(2);
      return `${amount} ${fromCurrency} = ${rate} ${toCurrency}`;
    } else {
      return "Exchange rate not found.";
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return "Something went wrong!";
  }
};