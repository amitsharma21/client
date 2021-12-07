import React from "react";

import {
  Divider,
  Typography,
  Button,
  ButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import useStyles from "./styles";
import { deleteFaq } from "../../../actions/faq";

const Faq = ({ question, answer, id }) => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const editHandler = () => {
    history.push(`/dashboard/faq/edit/${id}`);
  };
  const deleteHandler = async () => {
    if (window.confirm("Do you want to delete this faq")) {
      await dispatch(deleteFaq(id));
    }
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <strong>{question}</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{answer}</Typography>
          <ButtonGroup variant="outlined" style={{ marginBottom: "10px" }}>
            <Button onClick={editHandler} color="primary" variant="contained">
              Edit
            </Button>
            <Button onClick={deleteHandler} color="primary" variant="contained">
              Delete
            </Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
      <Divider />
    </div>
  );
};

export default Faq;
