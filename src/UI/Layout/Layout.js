import React from "react";

import { Grid } from "@mui/material";

import useStyles from "./styles";

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid item xs={6} sm={8} md={10} className={classes.Grid}>
      {children}
    </Grid>
  );
};

export default Layout;
