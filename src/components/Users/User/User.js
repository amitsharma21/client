import React, { useEffect, useState } from "react";

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  CircularProgress,
  Button,
  Modal,
  Box,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { fetchSingleUser } from "../../../actions/user";
import useStyles from "./style";
import Layout from "../../../UI/Layout/Layout";
import * as actionTypes from "../../../constants/actionTypes";
import Feelings from "./Feelings/Feelings";
import Notes from "./Notes/Notes";
import Remainders from "./Remainders/Remainders";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const User = () => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    emailSubject: "",
    emailDescription: "",
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.users.users);
  const isLoading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  const toggleUserStatus = async () => {
    setModal(false);
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await axios.post(
      "http://localhost:5000/admin/toggleuserstatus",
      {
        email: user[0]?.email,
        ...formData,
      }
    );
    dispatch({
      type: actionTypes.FETCH_SINGLE_USER,
      data: { ...user[0], isActive: !user[0]?.isActive },
    });
    dispatch({ type: actionTypes.END_LOADING });
    alert(data.message);
  };

  return (
    <>
      {/* ---------------------------Users details here---------------------------- */}
      <Layout>
        <Card className={classes.Card}>
          <Typography variant="h5"> User Detail</Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid container>
              <Grid item xs={9}>
                <Table aria-label="User table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Name
                      </TableCell>
                      <TableCell align="right">{user[0]?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Email
                      </TableCell>
                      <TableCell align="right">{user[0]?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Phone Number
                      </TableCell>
                      <TableCell align="right">
                        {user[0]?.phoneNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Action
                      </TableCell>
                      <TableCell align="right">
                        {user[0]?.isActive ? (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={openModal}
                          >
                            Disable
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={openModal}
                          >
                            Enable
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={3} justifyContent="float-right">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Grid>
            </Grid>
          )}

          <Modal
            open={modal}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className={classes.Input}>
                <TextField
                  label="Email Subject"
                  value={formData.emailSubject}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setFormData({ ...formData, emailSubject: e.target.value });
                  }}
                />
              </div>
              <div className={classes.Input}>
                <TextField
                  label="Email Description"
                  value={formData.emailDescription}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      emailDescription: e.target.value,
                    });
                  }}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleUserStatus}
              >
                Update
              </Button>
            </Box>
          </Modal>
        </Card>
        {/* -------------------------Users Feeling here------------------------------ */}

        <Grid container>
          <Grid item xs={12}>
            <Feelings />
          </Grid>
        </Grid>
        {/* -------------------------User Notes here------------------------------ */}

        <Grid container>
          <Grid item xs={12}>
            <Notes />
          </Grid>
        </Grid>

        {/* -------------------------User Remainders here------------------------------ */}

        <Grid container>
          <Grid item xs={12}>
            <Remainders />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default User;
