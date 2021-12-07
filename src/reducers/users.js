import * as actionTypes from "../constants/actionTypes";

const initialState = { users: [] };

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_USERS:
      return { ...state, users: action.data };
    case actionTypes.FETCH_SINGLE_USER: {
      return { ...state, users: [action.data] };
    }
    default:
      return state;
  }
};

export default users;
