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
  const [
    guidedMeditationSubCategoryLoading,
    setGuidedMeditationSubCategoryLoading,
  ] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    categoryId: id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuidedMeditationSubCategoryLoading(true);
    try {
      await axios.post(`${URL}/guidedmeditationsubcategory/create`, formData);
      history.push(`/dashboard/categories/guidedmeditation/view/${id}`);
      alert("SubCategory Created Successfully");
    } catch (error) {
      alert(error.message);
    }
    setGuidedMeditationSubCategoryLoading(false);
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Add New SubCategory </Typography>
        </div>
        <div className={classes.Body}>
          <div className={classes.Form}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={classes.Input}>
                <TextField
                  required
                  label="Guided Meditation SubCategory Title"
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
                  {guidedMeditationSubCategoryLoading ? (
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
