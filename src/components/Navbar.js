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
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", margin: "0 10px" }}>Accueil</Link>{" | "}
      {!isAuthenticated && (
        <>
          <Link to="/login" style={{ color: "#fff", margin: "0 10px" }} aria-label="Se connecter">Connexion</Link>{" | "}
          <Link to="/register" style={{ color: "#fff", margin: "0 10px" }} aria-label="S'inscrire">Inscription</Link>
        </>
      )}
      {isAuthenticated && (
        <>
          <Link to="/menu" style={{ color: "#fff", margin: "0 10px" }} aria-label="Voir le menu">Menu</Link>{" | "}
          <Link to="/add" style={{ color: "#fff", margin: "0 10px" }} aria-label="Ajouter un plat">Ajouter un plat</Link>{" | "}
          <Link to="/orders" style={{ color: "#fff", margin: "0 10px" }} aria-label="Voir les commandes">Commandes</Link>{" | "}
          <Link to="/profile" className="hover:underline" style={{ color: "#fff", margin: "0 10px" }} aria-label="Mon profil">Mon Profil</Link>{" | "}
          <button onClick={handleLogout} style={{ padding: "5px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} aria-label="Se déconnecter">
            Déconnexion
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
