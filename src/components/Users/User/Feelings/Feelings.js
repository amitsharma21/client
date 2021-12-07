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
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useParams } from "react-router-dom";
import axios from "axios";

import useStyles from "./styles";

const Feelings = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [feelings, setFeelings] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "http://localhost:5000/feeling/fetchall",
        {
          headers: { userid: id },
        }
      );
      setFeelings(data);
    }
    fetchData();
  }, [id]);
  return (
    <Card className={classes.Card}>
      <Typography variant="h5"> User Feelings </Typography>
      {feelings === null ? (
        <CircularProgress />
      ) : (
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Mood</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Feelings</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          {feelings.length === 0 ? (
            <Typography variant="p">No Feelings for given user</Typography>
          ) : (
            <TableBody>
              {feelings.map((feeling) => (
                <TableRow key={feeling._id}>
                  <TableCell component="th" scope="row">
                    {feeling.date}
                  </TableCell>
                  <TableCell align="right">{feeling.mood}</TableCell>
                  <TableCell align="right">
                    {feeling.feeling.substr(
                      0,
                      Math.min(10, feeling.feeling.length)
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <RemoveRedEyeIcon
                      className={classes.icon}
                      //   onClick={() => viewUser(user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </Card>
  );
};

export default Feelings;
