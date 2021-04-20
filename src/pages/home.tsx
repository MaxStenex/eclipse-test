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

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data } = await getCurrencies();
        const fetchedCurrencies: Array<CurrencyType> = Object.values(data.Valute).map(
          (cur: any) => ({
            id: cur.ID,
            charCode: cur.CharCode,
            name: cur.Name,
            value: parseFloat((cur.Value / cur.Nominal).toFixed(4)),
            valueChange: parseFloat((cur.Value - cur.Previous).toFixed(4)),
          })
        );
        setCurrencies(fetchedCurrencies);
      } catch (error) {}
    };
    fetchCurrencies();
  }, []);

  return (
    <>
      <Header />
      <Container className={styles.wrapper} maxWidth="md">
        <Grid container justify="space-between" direction="row" spacing={3}>
          <Grid item xs={7}>
            <CurrencyList currencies={currencies} />
          </Grid>
          <Grid item xs={4}>
            <MainCurrency />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
