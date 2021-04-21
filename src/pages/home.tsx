import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { getCurrencies } from "../api";
import { CurrencyList } from "../components/home/CurrencyList";
import { MainCurrency } from "../components/home/MainCurrency";
import { Header } from "../components/shared/Header";
import { CurrencyType } from "../types";

const useStyles = makeStyles({
  wrapper: {
    marginTop: 50,
  },
});

export const HomePage = () => {
  const styles = useStyles();
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);

  const [mainCurrency, setMainCurrency] = useState<CurrencyType | null>(null);
  const changeMainCurrency = (currencyCharCode: string) => {
    if (currencyCharCode === "RUB") {
      setMainCurrency(null);
    } else {
      const currency = currencies.find((c) => c.charCode === currencyCharCode);
      setMainCurrency(currency!);
    }
  };

  useEffect(() => {
    const fetchAndSetCurrencies = async () => {
      try {
        const fetchedCurrencies = await getCurrencies();
        setCurrencies(fetchedCurrencies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAndSetCurrencies();
  }, []);

  return (
    <>
      <Header />
      <Container className={styles.wrapper} maxWidth="md">
        <Grid container justify="space-between" direction="row" spacing={3}>
          <Grid item xs={7}>
            <CurrencyList
              mainCurrencyValue={mainCurrency?.value || 1}
              mainCurrencyCharCode={mainCurrency?.charCode || "RUB"}
              currencies={currencies}
            />
          </Grid>
          <Grid item xs={4}>
            <MainCurrency
              mainCurrency={mainCurrency}
              currencies={currencies}
              changeMainCurrency={changeMainCurrency}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
