import React, { useEffect, useState } from "react";

import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  Card,
  TableHead,
  TableRow,
  Modal,
  Box,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useParams } from "react-router-dom";
import axios from "axios";

import useStyles from "./styles";
import { URL } from "../../../../constants/url";

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

const Notes = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [remainders, setRemainders] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/remainder/fetchall`, {
        headers: { userid: id },
      });
      setRemainders(data);
    }
    fetchData();
  }, [id]);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Card className={classes.Card}>
      <Typography variant="h5"> User Remainders</Typography>
      {remainders === null ? (
        <CircularProgress />
      ) : (
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Time</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Label</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Ring Duration</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Snooze Duration</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          {remainders.length === 0 ? (
            <Typography variant="p">No Remainders For Given User</Typography>
          ) : (
            <TableBody>
              {remainders.map((remainder) => (
                <TableRow key={remainder._id}>
                  <TableCell align="center">{remainder.time}</TableCell>
                  <TableCell align="center">{remainder.label}</TableCell>
                  <TableCell align="center">{remainder.ringDuration}</TableCell>
                  <TableCell align="center">
                    {remainder.snoozeDuration}
                  </TableCell>
                  <TableCell align="center">
                    <RemoveRedEyeIcon
                      className={classes.icon}
                      onClick={() => setModal(true)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </Card>
  );
};

export default Notes;
