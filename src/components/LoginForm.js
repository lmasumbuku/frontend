import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ setIsAuthenticated }) => {
  const [isRegistering, setIsRegistering] = useState(false); // Contrôle de l'affichage du formulaire
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
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/login", {
        username,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      setIsAuthenticated(true);
      setSuccessMessage("✅ Connexion réussie ! Redirection...");
      setTimeout(() => navigate("/menu"), 1500);
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/auth/register", {
        username,
        password,
        nom_restaurant: nomRestaurant,
        nom_representant: nomRepresentant,
        prenom_representant: prenomRepresentant,
        adresse_postale: adressePostale,
        email,
        numero_appel: numeroAppel,
      });

      setSuccessMessage("✅ Inscription réussie, vous pouvez maintenant vous connecter !");
      setIsRegistering(false); // Retourne au formulaire de connexion
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="container">
      <h2>{isRegistering ? "Inscription" : "Connexion"}</h2>

      {/* Formulaire d'inscription */}
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nom du restaurant"
            value={nomRestaurant}
            onChange={(e) => setNomRestaurant(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nom du représentant"
            value={nomRepresentant}
            onChange={(e) => setNomRepresentant(e.target.value)}
          />
          <input
            type="text"
            placeholder="Prénom du représentant"
            value={prenomRepresentant}
            onChange={(e) => setPrenomRepresentant(e.target.value)}
          />
          <input
            type="text"
            placeholder="Adresse postale"
            value={adressePostale}
            onChange={(e) => setAdressePostale(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Numéro de ligne vocale"
            value={numeroAppel}
            onChange={(e) => setNumeroAppel(e.target.value)}
          />
          <button type="submit">S'inscrire</button>
        </form>
      ) : (
        {/* Formulaire de connexion */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Se connecter</button>
        </form>
      )}

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Déjà inscrit ? Se connecter" : "Pas encore inscrit ? S'inscrire"}
      </button>
    </div>
  );
};

export default AuthPage;
