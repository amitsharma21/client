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
  const [audioCategories, setAudioCategories] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/audiocategory/fetchall`);
      setAudioCategories(data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const deleteAudioCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete this Category")) {
      const newArray = audioCategories.filter((category) => {
        if (category._id !== id) return true;
        else return false;
      });
      setAudioCategories(newArray);
      await axios.delete(`${URL}/audiocategory/delete/${id}`);
      alert("Category Deleted Successfully");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Audio Categories</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/dashboard/categories/audio/create")}
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {renderLoading ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table} aria-label="audio category table">
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
              {audioCategories.map((audioCategory) => (
                <TableRow key={audioCategory._id}>
                  <TableCell component="th" scope="row" align="center">
                    {audioCategory._id}
                  </TableCell>
                  <TableCell align="center">
                    {audioCategory.title.substr(
                      0,
                      Math.min(20, audioCategory.title.length)
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
                            `/dashboard/categories/audio/view/${audioCategory._id}`
                          );
                        }}
                      />
                      <EditIcon
                        color="primary"
                        className={classes.Icon}
                        onClick={() => {
                          history.push(
                            `/dashboard/categories/audio/edit/${audioCategory._id}`
                          );
                        }}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() =>
                          deleteAudioCategoryHandler(audioCategory._id)
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
