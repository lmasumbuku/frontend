import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage"; // Import de AuthPage
import MenuList from "./components/MenuList";
import Orders from "./components/Orders";
import AddMenuItem from "./components/AddMenuItem";
import Navbar from "./components/Navbar";
import RestaurantProfile from "./components/RestaurantProfile";
import AiOrderSender from "./components/AiOrderSender";
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/ia-orders" element={<IaOrdersPage />} />
          <Route path="/ai-order" element={<AiOrderSender />} />
          {isAuthenticated && (
            <>
              <Route path="/menu" element={<MenuList />} />
              <Route path="/add" element={<AddMenuItem />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<RestaurantProfile />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
