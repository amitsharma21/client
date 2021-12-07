import React, { useState, useEffect } from "react";

import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import Layout from "../../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../../constants/url";

function Edit() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [renderLoading, setRenderLoading] = useState(true);
  const [guidedMeditationCategoryLoading, setGuidedMeditationCategoryLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${URL}/guidedmeditationcategory/fetchsingle/${id}`
      );
      setFormData((preData) => ({ ...preData, title: data.title }));
      setRenderLoading(false);
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuidedMeditationCategoryLoading(true);
    try {
      await axios.patch(
        `${URL}/guidedmeditationcategory/update/${id}`,
        formData
      );
      history.replace("/dashboard/categories/guidedmeditation");
      alert("Guided Meditation Category Updated Successfully");
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
        {renderLoading ? (
          <CircularProgress />
        ) : (
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
                      "Edit Guided Meditation Category"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Card>
    </Layout>
  );
}

export default Edit;
