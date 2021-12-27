import { createStyles, makeStyles } from "@mui/material";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      main: {
        h1: {
          backgroundColor: "white",
        },
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
