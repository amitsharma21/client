import { combineReducers } from "redux";

import authReducers from "./auth";
import loading from "./loading";
import users from "./users";
import faqs from "./faq";

export default combineReducers({
  authReducers: authReducers,
  loading: loading,
  users: users,
  faqs: faqs,
});
