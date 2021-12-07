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
import axios from "axios";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import Layout from "../../UI/Layout/Layout";
import { URL } from "../../constants/url";

const AudioTracks = () => {
  const classes = useStyles();
  const history = useHistory();
  const [audioTracks, setAudioTracks] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/music/fetchall`);
      setAudioTracks(data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const deleteAudioHandler = async (id) => {
    if (window.confirm("Do you want to delete this video")) {
      const newAudioArray = audioTracks.filter((singleAudio) => {
        if (singleAudio._id !== id) return true;
        else return false;
      });
      setAudioTracks(newAudioArray);
      await axios.delete(`${URL}/music/delete/${id}`);
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Audio Tracks</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/dashboard/audiotracks/create")}
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {renderLoading ? (
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
                  <strong>Pricing</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audioTracks?.map((audio) => (
                <TableRow key={audio._id}>
                  <TableCell component="th" scope="row" align="center">
                    {audio.title}
                  </TableCell>
                  <TableCell align="center">
                    {audio.description.substr(
                      0,
                      Math.min(20, audio.description.length)
                    )}
                    ....
                  </TableCell>
                  <TableCell align="center">
                    {audio.premium ? "Premium" : "Free"}
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
                            `/dashboard/audiotracks/edit/${audio._id}`
                          )
                        }
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => deleteAudioHandler(audio._id)}
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

export default AudioTracks;
