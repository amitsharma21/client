import React, { useState } from "react";

import { TextField, Card, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { createFaq } from "../../../actions/faq";
import Layout from "../../../UI/Layout/Layout";

const AddFaq = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({ question: "", answer: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFaq(formData, history));
  };
  return (
    <Layout>
      <Card className={classes.Card}>
        <form onSubmit={handleSubmit}>
          <div className={classes.Input}>
            <TextField
              variant="outlined"
              label="Enter Question"
              required
              fullWidth
              value={formData.question}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  question: event.target.value,
                });
              }}
            />
          </div>
          <div className={classes.Input}>
            <TextField
              variant="outlined"
              label="Enter Answer"
              required
              fullWidth
              value={formData.answer}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  answer: event.target.value,
                });
              }}
            />
          </div>
          <div className={classes.Button}>
            <Button type="submit" variant="contained" color="primary">
              Add FAQ
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default AddFaq;
