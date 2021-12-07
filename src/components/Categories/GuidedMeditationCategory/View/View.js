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
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import Layout from "../../../../UI/Layout/Layout";
import useStyles from "./styles";
import { URL } from "../../../../constants/url";

const View = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams(); //categoryId
  const [guidedMeditationCategory, setGuidedMeditationCategory] =
    useState(null);
  const [guidedMeditationSubCategories, setGuidedMeditationSubCategories] =
    useState(null);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let result = await axios.get(
        `${URL}/guidedmeditationcategory/fetchsingle/${id}`
      );
      setGuidedMeditationCategory(result.data);
      result = await axios.get(
        `${URL}/guidedmeditationsubcategory/fetchall/${id}`
      );
      setGuidedMeditationSubCategories(result.data);

      setRenderLoading(false);
    }
    fetchData();
  }, [id]);

  const deleteGuidedMeditationSubCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete this SubCategory")) {
      const newArray = guidedMeditationSubCategories.filter((subCategory) => {
        if (subCategory._id !== id) return true;
        else return false;
      });
      setGuidedMeditationSubCategories(newArray);
      await axios.delete(`${URL}/guidedmeditationsubcategory/delete/${id}`);
      alert("SubCategory Deleted Successfully");
    }
  };

  return (
    <Layout>
      <Card className={classes.Card}>
        {renderLoading ? (
          <CircularProgress />
        ) : (
          <>
            <div className={classes.Header}>
              <Typography variant="h5">
                {guidedMeditationCategory?.title} SubCategories
              </Typography>
              <ButtonGroup>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `/dashboard/categories/guidedmeditation/subcategory/create/${id}`
                    )
                  }
                >
                  Create New
                </Button>
              </ButtonGroup>
            </div>

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
                {guidedMeditationSubCategories.map(
                  (guidedMeditationSubCategory) => (
                    <TableRow key={guidedMeditationSubCategory._id}>
                      <TableCell component="th" scope="row" align="center">
                        {guidedMeditationSubCategory._id}
                      </TableCell>
                      <TableCell align="center">
                        {guidedMeditationSubCategory.title.substr(
                          0,
                          Math.min(20, guidedMeditationSubCategory.title.length)
                        )}
                        ....
                      </TableCell>

                      <TableCell align="center">
                        <ButtonGroup
                          variant="outlined"
                          style={{ marginBottom: "10px" }}
                        >
                          <EditIcon
                            color="primary"
                            className={classes.Icon}
                            onClick={() => {
                              history.push(
                                `/dashboard/categories/guidedmeditation/subCategory/edit/${guidedMeditationSubCategory._id}`
                              );
                            }}
                          />
                          <DeleteIcon
                            color="error"
                            onClick={() =>
                              deleteGuidedMeditationSubCategoryHandler(
                                guidedMeditationSubCategory._id
                              )
                            }
                            className={classes.Icon}
                          />
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </>
        )}
      </Card>
    </Layout>
  );
};

export default View;
