import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  wrapper: {
    padding: "20px 0px",
    borderBottom: "1px solid #ccc",
  },
  link: {
    fontWeight: 700,
    fontSIze: 20,
    textDecoration: "none",
    marginRight: 15,
    color: "#007ef5",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  activeLink: {
    color: "#000",
    "&:hover": {
      textDecoration: "none",
    },
  },
});

export const Header = () => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <Container maxWidth="md">
        <Grid container direction="row" alignItems="center">
          <Grid>
            <NavLink
              activeClassName={styles.activeLink}
              className={styles.link}
              exact
              to="/"
            >
              Все валюты
            </NavLink>
          </Grid>
          <Grid>
            <NavLink
              activeClassName={styles.activeLink}
              className={styles.link}
              to="/convert"
            >
              Конвертер
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
