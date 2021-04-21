import Axios from "axios";
import { CurrencyType } from "../types";

const axios = Axios.create({
  baseURL: "https://www.cbr-xml-daily.ru/",
});

export const getCurrencies = async (): Promise<Array<CurrencyType>> => {
  const { data } = await axios.get("daily_json.js");

  const currencies: Array<CurrencyType> = Object.values(data.Valute).map((cur: any) => ({
    id: cur.ID,
    charCode: cur.CharCode,
    name: cur.Name,
    value: parseFloat((cur.Value / cur.Nominal).toFixed(4)),
    valueChange: parseFloat(
      (cur.Value / cur.Nominal - cur.Previous / cur.Nominal).toFixed(4)
    ),
  }));

  return currencies;
};
