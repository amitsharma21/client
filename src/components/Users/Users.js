import React, { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Card,
  Typography,
  ButtonGroup,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { fetchAllUsers } from "../../actions/user";
import Layout from "../../UI/Layout/Layout";

const Coupons = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.loading.loading);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const viewUser = (id) => {
    history.push(`/dashboard/user/${id}`);
  };

  const deleteUser = (id) => {
    console.log("delete user clicked");
    console.log(id);
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <Typography variant="h5">Users Table</Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Email</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Phone Number</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell component="th" scope="row" align="center">
                    {user.name}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      variant="outlined"
                      style={{ marginBottom: "10px" }}
                    >
                      <RemoveRedEyeIcon
                        className={classes.icon}
                        onClick={() => viewUser(user._id)}
                      />
                      <DeleteIcon
                        className={classes.icon}
                        onClick={() => deleteUser(user._id)}
                      />
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Layout>
  );
};

export default Coupons;
