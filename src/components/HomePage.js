import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h2>Bienvenue sur la plateforme restaurateur 🍽️</h2>

      {!token ? (
        <>
          <h3>Commencez ici :</h3>
          <p>
            <Link
              to="/register"
              style={{ color: "#007bff", textDecoration: "none", marginRight: "10px" }}
              aria-label="S'inscrire"
            >
              ❤️ S'inscrire
            </Link>
            <Link
              to="/login"
              style={{ color: "#007bff", textDecoration: "none" }}
              aria-label="Se connecter"
            >
              🔑 Se connecter
            </Link>
          </p>
        </>
      ) : (
        <p>
          Vous êtes connecté. Utilisez le menu ci-dessus pour naviguer.
        </p>
      )}
    </div>
  );
};

export default HomePage;
