import * as actionTypes from "../constants/actionTypes";
import * as api from "../api/faq";

//fetching all faq
export const fetchAllFaq = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.fetchAllFaq();
    dispatch({ type: actionTypes.FETCH_ALL_FAQ, data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    dispatch({ type: actionTypes.END_LOADING });
  }
};

//fetching single faq
export const fetchSingleFaq = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.fetchSingleFaq(id);
    console.log(data);
    dispatch({ type: actionTypes.FETCH_SINGLE_FAQ, data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    dispatch({ type: actionTypes.END_LOADING });
  }
};

//creating the faq
export const createFaq = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.createFaq(formData);
    history.replace("/dashboard/faq");
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    dispatch({ type: actionTypes.END_LOADING });
    console.log(error);
  }
};

//delete the single faq we must pass id of the faq as a parameter
export const deleteFaq = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.deleteFaq(id);
    dispatch({ type: actionTypes.DELETE_FAQ, data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    dispatch({ type: actionTypes.END_LOADING });
  }
};
