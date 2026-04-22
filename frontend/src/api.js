import axios from "axios";

const API = axios.create({
  baseURL: "https://final-minor-production.up.railway.app/api",
});

// Example APIs

export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (data) => API.post("/auth/register", data);

export const getQuizzes = () => API.get("/quizzes");

export const createQuiz = (data) => API.post("/quizzes", data);

export const joinQuiz = (code) => API.get(`/quizzes/join/${code}`);

export default API;
