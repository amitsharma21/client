import React, { useEffect, useState } from "react";

import {
  Card,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import Layout from "../../UI/Layout/Layout";
import { URL } from "../../constants/url";

const GuidedMeditation = () => {
  const classes = useStyles();
  const history = useHistory();
  const [guidedMeditation, setGuidedMeditation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/guidedmeditation/fetchall`);
      setGuidedMeditation(data);
    }
    fetchData();
  }, []);

  const deleteGuidedMeditationHandler = async (id) => {
    if (window.confirm("Do you want to delete this Guided Meditation")) {
      const newArray = guidedMeditation.filter((single) => {
        if (single._id !== id) return true;
        else return false;
      });
      setGuidedMeditation(newArray);
      await axios.delete(`${URL}/guidedmeditation/delete/${id}`);
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Guided Meditation</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/dashboard/guidedmeditation/create")}
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {guidedMeditation === null ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Title</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Description</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Media Tracks</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guidedMeditation.map((single) => (
                <TableRow key={single._id}>
                  <TableCell component="th" scope="row" align="center">
                    {single.title}
                  </TableCell>
                  <TableCell align="center">
                    {single.description.substr(
                      0,
                      Math.min(20, single.description.length)
                    )}
                    ....
                  </TableCell>
                  <TableCell align="center">
                    <RemoveRedEyeIcon
                      color="warning"
                      className={classes.Icon}
                      onClick={() =>
                        history.push(
                          `/dashboard/guidedmeditation/view/${single._id}`
                        )
                      }
                    />
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
                            `/dashboard/guidedmeditation/edit/${single._id}`
                          )
                        }
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() =>
                          deleteGuidedMeditationHandler(single._id)
                        }
                        title="delete"
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

export default GuidedMeditation;
