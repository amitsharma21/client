import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button, Card, Typography } from "@mui/material";

import CkEditor from "../../UI/CkEditor/CkEditor";
import Layout from "../../UI/Layout/Layout";
import useStyles from "./styles";

const TermsConditions = () => {
  const classes = useStyles();
  const [ckEditorData, setCkEditorData] = useState("<p></p>");

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "http://localhost:5000/privacypolicy/fetch"
      );
      setCkEditorData(data[0].privacyPolicy);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.patch("http://localhost:5000/privacypolicy/update", {
        ckEditorData: ckEditorData,
      });
      alert("Privacy Policy updated");
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <Typography variant="h5"> Privacy Policy</Typography>
        <CkEditor
          ckEditorData={ckEditorData}
          setCkEditorData={setCkEditorData}
        />
        <div className={classes.Button}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default TermsConditions;
