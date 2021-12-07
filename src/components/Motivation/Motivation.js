import React, { useState, useEffect } from "react";

import {
  Card,
  Typography,
  ButtonGroup,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../constants/url";

const Blogs = () => {
  const classes = useStyles();
  const history = useHistory();
  const [motivations, setMotivations] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/motivation/fetchall`);
      setMotivations(data);
    }
    fetchData();
  }, []);

  const deleteMotivationHandler = async (id) => {
    if (window.confirm("Do you want to delete this Motivation")) {
      const newMotivationsArray = motivations.filter((singleMotivation) => {
        if (singleMotivation._id !== id) return true;
        else return false;
      });
      setMotivations(newMotivationsArray);
      await axios.delete(`${URL}/motivation/delete/${id}`);
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Motivation</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/dashboard/motivation/create`)}
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {motivations === null ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Id</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Quote</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {motivations.map((motivation) => (
                <TableRow key={motivation._id}>
                  <TableCell component="th" scope="row" align="center">
                    {motivation._id}
                  </TableCell>
                  <TableCell align="center">
                    {motivation.quote.substr(
                      0,
                      Math.min(20, motivation.quote.length)
                    )}
                    ....
                  </TableCell>

                  <TableCell align="center">
                    <ButtonGroup
                      variant="outlined"
                      style={{ marginBottom: "10px" }}
                    >
                      <EditIcon
                        color="primary"
                        className={classes.Icon}
                        onClick={() =>
                          history.push(
                            `/dashboard/motivation/edit/${motivation._id}`
                          )
                        }
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => deleteMotivationHandler(motivation._id)}
                        className={classes.Icon}
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

export default Blogs;
