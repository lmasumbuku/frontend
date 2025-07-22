import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

       if (!token) {
      setError("Aucun token trouvé. Veuillez vous reconnecter.");
      return;
    }

    console.log("Token envoyé :", token); // Debug important
      
      try {
        const response = await axios.get(
          "https://backend-fastapi-cvi0.onrender.com/orders/mes-commandes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        );
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les commandes.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>📦 Mes Commandes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orders.length === 0 ? (
        <p>Aucune commande disponible.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Commande #{order.id}</strong> - ✅ Acceptée - Items :{" "}
              {order.items.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
