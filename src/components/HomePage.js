import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h2>Bienvenue sur la plateforme restaurateur 🍽️</h2>

      {!token ? (
        <>
          <h3>Commencez ici :</h3>
          <p>
            <Link to="/register">❤️ S'inscrire</Link>{" "}
            <Link to="/login">🔑 Se connecter</Link>
          </p>
        </>
      ) : (
        <p>Vous êtes connecté. Utilisez le menu ci-dessus pour naviguer.</p>
      )}
    </div>
  );
};

export default HomePage;
