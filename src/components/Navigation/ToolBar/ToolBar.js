import React from "react";

import { AppBar, Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import Logo from "../../../images/memories-Text.png";
import * as actionTypes from "../../../constants/actionTypes";

const ToolBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const Logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    history.push("/");
  };

  return (
    <AppBar color="inherit" position="static" className={classes.AppBar}>
      <Link to="/dashboard">
        <img
          src={Logo}
          alt="LOGO"
          style={{ height: "45px", margin: "0 0 0 15px" }}
        />
      </Link>
      <Typography
        variant="h6"
        style={{ margin: "0 15px 0 0" }}
        className={classes.Admin}
        onClick={Logout}
      >
        Logout
      </Typography>
    </AppBar>
  );
};

export default ToolBar;
