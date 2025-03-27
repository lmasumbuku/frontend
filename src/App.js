import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MenuList from "./components/MenuList";
import Orders from "./components/Orders";
import AddMenuItem from "./components/AddMenuItem";

function App() {
  return (
    <Router>
      <div>
        <h1>Bienvenue sur la plateforme restaurateur 🍽️</h1>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/menu" element={<MenuList />} />
          <Route path="/add" element={<AddMenuItem />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
