import * as actionTypes from "../constants/actionTypes";
import * as api from "../api/index";

//This function fetch all the users inside the database
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.fetchAllUsers();
    dispatch({ data, type: actionTypes.FETCH_ALL_USERS });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    dispatch({ type: actionTypes.END_LOADING });
    console.log(error);
  }
};

//This function fetch the single user user this function takes Id of the user as the parameter
export const fetchSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.fetchSingleUser(id);
    dispatch({ type: actionTypes.FETCH_SINGLE_USER, data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    dispatch({ type: actionTypes.END_LOADING });
    console.log(error);
  }
};
