import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MenuList from "./components/MenuList";
import Orders from "./components/Orders";
import AddMenuItem from "./components/AddMenuItem";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // true si token existe
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div>
        <h1>Bienvenue sur la plateforme restaurateur 🍽️</h1>

        {/* 🔐 Si connecté, afficher menu */}
        {isAuthenticated && (
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><Link to="/menu">Voir le Menu</Link></li>
              <li><Link to="/add">Ajouter un plat</Link></li>
              <li><Link to="/orders">Commandes</Link></li>
              <li><button onClick={handleLogout}>Déconnexion</button></li>
            </ul>
          </nav>
        )}

        {/* 🧭 Routes */}
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/menu" element={<MenuList />} />
          <Route path="/add" element={<AddMenuItem />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
