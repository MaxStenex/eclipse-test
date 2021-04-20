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

export const MainCurrency = () => {
  const styles = useStyles();

  return (
    <Paper elevation={1}>
      <Card>
        <Grid container alignItems="center">
          <FormControl className={styles.selectWrapper}>
            <InputLabel>Основная валюта</InputLabel>
            <Select className={styles.select} value="">
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Австралийский доллар</FormHelperText>
          </FormControl>
        </Grid>
      </Card>
    </Paper>
  );
};
