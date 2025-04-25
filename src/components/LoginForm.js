import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/login", {
        username,
        password,
      });

      const token = response.data.access_token;
      const restaurateurId = response.data.restaurateur_id;  // Ajouter l'ID du restaurateur

      // Stocker le token et l'ID du restaurateur dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("restaurateur_id", restaurateurId);

      setIsAuthenticated(true);
      setSuccessMessage("✅ Connexion réussie ! Redirection...");

      // Redirige après 1.5 secondes
      setTimeout(() => {
        navigate("/menu");
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Identifiants invalides");
      } else {
        setError("Erreur inconnue, veuillez réessayer.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Se connecter</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
