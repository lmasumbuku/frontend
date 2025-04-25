import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nomRestaurant, setNomRestaurant] = useState("");
  const [nomRepresentant, setNomRepresentant] = useState("");
  const [prenomRepresentant, setPrenomRepresentant] = useState("");
  const [adressePostale, setAdressePostale] = useState("");
  const [email, setEmail] = useState("");
  const [numeroAppel, setNumeroAppel] = useState("");
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      // Appel à l'API de connexion
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/login", {
        username,
        password,
      });

      const token = response.data.access_token;
      const restaurateurId = response.data.restaurateur_id;  // Ajouter l'ID du restaurateur à la réponse

      // Stocker le token et l'ID du restaurateur dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("restaurateur_id", restaurateurId);

      // Marquer l'utilisateur comme authentifié
      setIsAuthenticated(true);

      setSuccessMessage("✅ Connexion réussie ! Redirection...");

      // Redirige après 1.5 secondes
      setTimeout(() => {
        navigate("/menu"); // Rediriger vers la page du menu
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      // Appel à l'API d'inscription
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/register", {
        username,
        password,
        nom_restaurant: nomRestaurant,
        nom_representant: nomRepresentant,
        prenom_representant: prenomRepresentant,
        adresse_postale: adressePostale,
        email: email,
        numero_appel: numeroAppel,
      });

      setSuccessMessage("✅ Inscription réussie !");

      // Après l'inscription, redirection vers la page de connexion
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Erreur d'inscription");
      } else {
        setError("Erreur inconnue, veuillez réessayer.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Connexion / Inscription</h2>
      
      {/* Formulaire d'inscription */}
      <form onSubmit={handleRegister}>
        <h3>Inscription</h3>
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
        <input
          type="text"
          placeholder="Nom du restaurant"
          value={nomRestaurant}
          onChange={(e) => setNomRestaurant(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Nom du représentant"
          value={nomRepresentant}
          onChange={(e) => setNomRepresentant(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Prénom du représentant"
          value={prenomRepresentant}
          onChange={(e) => setPrenomRepresentant(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Adresse postale"
          value={adressePostale}
          onChange={(e) => setAdressePostale(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Numéro de ligne vocale"
          value={numeroAppel}
          onChange={(e) => setNumeroAppel(e.target.value)}
        /><br />
        
        <button type="submit">S'inscrire</button>
      </form>

      {/* Formulaire de connexion */}
      <form onSubmit={handleLogin}>
        <h3>Connexion</h3>
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
