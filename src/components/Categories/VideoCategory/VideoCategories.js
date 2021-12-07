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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../constants/url";

const Blogs = () => {
  const classes = useStyles();
  const history = useHistory();
  const [videoCategories, setVideoCategories] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/videocategory/fetchall`);
      setVideoCategories(data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const deleteVideoCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete this Category")) {
      const newArray = videoCategories.filter((category) => {
        if (category._id !== id) return true;
        else return false;
      });
      setVideoCategories(newArray);
      await axios.delete(`${URL}/videocategory/delete/${id}`);
      alert("Category Deleted Successfully");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Video Categories</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/dashboard/categories/video/create")}
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {renderLoading ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table} aria-label="video category table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Id</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Title</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videoCategories.map((videoCategory) => (
                <TableRow key={videoCategory._id}>
                  <TableCell component="th" scope="row" align="center">
                    {videoCategory._id}
                  </TableCell>
                  <TableCell align="center">
                    {videoCategory.title.substr(
                      0,
                      Math.min(20, videoCategory.title.length)
                    )}
                    ....
                  </TableCell>

                  <TableCell align="center">
                    <ButtonGroup
                      variant="outlined"
                      style={{ marginBottom: "10px" }}
                    >
                      <RemoveRedEyeIcon
                        color="warning"
                        className={classes.Icon}
                        onClick={() => {
                          history.push(
                            `/dashboard/categories/video/view/${videoCategory._id}`
                          );
                        }}
                      />
                      <EditIcon
                        color="primary"
                        className={classes.Icon}
                        onClick={() => {
                          history.push(
                            `/dashboard/categories/video/edit/${videoCategory._id}`
                          );
                        }}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() =>
                          deleteVideoCategoryHandler(videoCategory._id)
                        }
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
