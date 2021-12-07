import React from "react";

import { Card, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import Layout from "../../UI/Layout/Layout";

const Categories = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Categories</Typography>
        </div>
        <hr></hr>
        <div className={classes.Body}>
          <Typography
            variant="p"
            className={classes.Input}
            onClick={() => history.push("/dashboard/categories/blog")}
          >
            Blog Categories
          </Typography>
          <hr></hr>
          <Typography
            variant="p"
            className={classes.Input}
            onClick={() => history.push("/dashboard/categories/audio")}
          >
            Audio Categories
          </Typography>
          <hr></hr>
          <Typography
            variant="p"
            className={classes.Input}
            onClick={() => history.push("/dashboard/categories/video")}
          >
            Video Categories
          </Typography>
          <hr></hr>
          <Typography
            variant="p"
            className={classes.Input}
            onClick={() =>
              history.push("/dashboard/categories/guidedmeditation")
            }
          >
            Guided Meditation Categories
          </Typography>
        </div>
      </Card>
    </Layout>
  );
};

export default Categories;
