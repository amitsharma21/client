import React, { useState } from "react";

import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";

import Input from "./Input";
import useStyles from "./styles";
import { signin } from "../../actions/auth";

const initialState = {
  email: "",
  password: "",
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((preShowPassword) => !preShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="div" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign In</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            className={classes.submit}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
