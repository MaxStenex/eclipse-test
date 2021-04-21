import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  selectWrapper: {
    margin: "10px 25px",
  },
  select: {
    minWidth: 160,
  },
});

type Props = {
  mainCharCode: string;
  changeMainCharCode: (value: string) => void;
  charCodes: Array<string>;
  mainCharName: string;
};

export const MainCurrency: React.FC<Props> = ({
  mainCharCode,
  changeMainCharCode,
  charCodes,
  mainCharName,
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
              value={mainCharCode}
              onChange={(evt) => changeMainCharCode(evt.target.value as string)}
            >
              {charCodes.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{mainCharName}</FormHelperText>
          </FormControl>
        </Grid>
      </Card>
    </Paper>
  );
};
