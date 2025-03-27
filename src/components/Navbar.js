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
      {isAuthenticated ? (
        <>
          <Link to="/menu">🧾 Menu</Link> |{" "}
          <Link to="/add">➕ Ajouter un plat</Link> |{" "}
          <Link to="/orders">📦 Commandes</Link> |{" "}
          <button onClick={handleLogout}>🚪 Déconnexion</button>
        </>
      ) : (
        <>
          <Link to="/register">S'inscrire</Link> |{" "}
          <Link to="/login">Se connecter</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
