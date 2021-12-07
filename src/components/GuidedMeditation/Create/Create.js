import React, { useEffect, useState } from "react";

import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../constants/url";

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [
    thumbnailFileUploadedSuccessfully,
    setThumbnailFileUploadedSuccessfully,
  ] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailFileLoading, setThumbnailFileLoading] = useState(false);
  const [guidedMeditationLoading, setGuidedMeditationLoading] = useState(false);
  const [renderLoading, setRenderLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [goodSubCategories, setGoodSubCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
    subCategory: "",
    thumbnail: "",
  });

  useEffect(() => {
    async function fetchData() {
      let result = await axios.get(`${URL}/guidedmeditationcategory/fetchall`);
      setCategories(result.data);
      result = await axios.get(`${URL}/guidedmeditationsubcategory/fetchall`);
      setSubCategories(result.data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuidedMeditationLoading(true);
    try {
      await axios.post(`${URL}/guidedmeditation/create`, formData);
      history.replace("/dashboard/guidedmeditation");
      alert("Guided Meditation Created Successfully");
    } catch (error) {
      alert(error.message);
    }
    setGuidedMeditationLoading(false);
  };

  const uploadThumbnailFile = () => {
    setThumbnailFileLoading(true);
    // const FileData = new FormData();
    // FileData.append("demo file", file, file.name);
    // axios
    //   .post(
    //     "https://71xwinhfsf.execute-api.ap-south-1.amazonaws.com/prod/file-upload",
    //     FormData
    //   )
    //   .then((data) => {
    //     setLoading(false);
    //     console.log(data);

    //   });
    setTimeout(() => {
      setThumbnailFileLoading(false);
      setThumbnailFileUploadedSuccessfully(true);
      setThumbnailFile(null);
    }, 2000);
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Add Guided Meditation</Typography>
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
                    label="Guided Meditation Name"
                    value={formData.title}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                    }}
                  />
                </div>
                <div className={classes.Input}>
                  <TextField
                    required
                    label="Guided Meditation Description"
                    value={formData.description}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                    }}
                  />
                </div>
                <div className={classes.Input}>
                  <TextField
                    required
                    label="Guided Meditation Tags"
                    value={formData.tags}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      setFormData({ ...formData, tags: e.target.value });
                    }}
                  />
                </div>
                <div className={classes.Input}>
                  <FormControl fullWidth>
                    <InputLabel>Guided Meditation Category</InputLabel>
                    <Select
                      required
                      label="Guided Meditation category"
                      value={formData.category}
                      onChange={(e) => {
                        setFormData({ ...formData, category: e.target.value });
                        setSelectedCategory(e.target.value);
                        const newArray = subCategories.filter((value) => {
                          if (value.categoryId === e.target.value) return true;
                          else return false;
                        });
                        setGoodSubCategories(newArray);
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={classes.Input}>
                  <FormControl fullWidth>
                    <InputLabel>Guided Meditation SubCategory</InputLabel>
                    <Select
                      label="Guided Meditation Subcategory"
                      value={formData.subCategory}
                      required
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          subCategory: e.target.value,
                        });
                      }}
                      disabled={selectedCategory === null}
                    >
                      {goodSubCategories?.map((subCategory) => (
                        <MenuItem value={subCategory._id} key={subCategory._id}>
                          {subCategory.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={classes.FileInput}>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    disabled={thumbnailFileUploadedSuccessfully}
                    onChange={(e) => {
                      setThumbnailFile({ file: e.target.files[0] });
                      setFormData({
                        ...formData,
                        thumbnail: e.target.files[0].name,
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      thumbnailFile === null ||
                      thumbnailFileUploadedSuccessfully === true
                    }
                    onClick={uploadThumbnailFile}
                  >
                    {thumbnailFileLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Upload Thumbnail"
                    )}
                  </Button>
                </div>

                <div className={classes.Button}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={thumbnailFileUploadedSuccessfully === false}
                  >
                    {guidedMeditationLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Add Guided Meditation"
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
