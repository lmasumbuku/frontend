import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/login", {
        username,
        password
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setMessage("Connexion réussie !");
      setUsername("");
      setPassword("");
      onLogin(); // 🔄 actualiser l'état global si besoin
    } catch (error) {
      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail); // 👈 Affiche uniquement le message clair
      } else {
        setMessage("Erreur lors de la connexion.");
      }
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
