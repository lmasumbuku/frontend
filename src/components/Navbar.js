import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/menu");  // Redirige l'utilisateur directement vers le menu s'il est connecté
    }
  }, [token, navigate]);

  return (
    <div className="container">
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
