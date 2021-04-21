import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { CurrencyType } from "../../types";

const useStyles = makeStyles({
  wrapper: {
    padding: "15px ",
  },
  title: {
    fontSize: 13,
  },
});

type Props = {
  currencies: Array<CurrencyType>;
  activeCurrency: CurrencyType | null;
  changeActiveCurrency: (currencyCharCode: string) => void;
  currencyCount: string;
  isTextDisabled?: boolean;
  changeCurrencyCount?: (count: string) => void;
};

export const ConvertBlock: React.FC<Props> = ({
  isTextDisabled,
  currencies,
  changeActiveCurrency,
  activeCurrency,
  currencyCount,
  changeCurrencyCount,
}) => {
  const styles = useStyles();

  const handleCurrencyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changeCurrencyCount) {
      changeCurrencyCount(e.target.value as string);
    }
  };

  return (
    <Paper elevation={1}>
      <Card className={styles.wrapper}>
        <Typography className={styles.title} color="textSecondary" gutterBottom>
          {activeCurrency?.name || "Российский рубль"}
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <FormControl>
              <Select
                onChange={(e) => changeActiveCurrency(e.target.value as string)}
                value={activeCurrency?.charCode || "RUB"}
                displayEmpty
              >
                <MenuItem value={"RUB"}>RUB</MenuItem>
                {currencies.map((c) => (
                  <MenuItem key={c.id} value={c.charCode}>
                    {c.charCode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              onChange={handleCurrencyValueChange}
              value={currencyCount}
              disabled={isTextDisabled}
              type="number"
            />
          </Grid>
        </Grid>
      </Card>
    </Paper>
  );
};
