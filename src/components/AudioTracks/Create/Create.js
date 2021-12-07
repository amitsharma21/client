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
  const [musicFileUploadedSuccessfully, setMusicFileUploadedSuccessfully] =
    useState(false);
  const [musicFile, setMusicFile] = useState(null);
  const [
    thumbnailFileUploadedSuccessfully,
    setThumbnailFileUploadedSuccessfully,
  ] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [musicFileLoading, setMusicFileLoading] = useState(false);
  const [thumbnailFileLoading, setThumbnailFileLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [renderLoading, setRenderLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [goodSubCategories, setGoodSubCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    premium: "",
    category: "",
    subCategory: "",
    music: "",
    thumbnail: "",
  });

  useEffect(() => {
    async function fetchData() {
      let result = await axios.get(`${URL}/audiocategory/fetchall`);
      setCategories(result.data);
      result = await axios.get(`${URL}/audiosubcategory/fetchall`);
      setSubCategories(result.data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAudioLoading(true);
    try {
      await axios.post(`${URL}/music/create`, formData);
      history.replace("/dashboard/audiotracks");
      alert("Audio Created Successfully");
    } catch (error) {
      alert(error.message);
    }
    setAudioLoading(false);
  };

  const uploadMusicFile = () => {
    setMusicFileLoading(true);
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
      setMusicFileLoading(false);
      setMusicFileUploadedSuccessfully(true);
      setMusicFile(null);
    }, 2000);
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
          <Typography variant="h5">Add Audio Track</Typography>
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
                    label="Audio Name"
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
                    label="Audio Description"
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
                    label="Audio Tags"
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
                    <InputLabel>Audio Category</InputLabel>
                    <Select
                      required
                      label="Audio category"
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
                    <InputLabel>Audio SubCategory</InputLabel>
                    <Select
                      label="Audio Subcategory"
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
                    accept="audio/*"
                    required
                    disabled={musicFileUploadedSuccessfully}
                    onChange={(e) => {
                      setMusicFile({ file: e.target.files[0] });
                      setFormData({
                        ...formData,
                        music: e.target.files[0].name,
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      musicFile === null ||
                      musicFileUploadedSuccessfully === true
                    }
                    onClick={uploadMusicFile}
                  >
                    {musicFileLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Upload Music"
                    )}
                  </Button>
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

                <div className={classes.Input}>
                  <FormControl fullWidth>
                    <InputLabel>Audio Pricing</InputLabel>
                    <Select
                      label="Audio Pricing"
                      value={formData.premium}
                      required
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          premium: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value={false}>Free</MenuItem>
                      <MenuItem value={true}>Premium</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.Button}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={
                      musicFileUploadedSuccessfully === false ||
                      thumbnailFileUploadedSuccessfully === false
                    }
                  >
                    {audioLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Add Music"
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
