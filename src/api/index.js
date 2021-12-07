import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//auth functions
export const signin = (formData) => API.post("/admin/signin", formData);

//fetching users
export const fetchAllUsers = () => API.get("/user/fetchall");
export const fetchSingleUser = (id) => API.get(`/user/fetchsingle/${id}`);
