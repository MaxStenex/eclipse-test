import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { CurrencyType } from "../../types";
import { CurrencyCard } from "./CurrencyCard";

const useStyles = makeStyles({
  cardWrapper: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 40,
    width: "100%",
    padding: "5px 0",
  },
});

type Props = {
  currencies: Array<CurrencyType>;
  mainCurrencyValue: number;
  mainCurrencyCharCode: string;
};

export const CurrencyList: React.FC<Props> = React.memo(
  ({ currencies, mainCurrencyValue, mainCurrencyCharCode }) => {
    const styles = useStyles();
    const [filter, setFilter] = useState("");
    const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(evt.target.value);
    };

    const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);
    useEffect(() => {
      const filterCurrencies = () => {
        const lowerCasedFilter = filter.toLowerCase();

        if (!filter) {
          return setFilteredCurrencies(currencies);
        } else {
          return setFilteredCurrencies(
            currencies.filter(
              (c) =>
                c.name.toLocaleLowerCase().includes(lowerCasedFilter) ||
                c.charCode.toLocaleLowerCase().includes(lowerCasedFilter)
            )
          );
        }
      };
      filterCurrencies();
    }, [currencies, filter]);

    return (
      <Grid container direction="column" justify="center">
        <Grid>
          <TextField
            value={filter}
            onChange={handleFilterChange}
            className={styles.input}
            label="Название валюты или её код"
          />
        </Grid>
        {filteredCurrencies.map((c) => (
          <Grid key={c.id} className={styles.cardWrapper}>
            <CurrencyCard
              {...c}
              mainCurrencyValue={mainCurrencyValue}
              mainCurrencyCharCode={mainCurrencyCharCode}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
);
