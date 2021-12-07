import * as actionTypes from "../constants/actionTypes";

const initialState = { faqs: [] };

const faq = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_FAQ:
      return { ...state, faqs: action.data };
    case actionTypes.FETCH_SINGLE_FAQ:
      return { ...state, faqs: [action.data] };
    case actionTypes.DELETE_FAQ:
      return {
        ...state,
        faqs: state.faqs.filter((faq) => faq._id !== action.data._id),
      };
    default:
      return state;
  }
};

export default faq;
