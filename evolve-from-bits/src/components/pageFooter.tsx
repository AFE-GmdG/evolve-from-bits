import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    position: "relative",
    flex: "0 0 auto",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
  },
  copyright: {
    flex: "1 0 0px",
    padding: theme.spacing(1, 2),
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

const PageFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.copyright}>
        <Typography variant="body2">
          {`©2022 - Evolve from Bits - ${process.env.VERSION}`}
        </Typography>
      </div>
    </footer>
  );
};

export default PageFooter;
