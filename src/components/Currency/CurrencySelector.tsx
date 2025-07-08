import React from "react";

interface CurrencySelectorProps {
    selectedCurrency: string;
    handleCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const currencyCodes: string[] = [
    "BRL", "USD", "CAD", "EUR", "BTC"
];

export default function CurrencySelector({
    selectedCurrency,
    handleCurrency
}: CurrencySelectorProps) {
    const countryCode = selectedCurrency.substring(0, 2).toUpperCase();

    return (
        <div className="flex items-center min-h-[45px] px-[10px] rounded-md bg-white/10 border border-white/50">
            <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="Flag" className="h-6 w-6" />
            <select
                onChange={handleCurrency}
                className="outline-none border-none bg-transparent text-white text-base font-medium px-[10px] pl-[5px]"
                value={selectedCurrency}
            >
                {currencyCodes.map(currency => (
                    <option key={currency} value={currency} className="text-black font-medium">
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
}
