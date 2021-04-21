import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { makeStyles } from "@material-ui/styles";
import { CurrencyType } from "../../types";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles({
  priceTextWrapper: {
    display: "flex",
    alignItems: "center",
  },
  priceText: {
    fontSize: 17,
  },
  priceTextIcon: {
    margin: "0 5px",
    fontSize: 15,
  },
  changeTextUp: {
    color: "green",
  },
  changeTextDown: {
    color: "red",
  },
  changeIconUp: {
    color: "green",
    marginBottom: 3,
  },
  changeIconDown: {
    color: "red",
    marginBottom: 3,
  },
});

type Props = CurrencyType & {
  mainCurrencyDivisor: number;
  mainCurrencyCharCode: string;
};

export const CurrencyCard: React.FC<Props> = ({
  name,
  charCode,
  value,
  valueChange,
  mainCurrencyDivisor,
  mainCurrencyCharCode,
}) => {
  const styles = useStyles();

  return (
    <Paper elevation={1}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {name}
          </Typography>
          <Grid container justify="space-between" alignItems="center">
            <Grid className={styles.priceTextWrapper}>
              <Typography className={styles.priceText} variant="body1" component="p">
                1 {charCode}
              </Typography>
              <SyncAltIcon className={styles.priceTextIcon} />
              <Typography className={styles.priceText} variant="body1" component="p">
                {parseFloat((value / mainCurrencyDivisor).toFixed(4))}{" "}
                {mainCurrencyCharCode}
              </Typography>
            </Grid>
            <Grid>
              <Grid container alignItems="center">
                <Icon
                  className={
                    valueChange >= 0 ? styles.changeIconUp : styles.changeIconDown
                  }
                >
                  {valueChange >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </Icon>
                <Typography
                  className={
                    valueChange >= 0 ? styles.changeTextUp : styles.changeTextDown
                  }
                >
                  {parseFloat((valueChange / mainCurrencyDivisor).toFixed(4))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  );
};
