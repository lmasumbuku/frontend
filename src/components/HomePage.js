import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenue sur la plateforme restaurateur 🍽️</h1>
      <h2>Accès</h2>
      <Link to="/register">S'inscrire</Link>
      <br />
      <Link to="/login">Se connecter</Link>
    </div>
  );
};

export default HomePage;
