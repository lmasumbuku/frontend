import React, { useState } from "react";
import axios from "../api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        username,
        password,
      });
      setMessage(response.data.message || "Inscription réussie !");
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Erreur lors de l'inscription");
    }
  };

  return (
    <div>
      <h2>Inscription Restaurateur</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
