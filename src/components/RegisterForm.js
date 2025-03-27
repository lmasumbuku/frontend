import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/register", {
        username,
        password
      });
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button type="submit">S'inscrire</button>
      <p>{message}</p>
    </form>
  );
};

export default RegisterForm;
