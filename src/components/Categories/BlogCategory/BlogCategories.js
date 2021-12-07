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
  const [blogCategories, setBlogCategories] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/blogcategory/fetchall`);
      setBlogCategories(data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const deleteBlogCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete this Category")) {
      const newArray = blogCategories.filter((category) => {
        if (category._id !== id) return true;
        else return false;
      });
      setBlogCategories(newArray);
      await axios.delete(`${URL}/blogcategory/delete/${id}`);
      alert("Category Deleted Successfully");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Blog Categories</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/dashboard/categories/blog/create")}
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {renderLoading ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table} aria-label="blog category table">
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
              {blogCategories.map((blogCategory) => (
                <TableRow key={blogCategory._id}>
                  <TableCell component="th" scope="row" align="center">
                    {blogCategory._id}
                  </TableCell>
                  <TableCell align="center">
                    {blogCategory.title.substr(
                      0,
                      Math.min(20, blogCategory.title.length)
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
                            `/dashboard/categories/blog/view/${blogCategory._id}`
                          );
                        }}
                      />
                      <EditIcon
                        color="primary"
                        className={classes.Icon}
                        onClick={() => {
                          history.push(
                            `/dashboard/categories/blog/edit/${blogCategory._id}`
                          );
                        }}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() =>
                          deleteBlogCategoryHandler(blogCategory._id)
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
