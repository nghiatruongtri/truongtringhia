import { useState, useRef } from "react";
import get from "lodash/get";
import has from "lodash/has";

function App() {
  const [inputAmount, setInputAmount] = useState<any>();
  const [exchangeRate, setExchangeRate] = useState<any>();
  const [amount, setAmount] = useState<any>();

  const staticSupportedCurrencies = [
    "AED",
    "ARS",
    "AUD",
    "BGN",
    "BRL",
    "BSD",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "DOP",
    "EGP",
    "EUR",
    "FJD",
    "GBP",
    "GTQ",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "KZT",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PAB",
    "PEN",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "UAH",
    "USD",
    "UYU",
    "VND",
    "ZAR",
  ];

  const fromCurrencyRef = useRef<any>();
  const toCurrencyRef = useRef<any>();
  const exchange = useRef<any>();

  const onClickExchange = () => {
    [fromCurrencyRef.current.value, toCurrencyRef.current.value] = [
      toCurrencyRef.current.value,
      fromCurrencyRef.current.value,
    ];

    getLatestExchange();
  };

  const getLatestExchange = async () => {
    try {
      const request = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrencyRef.current.value}`
      );

      const data = await request.json();

      setExchangeRate(data.rates[toCurrencyRef.current.value]);
      const calculate = inputAmount * data.rates[toCurrencyRef.current.value];
      setAmount(calculate.toFixed(3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-start	">
      <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        World Currencies
      </h3>

      <input
        className="bg-green-50 border border-green-500 text-green-900  placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        type="number"
        value={inputAmount}
        placeholder="0"
        onChange={({ target }) => {
          setInputAmount(target.value);
        }}
      />

      <div className="flex py-4">
        <select
          className="bg-white mr-5 p-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          ref={fromCurrencyRef}
        >
          {staticSupportedCurrencies.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>

        <button onClick={onClickExchange} ref={exchange}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            height="24px"
            width="24px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 512.003 512.003"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M440.448,87.831H114.629l52.495-52.495c8.084-8.084,8.084-21.19,0-29.274c-8.083-8.084-21.19-8.084-29.274,0 L20.126,123.788c-8.084,8.084-8.084,21.19,0,29.274L137.85,270.786c4.041,4.042,9.338,6.062,14.636,6.062 c5.298,0,10.596-2.02,14.636-6.064c8.084-8.084,8.084-21.19,0-29.274l-52.495-52.495h325.82c27.896,0,50.592-22.695,50.592-50.592 C491.04,110.528,468.345,87.831,440.448,87.831z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M491.877,358.942L374.154,241.218c-8.083-8.084-21.19-8.084-29.274,0c-8.084,8.084-8.084,21.19,0,29.274l52.495,52.495 H71.556c-27.896,0-50.592,22.695-50.592,50.592s22.695,50.593,50.592,50.593h325.819l-52.495,52.495 c-8.084,8.084-8.084,21.19,0,29.274c4.042,4.042,9.34,6.064,14.636,6.064c5.296,0,10.596-2.02,14.636-6.064l117.724-117.724 C499.961,380.132,499.961,367.026,491.877,358.942z" />
                </g>
              </g>
            </g>
          </svg>
        </button>

        <select
          className="ml-5 p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          ref={toCurrencyRef}
        >
          {staticSupportedCurrencies.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>

      <button
        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
        onClick={() => getLatestExchange()}
      >
        Convert
      </button>

      {amount > 0 && (
        <p className="text-white md:text-lg">
          <span className="m-1 text-bold">{inputAmount}</span>
          <span className="text-bold m-1">
            {get(fromCurrencyRef, "current.value")}
          </span>
          converted to
          <span className="m-1">{new Intl.NumberFormat().format(amount)}</span>
          <span className="m-1 text-bold">
            {get(toCurrencyRef, "current.value")}
          </span>
        </p>
      )}
    </div>
  );
}

export default App;
