import React, { useEffect, useState } from "react";

import { Button, Card, Typography } from "@mui/material";
import axios from "axios";

import CkEditor from "../../UI/CkEditor/CkEditor";
import Layout from "../../UI/Layout/Layout";
import useStyles from "./styles";

const TermsConditions = () => {
  const classes = useStyles();
  const [ckEditorData, setCkEditorData] = useState("<p></p>");

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:5000/tac/fetch");
      setCkEditorData(data[0].tac);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.patch("http://localhost:5000/tac/update", {
        ckEditorData: ckEditorData,
      });
      alert("Terms and conditions updated");
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <Typography variant="h5"> Terms And Conditions</Typography>
        <CkEditor
          ckEditorData={ckEditorData}
          setCkEditorData={setCkEditorData}
        />
        <div className={classes.Button}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default TermsConditions;
