import React, { useState, useEffect } from "react";

import { TextField, CircularProgress, Card, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useStyles from "./styles";
import { fetchSingleFaq } from "../../../actions/faq";
import Layout from "../../../UI/Layout/Layout";

const EditFaq = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector((state) => state.loading.loading);
  const [formData, setFormData] = useState(
    useSelector((state) => state.faqs.faqs[0])
  );

  useEffect(() => {
    dispatch(fetchSingleFaq(id));
  }, [dispatch, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("edit successfull");
  };
  return (
    <Layout>
      <Card className={classes.Card}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={classes.Input}>
              <TextField
                variant="outlined"
                label="Enter Question"
                required
                fullWidth
                value={formData?.question}
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
                value={formData?.answer}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    answer: event.target.value,
                  });
                }}
              />
            </div>

            <div className={classes.Button}>
              <Button type="submit" color="primary" variant="contained">
                Edit
              </Button>
            </div>
          </form>
        )}
      </Card>
    </Layout>
  );
};

export default EditFaq;
