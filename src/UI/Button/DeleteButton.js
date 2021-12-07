import React from "react";

import { Button } from "@mui/material";

const DeleteButton = ({ clicked, value, type }) => {
  return (
    <Button variant="contained" color="error" type={type} onClick={clicked}>
      {value}
    </Button>
  );
};

export default DeleteButton;
