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

import Layout from "../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../constants/url";

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [fileUploadedSuccessfully, setFileUploadedSuccessfully] =
    useState(false);
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [motivationLoading, setMotivationLoading] = useState(false);

  const [formData, setFormData] = useState({
    quote: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMotivationLoading(true);
    try {
      await axios.post(`${URL}/motivation/create`, formData);
      history.replace("/dashboard/motivation");
      alert("Motivation Created Successfully");
    } catch (error) {
      alert(error.message);
    }
    setMotivationLoading(false);
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
          <Typography variant="h5">Add Motivation</Typography>
        </div>
        <div className={classes.Body}>
          <div className={classes.Form}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={classes.Input}>
                <TextField
                  required
                  label="Motivation Quote"
                  value={formData.quote}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setFormData({ ...formData, quote: e.target.value });
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
                    setFormData({ ...formData, image: e.target.files[0].name });
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={file === null || fileUploadedSuccessfully === true}
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
                  {motivationLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Add Motivation"
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
