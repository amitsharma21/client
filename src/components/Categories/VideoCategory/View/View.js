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
import { useHistory, useParams } from "react-router-dom";

import Layout from "../../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../../constants/url";

const Blogs = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams(); //categoryId
  const [videoCategory, setVideoCategory] = useState(null);
  const [videoSubCategories, setVideoSubCategories] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let result = await axios.get(`${URL}/videocategory/fetchsingle/${id}`);
      setVideoCategory(result.data);
      result = await axios.get(`${URL}/videosubcategory/fetchall/${id}`);
      setVideoSubCategories(result.data);

      setRenderLoading(false);
    }
    fetchData();
  }, [id]);

  const deleteVideoSubCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete this SubCategory")) {
      const newArray = videoSubCategories.filter((subCategory) => {
        if (subCategory._id !== id) return true;
        else return false;
      });
      setVideoSubCategories(newArray);
      await axios.delete(`${URL}/videosubcategory/delete/${id}`);
      alert("SubCategory Deleted Successfully");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        {renderLoading ? (
          <CircularProgress />
        ) : (
          <>
            <div className={classes.Header}>
              <Typography variant="h5">
                {videoCategory.title} SubCategories
              </Typography>
              <ButtonGroup>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `/dashboard/categories/video/subcategory/create/${id}`
                    )
                  }
                >
                  Create New
                </Button>
              </ButtonGroup>
            </div>

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
                {videoSubCategories.map((videoSubCategory) => (
                  <TableRow key={videoSubCategory._id}>
                    <TableCell component="th" scope="row" align="center">
                      {videoSubCategory._id}
                    </TableCell>
                    <TableCell align="center">
                      {videoSubCategory.title.substr(
                        0,
                        Math.min(20, videoSubCategory.title.length)
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
                          onClick={() => {
                            history.push(
                              `/dashboard/categories/video/subCategory/edit/${videoSubCategory._id}`
                            );
                          }}
                        />
                        <DeleteIcon
                          color="error"
                          onClick={() =>
                            deleteVideoSubCategoryHandler(videoSubCategory._id)
                          }
                          className={classes.Icon}
                        />
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Card>
    </Layout>
  );
};

export default Blogs;
