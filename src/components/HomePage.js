import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenue sur la plateforme restaurateur 🍽️</h1>
      <h2>Commencez ici :</h2>
      <div style={{ marginTop: "20px" }}>
        <Link to="/register" style={{ marginRight: "20px", fontSize: "18px" }}>
          🔸 S'inscrire
        </Link>
        <Link to="/login" style={{ fontSize: "18px" }}>
          🔑 Se connecter
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
