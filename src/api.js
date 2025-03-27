// src/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-fastapi-cvi0.onrender.com",
});

// Ajout automatique du token dans les en-têtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
