import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Vous devez être connecté pour voir les commandes.");
        return;
      }

      try {
        const response = await axios.get("https://backend-fastapi-cvi0.onrender.com/orders/mes-commandes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des commandes.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>📦 Mes Commandes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orders.length === 0 && !error ? (
        <p>Aucune commande pour le moment.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Commande #{order.id}</strong> — {order.status} <br />
              🧾 <em>Items :</em> {order.items.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
