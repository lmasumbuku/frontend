import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MenuList from "./components/MenuList";
import Orders from "./components/Orders";
import AddMenuItem from "./components/AddMenuItem";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          {isAuthenticated && (
            <>
              <Route path="/menu" element={<MenuList />} />
              <Route path="/add" element={<AddMenuItem />} />
              <Route path="/orders" element={<Orders />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
