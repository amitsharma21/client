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
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${URL}/blog/fetchall`);
      setBlogs(data);
    }
    fetchData();
  }, []);

  const deleteBlogHandler = async (id) => {
    if (window.confirm("Do you want to delete this Blog")) {
      const newBlogsArray = blogs.filter((singleBlog) => {
        if (singleBlog._id !== id) return true;
        else return false;
      });
      setBlogs(newBlogsArray);
      await axios.delete(`${URL}/blog/delete/${id}`);
      alert("Blogs Deleted Successfully");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Blogs</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => setCreateBlogModal(true)}
              onClick={() => history.push("/dashboard/blog/create")}
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {blogs === null ? (
          <CircularProgress />
        ) : (
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Id</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Title</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Description</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell component="th" scope="row" align="center">
                    {blog._id}
                  </TableCell>
                  <TableCell align="center">
                    {blog.title.substr(0, Math.min(20, blog.title.length))}
                    ....
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    {blog.description.substr(
                      0,
                      Math.min(20, blog.description.length)
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
                        // onClick={() => editConfigHandler(blog)}
                        onClick={() => {
                          history.push(`/dashboard/blog/edit/${blog._id}`);
                        }}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => deleteBlogHandler(blog._id)}
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
