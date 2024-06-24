import "./styles.sass";

import WorldCurrenciesExchange from "./world-currencies";
import CryptoCurrenciesExchange from "./cryto-currencies";

export default function ExchangeWorldCurrency() {
  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
    >
      <img
        alt=""
        loading="lazy"
        width="2245"
        height="1636"
        decoding="async"
        data-nimg="1"
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src="/background-features.5f7a9ac9.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Exchange Today
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Well everything you need if you aren’t that picky about minor
            details like tax compliance.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 items-center gap-y-10 lg:gap-x-20 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
          <div className="lg:col-span-6">
            <WorldCurrenciesExchange />
          </div>

          <div className="lg:col-span-6">
            <CryptoCurrenciesExchange />
          </div>
        </div>
      </div>
    </section>
  );
}
