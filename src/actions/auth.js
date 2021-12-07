import * as actionTypes from "../constants/actionTypes";
import * as api from "../api/index";

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: actionTypes.SIGNIN, data });
  } catch (error) {
    console.log(error);
  }
};
