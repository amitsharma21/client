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

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [audioCategoryLoading, setAudioCategoryLoading] = useState(false);
  const [renderLoading, setRenderLoadin] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${URL}/audiocategory/fetchsingle/${id}`
      );
      setFormData({ ...data });
      setRenderLoadin(false);
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAudioCategoryLoading(true);
    try {
      await axios.patch(`${URL}/audiocategory/update/${id}`, formData);
      history.replace("/dashboard/categories/audio");
      alert("Audio Category Updated Successfully");
    } catch (error) {
      alert(error.message);
    }
    setAudioCategoryLoading(false);
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Edit Audio Category</Typography>
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
                    label="Audio Category Title"
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
                    {audioCategoryLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Edit Audio Category"
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

export default Create;
