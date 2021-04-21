import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import SyncAltOutlinedIcon from "@material-ui/icons/SyncAltOutlined";
import { makeStyles } from "@material-ui/styles";
import { ConvertBlock } from "./ConvertBlock";
import { CurrencyType } from "../../types";

const useStyles = makeStyles({
  wrapper: {
    marginTop: 50,
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 45,
    width: 45,
    borderRadius: "50%",
    border: "2px solid white",
    "&:hover": {
      border: "2px solid #ccc",
      cursor: "pointer",
      transition: ".3s",
    },
  },
});

enum BlockNumber {
  "FIRST" = 1,
  "SECOND" = 2,
}

type Props = {
  currencies: Array<CurrencyType>;
};

export const ConvertBlocks: React.FC<Props> = ({ currencies }) => {
  const styles = useStyles();

  const [firstBlockCurrencyCount, setFirstBlockCurrencyCount] = useState("1");
  const [secondBlockCurrencyCount, setSecondBlockCurrencyCount] = useState("1");

  const [firstBlockCurrency, setFirstBlockCurrency] = useState<CurrencyType | null>(null);
  const [secondBlockCurrency, setSecondBlockCurrency] = useState<CurrencyType | null>(
    null
  );

  const changeBlockCurrency = (blockNumber: BlockNumber) => {
    return (currencyCharCode: string) => {
      if (currencyCharCode === "RUB") {
        blockNumber === BlockNumber.FIRST
          ? setFirstBlockCurrency(null)
          : setSecondBlockCurrency(null);
      } else {
        const currency = currencies.find((c) => c.charCode === currencyCharCode);
        blockNumber === BlockNumber.FIRST
          ? setFirstBlockCurrency(currency!)
          : setSecondBlockCurrency(currency!);
      }
    };
  };

  const swapBlockCurrencies = () => {
    setFirstBlockCurrency(secondBlockCurrency);
    setSecondBlockCurrency(firstBlockCurrency);
  };

  const changeFirstBlockCurrencyCount = (count: string) => {
    setFirstBlockCurrencyCount(count);
  };

  useEffect(() => {
    // расчитываем количество денежных единиц во втором блоке, исходя из значения первого
    const changeSecondBlockCurrencyCount = (firstBlockCurrencyCount: string) => {
      setSecondBlockCurrencyCount(
        (
          (+firstBlockCurrencyCount * (firstBlockCurrency?.value || 1)) /
          (secondBlockCurrency?.value || 1)
        ).toFixed(4)
      );
    };

    changeSecondBlockCurrencyCount(firstBlockCurrencyCount);
  }, [firstBlockCurrency, secondBlockCurrency, firstBlockCurrencyCount]);

  return (
    <Container className={styles.wrapper} maxWidth="sm">
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={5}>
          <ConvertBlock
            currencyCount={firstBlockCurrencyCount}
            changeCurrencyCount={changeFirstBlockCurrencyCount}
            changeActiveCurrency={changeBlockCurrency(BlockNumber.FIRST)}
            activeCurrency={firstBlockCurrency}
            currencies={currencies}
          />
        </Grid>
        <Grid onClick={swapBlockCurrencies} item xs={1} className={styles.iconWrapper}>
          <Icon>
            <SyncAltOutlinedIcon />
          </Icon>
        </Grid>
        <Grid item xs={5}>
          <ConvertBlock
            currencyCount={secondBlockCurrencyCount}
            changeActiveCurrency={changeBlockCurrency(BlockNumber.SECOND)}
            activeCurrency={secondBlockCurrency}
            currencies={currencies}
            isTextDisabled={true}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
