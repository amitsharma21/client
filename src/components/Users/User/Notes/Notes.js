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
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:5000/note/fetchall", {
        headers: { userid: id },
      });
      setNotes(data);
    }
    fetchData();
  }, [id]);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Card className={classes.Card}>
      <Typography variant="h5"> User Notes</Typography>
      {notes === null ? (
        <CircularProgress />
      ) : (
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Title</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Description</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          {notes.length === 0 ? (
            <Typography variant="p">No Feelings For Given User</Typography>
          ) : (
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note._id}>
                  <TableCell align="center">{note.title}</TableCell>
                  <TableCell align="center">
                    {note.description.substr(
                      0,
                      Math.min(20, note.description.length)
                    )}
                    ....
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
