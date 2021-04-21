import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/styles";
import { CurrencyType } from "../../types";

const useStyles = makeStyles({
  selectWrapper: {
    margin: "10px 25px",
  },
  select: {
    minWidth: 160,
  },
});

type Props = {
  mainCurrency: CurrencyType | null;
  changeMainCurrency: (currencyCharCode: string) => void;
  currencies: Array<CurrencyType>;
};

export const MainCurrency: React.FC<Props> = ({
  currencies,
  mainCurrency,
  changeMainCurrency,
}) => {
  const styles = useStyles();

  return (
    <Paper elevation={1}>
      <Card>
        <Grid container alignItems="center">
          <FormControl className={styles.selectWrapper}>
            <InputLabel>Основная валюта</InputLabel>
            <Select
              className={styles.select}
              value={(mainCurrency && mainCurrency.charCode) || "RUB"}
              onChange={(e) => changeMainCurrency(e.target.value as string)}
            >
              <MenuItem value={"RUB"}>RUB</MenuItem>
              {currencies.map((c) => (
                <MenuItem key={c.id} value={c.charCode}>
                  {c.charCode}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {(mainCurrency && mainCurrency.name) || "Российский рубль"}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Card>
    </Paper>
  );
};
