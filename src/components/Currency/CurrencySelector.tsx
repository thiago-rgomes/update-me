import React from "react";

interface CurrencySelectorProps {
    selectedCurrency: string;
    handleCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const currencyCodes: string[] = [
    "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
    "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
    "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
    "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
    "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
    "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
    "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
    "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
    "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
    "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
    "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW",
    "ZWL"
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
