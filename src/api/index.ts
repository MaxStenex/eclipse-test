import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://www.cbr-xml-daily.ru/",
});

export const getCurrencies = () => {
  return axios.get("daily_json.js");
};
