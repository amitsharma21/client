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
  const [blogCategory, setBlogCategory] = useState(null);
  const [blogSubCategories, setBlogSubCategories] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let result = await axios.get(`${URL}/blogcategory/fetchsingle/${id}`);
      setBlogCategory(result.data);
      result = await axios.get(`${URL}/blogsubcategory/fetchall/${id}`);
      setBlogSubCategories(result.data);

      setRenderLoading(false);
    }
    fetchData();
  }, [id]);

  const deleteBlogSubCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete this SubCategory")) {
      const newArray = blogSubCategories.filter((subCategory) => {
        if (subCategory._id !== id) return true;
        else return false;
      });
      setBlogSubCategories(newArray);
      await axios.delete(`${URL}/blogsubcategory/delete/${id}`);
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
                {blogCategory.title} SubCategories
              </Typography>
              <ButtonGroup>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `/dashboard/categories/blog/subcategory/create/${id}`
                    )
                  }
                >
                  Create New
                </Button>
              </ButtonGroup>
            </div>

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
                {blogSubCategories.map((blogSubCategory) => (
                  <TableRow key={blogSubCategory._id}>
                    <TableCell component="th" scope="row" align="center">
                      {blogSubCategory._id}
                    </TableCell>
                    <TableCell align="center">
                      {blogSubCategory.title.substr(
                        0,
                        Math.min(20, blogSubCategory.title.length)
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
                              `/dashboard/categories/blog/subCategory/edit/${blogSubCategory._id}`
                            );
                          }}
                        />
                        <DeleteIcon
                          color="error"
                          onClick={() =>
                            deleteBlogSubCategoryHandler(blogSubCategory._id)
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
