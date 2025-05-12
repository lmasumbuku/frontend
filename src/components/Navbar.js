import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login"); // Redirige vers la page de connexion après déconnexion
  };

  return (
    <nav>
      <Link to="/">Accueil</Link>{" | "}
      {!isAuthenticated && <Link to="/login">Connexion</Link>}
      {!isAuthenticated && <Link to="/register">Inscription</Link>}
      {isAuthenticated && (
        <>
          <Link to="/menu">Menu</Link>{" | "}
          <Link to="/add">Ajouter un plat</Link>{" | "}
          <Link to="/orders">Commandes</Link>{" | "}
          <Link to="/profile" className="hover:underline">Mon Profil</Link>{" | "}
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
