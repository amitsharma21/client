import React from "react";

import { Card } from "@mui/material";

const CardComponent = ({ children }) => {
  return <Card style={{ Padding: "10px", margin: "10px" }}>{children}</Card>;
};

export default CardComponent;
