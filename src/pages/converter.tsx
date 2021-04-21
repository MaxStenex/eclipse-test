import React, { useEffect, useState } from "react";
import { getCurrencies } from "../api";
import { ConvertBlocks } from "../components/converter/ConvertBlocks";
import { Header } from "../components/shared/Header";
import { CurrencyType } from "../types";

export const ConverterPage = () => {
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);

  useEffect(() => {
    const fetchAndSetCurrencies = async () => {
      const fetchedCurrencies = await getCurrencies();
      setCurrencies(fetchedCurrencies);
    };

    fetchAndSetCurrencies();
  }, []);

  return (
    <>
      <Header />
      <ConvertBlocks currencies={currencies} />
    </>
  );
};
