import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { CurrencyList } from "../components/home/CurrencyList";
import { MainCurrency } from "../components/home/MainCurrency";
import { Header } from "../components/shared/Header";
import { getCurrencies } from "../api";
import { CurrencyType } from "../types";

const useStyles = makeStyles({
  wrapper: {
    marginTop: 50,
  },
});

export const HomePage = () => {
  const styles = useStyles();
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);

  const [mainCharCode, setMainCharCode] = useState("RUB");
  const changeMainCharCode = (value: string) => {
    setMainCharCode(value);
  };

  const [currencyDivisor, setCurrencyDivisor] = useState(1);
  const [mainCharName, setMainCharName] = useState("Российский рубль");

  const [charCodes, setCharCodes] = useState<Array<string>>(["RUB"]);

  useEffect(() => {
    const fetchAndSetCurrencies = async () => {
      try {
        const { data } = await getCurrencies();

        const fetchedCharCodes: Array<string> = Object.keys(data.Valute);
        const fetchedCurrencies: Array<CurrencyType> = Object.values(data.Valute).map(
          (cur: any) => ({
            id: cur.ID,
            charCode: cur.CharCode,
            name: cur.Name,
            value: parseFloat((cur.Value / cur.Nominal).toFixed(4)),
            valueChange: parseFloat(
              (cur.Value / cur.Nominal - cur.Previous / cur.Nominal).toFixed(4)
            ),
          })
        );

        setCurrencies(fetchedCurrencies);
        setCharCodes((prev) => [...prev, ...fetchedCharCodes]);
      } catch (error) {}
    };
    fetchAndSetCurrencies();
  }, []);

  useEffect(() => {
    const changeCurrencyNameAndDivisor = (mainCurrencyCode: string) => {
      if (mainCurrencyCode === "RUB") {
        setMainCharName("Российский рубль");
        setCurrencyDivisor(1);
      } else {
        const mainCurrency = currencies.find((c) => c.charCode === mainCurrencyCode);
        setMainCharName(mainCurrency!.name);
        setCurrencyDivisor(mainCurrency!.value);
      }
    };

    changeCurrencyNameAndDivisor(mainCharCode);
  }, [currencies, mainCharCode]);

  return (
    <>
      <Header />
      <Container className={styles.wrapper} maxWidth="md">
        <Grid container justify="space-between" direction="row" spacing={3}>
          <Grid item xs={7}>
            <CurrencyList
              mainCurrencyDivisor={currencyDivisor}
              mainCurrencyCharCode={mainCharCode}
              currencies={currencies}
            />
          </Grid>
          <Grid item xs={4}>
            <MainCurrency
              mainCharCode={mainCharCode}
              changeMainCharCode={changeMainCharCode}
              charCodes={charCodes}
              mainCharName={mainCharName}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
