import React, { useState, useEffect } from "react";

import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../../UI/Layout/Layout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useStyles from "./styles";
import { URL } from "../../../constants/url";

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [fileUploadedSuccessfully, setFileUploadedSuccessfully] =
    useState(false);
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [goodSubCategories, setGoodSubCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    body: "<p></p>",
    image: "",
    category: "",
    subCategory: "",
  });

  useEffect(() => {
    async function fetchData() {
      let result = await axios.get(`${URL}/blogcategory/fetchall`);
      setCategories(result.data);
      result = await axios.get(`${URL}/blogsubcategory/fetchall`);
      setSubCategories(result.data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBlogLoading(true);
    try {
      await axios.post(`${URL}/blog/create`, formData);
      history.replace("/dashboard/blogs");
      alert("Blog Created Successfully");
    } catch (error) {
      alert(error.message);
    }
    setBlogLoading(false);
  };

  const uploadFile = () => {
    setFileLoading(true);
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
      setFileLoading(false);
      setFileUploadedSuccessfully(true);
      setFile(null);
    }, 2000);
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Add Blog</Typography>
        </div>
        {renderLoading === true ? (
          <CircularProgress />
        ) : (
          <div className={classes.Body}>
            <div className={classes.Form}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={classes.Input}>
                  <TextField
                    required
                    label="Blog Title"
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
                    label="Blog Description"
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
                    label="Blog Tags"
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
                    <InputLabel>Blog Category</InputLabel>
                    <Select
                      required
                      label="Blog category"
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
                    <InputLabel>Blog SubCategory</InputLabel>
                    <Select
                      label="Blog Subcategory"
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
                <div className={classes.Input}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.body}
                    onChange={(event, editor) => {
                      setFormData({ ...formData, body: editor.getData() });
                    }}
                  />
                </div>
                <div className={classes.FileInput}>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    disabled={fileUploadedSuccessfully}
                    onChange={(e) => {
                      setFile({ file: e.target.files[0] });
                      setFormData({
                        ...formData,
                        image: e.target.files[0].name,
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      file === null || fileUploadedSuccessfully === true
                    }
                    onClick={uploadFile}
                  >
                    {fileLoading ? (
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
                    disabled={fileUploadedSuccessfully === false}
                  >
                    {blogLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Add Blog"
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
