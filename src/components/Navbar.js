import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
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
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
