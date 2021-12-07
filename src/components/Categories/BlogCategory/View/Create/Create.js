import React, { useState } from "react";

import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import Layout from "../../../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../../../constants/url";

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [blogSubCategoryLoading, setBlogSubCategoryLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    categoryId: id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBlogSubCategoryLoading(true);
    try {
      await axios.post(`${URL}/blogsubcategory/create`, formData);
      history.replace(`/dashboard/categories/blog/view/${id}`);
      alert("SubCategory Created Successfully");
    } catch (error) {
      alert(error.message);
    }
    setBlogSubCategoryLoading(false);
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Add New SubCategory</Typography>
        </div>
        <div className={classes.Body}>
          <div className={classes.Form}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={classes.Input}>
                <TextField
                  required
                  label="Blog SubCategory Title"
                  value={formData.title}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />
              </div>

              <div className={classes.Button}>
                <Button type="submit" variant="contained" color="primary">
                  {blogSubCategoryLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Add SubCategory"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </Layout>
  );
}

export default Create;
