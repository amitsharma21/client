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

const VideoTracks = () => {
  const classes = useStyles();
  const history = useHistory();
  const [videoTracks, setVideoTracks] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/video/fetchall`);
      setVideoTracks(data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const deleteVideoHandler = async (id) => {
    if (window.confirm("Do you want to delete this video")) {
      const newVideoArray = videoTracks.filter((singleVideo) => {
        if (singleVideo._id !== id) return true;
        else return false;
      });
      setVideoTracks(newVideoArray);
      await axios.delete(`${URL}/video/delete/${id}`);
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Video Tracks</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/dashboard/videotracks/create")}
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
              {videoTracks?.map((video) => (
                <TableRow key={video._id}>
                  <TableCell component="th" scope="row" align="center">
                    {video.title}
                  </TableCell>
                  <TableCell align="center">
                    {video.description.substr(
                      0,
                      Math.min(20, video.description.length)
                    )}
                    ....
                  </TableCell>
                  <TableCell align="center">
                    {video.premium === true ? "Premium" : "Free"}
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
                            `/dashboard/videotracks/edit/${video._id}`
                          )
                        }
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => deleteVideoHandler(video._id)}
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

export default VideoTracks;
