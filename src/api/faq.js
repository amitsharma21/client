import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchAllFaq = () => API.get("/faq/fetchall");
export const fetchSingleFaq = (id) => API.get(`/faq/fetchsingle/${id}`);
export const deleteFaq = (id) => API.delete(`/faq/delete/${id}`);
export const createFaq = (formData) => API.post(`faq/create`, formData);
