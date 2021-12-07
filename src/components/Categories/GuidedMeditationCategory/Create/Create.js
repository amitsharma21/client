import React, { useState } from "react";

import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../../constants/url";

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [guidedMeditationCategoryLoading, setGuidedMeditationCategoryLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuidedMeditationCategoryLoading(true);
    try {
      await axios.post(`${URL}/guidedmeditationcategory/create`, formData);
      history.replace("/dashboard/categories/guidedmeditation");
      alert("Guided Meditation Category Created Successfully");
    } catch (error) {
      alert(error.message);
    }
    setGuidedMeditationCategoryLoading(false);
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Add Guided Meditation Category</Typography>
        </div>
        <div className={classes.Body}>
          <div className={classes.Form}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={classes.Input}>
                <TextField
                  required
                  label="Guided Meditation Category Title"
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
                  {guidedMeditationCategoryLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Add Guided Meditation Category"
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
