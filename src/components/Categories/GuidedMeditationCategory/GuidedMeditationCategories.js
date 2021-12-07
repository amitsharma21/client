import React, { useState, useEffect } from "react";

import {
  Card,
  Typography,
  ButtonGroup,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../constants/url";

const Blogs = () => {
  const classes = useStyles();
  const history = useHistory();
  const [guidedMeditationCategories, setGuidedMeditationCategories] =
    useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${URL}/guidedmeditationcategory/fetchall`
      );
      setGuidedMeditationCategories(data);
      setRenderLoading(false);
    }
    fetchData();
  }, []);

  const deleteGuidedMeditationCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete this Category")) {
      const newArray = guidedMeditationCategories.filter((category) => {
        if (category._id !== id) return true;
        else return false;
      });
      setGuidedMeditationCategories(newArray);
      await axios.delete(`${URL}/guidedmeditationcategory/delete/${id}`);
      alert("Category Deleted Successfully");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        <div className={classes.Header}>
          <Typography variant="h5">Guided Meditation Categories</Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                history.push("/dashboard/categories/guidedmeditation/create")
              }
            >
              Create New
            </Button>
          </ButtonGroup>
        </div>
        {renderLoading ? (
          <CircularProgress />
        ) : (
          <Table
            className={classes.table}
            aria-label="guided Meditation category table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Id</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Title</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guidedMeditationCategories.map((guidedMeditationCategory) => (
                <TableRow key={guidedMeditationCategory._id}>
                  <TableCell component="th" scope="row" align="center">
                    {guidedMeditationCategory._id}
                  </TableCell>
                  <TableCell align="center">
                    {guidedMeditationCategory.title.substr(
                      0,
                      Math.min(20, guidedMeditationCategory.title.length)
                    )}
                    ....
                  </TableCell>

                  <TableCell align="center">
                    <ButtonGroup
                      variant="outlined"
                      style={{ marginBottom: "10px" }}
                    >
                      <RemoveRedEyeIcon
                        color="warning"
                        className={classes.Icon}
                        onClick={() => {
                          history.push(
                            `/dashboard/categories/guidedmeditation/view/${guidedMeditationCategory._id}`
                          );
                        }}
                      />
                      <EditIcon
                        color="primary"
                        className={classes.Icon}
                        onClick={() => {
                          history.push(
                            `/dashboard/categories/guidedmeditation/edit/${guidedMeditationCategory._id}`
                          );
                        }}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() =>
                          deleteGuidedMeditationCategoryHandler(
                            guidedMeditationCategory._id
                          )
                        }
                        className={classes.Icon}
                      />
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Layout>
  );
};

export default Blogs;
