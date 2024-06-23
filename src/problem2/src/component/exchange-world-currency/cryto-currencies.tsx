import axios from "axios";
import { useEffect, useRef, useState } from "react";
import has from "lodash/has";
import get from "lodash/get";

import "./styles.sass";

export default function ExchangeWorldCurrency() {
  const getData = async () => {
    const { data } = await axios.get(`http://localhost:8080/exchange`);

    if (!has(data, "[0].data")) {
      return;
    }
    setExchangeData(data[0].data);
  };

  const [inputAmount, setInputAmount] = useState<any>();
  const [exchangeRate1, setExchangeRate] = useState<any>(0);
  const [exchangeData, setExchangeData] = useState([]);
  const [amount, setAmount] = useState<any>(0);

  const toCurrencyRef = useRef<any>();

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Crypto Currencies
      </h3>
      <div className="flex bg-green-50 border border-green-500 text-green-900  placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
        <input
          className="w-full block focus:outline-none bg-green-50"
          type="number"
          value={inputAmount}
          placeholder="0"
          onChange={({ target }) => {
            setInputAmount(target.value);
          }}
        />
        US$
      </div>

      <select
        className="p-2 my-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        ref={toCurrencyRef}
      >
        {Object.keys(exchangeData).map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>

      <button
        className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
        onClick={() => {
          setExchangeRate(exchangeData[toCurrencyRef.current.value]);
          const a = inputAmount * exchangeData[toCurrencyRef.current.value];
          setAmount(a.toFixed(3));
        }}
      >
        Convert
      </button>

      {amount > 0 && (
        <p className="text-white md:text-lg">
          <span className="m-1 text-bold">{inputAmount}</span>
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
