import React, { useState } from "react";
import axios from "../api";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token); // Sauvegarde du token
      setMessage("Connexion réussie !");
      onLogin(); // Appelle une fonction de rafraîchissement (ex : redirection)
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.detail || "Erreur de connexion");
    }
  };

  return (
    <div>
      <h2>Connexion Restaurateur</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
