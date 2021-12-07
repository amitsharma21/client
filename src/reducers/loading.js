import * as actionTypes from "../constants/actionTypes";

const initialState = {
  loading: false,
  error: null,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return { ...state, loading: true };
    case actionTypes.END_LOADING:
      return { ...state, loading: false };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
export default loading;
