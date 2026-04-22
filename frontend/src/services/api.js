import axios from "axios";

const API = axios.create({
  baseURL: "https://final-minor-production.up.railway.app/api",
});

export const getQuizzes = () => API.get("/quizzes");

export const createQuiz = (data) => API.post("/quizzes", data);

export default API;
