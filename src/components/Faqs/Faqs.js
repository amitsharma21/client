import React, { useEffect } from "react";

import {
  CircularProgress,
  Button,
  Card,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Faq from "./Faq/Faq";
import useStyles from "./styles";
import { fetchAllFaq } from "../../actions/faq";
import Layout from "../../UI/Layout/Layout";

const Faqs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.loading.loading);
  const faqs = useSelector((state) => state.faqs.faqs);

  useEffect(() => {
    dispatch(fetchAllFaq());
  }, [dispatch]);
  const addFaq = () => {
    history.push("/dashboard/faq/add");
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Frequently Asked Questions</Typography>
          <ButtonGroup>
            <Button variant="contained" color="primary" onClick={addFaq}>
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {faqs.map((faq) => (
              <Faq
                question={faq.question}
                answer={faq.answer}
                key={faq._id}
                id={faq._id}
              />
            ))}
          </>
        )}
      </Card>
    </Layout>
  );
};

export default Faqs;
