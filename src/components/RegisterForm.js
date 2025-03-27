import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/register", {
        username,
        password,
      });

      setMessage("✅ Inscription réussie ! Redirection en cours...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data.detail === "Utilisateur déjà existant") {
        setError("❗ Utilisateur déjà existant");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegisterForm;
